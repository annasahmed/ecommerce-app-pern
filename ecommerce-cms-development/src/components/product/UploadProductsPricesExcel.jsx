import ProductServices from "@/services/ProductServices";
import { Button } from "@windmill/react-ui";
import { FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { excelFeilds } from "./excelFields";

// ---------- HELPERS ----------
const safeStr = (val) =>
	val !== undefined && val !== null ? String(val).trim() : "";

const toNumber = (val) =>
	val !== undefined && val !== null && val !== "" && !isNaN(Number(val))
		? Number(val)
		: null;

const isValidFloat = (val) =>
	val !== undefined && val !== null && val !== "" && !isNaN(Number(val));

// ---------- ROW VALIDATOR ----------
const validateRow = (row, excelRowNumber) => {
	const errors = [];

	const sku = safeStr(row[excelFeilds.sku]);
	const price = safeStr(row[excelFeilds.price]);

	if (!sku) {
		errors.push(`Row ${excelRowNumber}: SKU is required`);
	}

	if (!isValidFloat(price)) {
		errors.push(`Row ${excelRowNumber}: Price must be a valid number`);
	}

	return errors;
};

const UploadProductsPriceExcel = () => {
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [messages, setMessages] = useState([]);
	const [uploadStats, setUploadStats] = useState(null);

	const addMessage = (type, text) => {
		setMessages((prev) => [...prev, { type, text, id: Date.now() }]);
	};

	const resetModal = () => {
		setMessages([]);
		setUploadStats(null);
		setLoading(false);
	};

	const parseExcelAndUpload = async (file) => {
		if (!file) return;

		setShowModal(true);
		resetModal();
		setLoading(true);

		const reader = new FileReader();

		reader.onload = async (e) => {
			try {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, { type: "array" });
				const sheet = workbook.Sheets[workbook.SheetNames[0]];
				const rows = XLSX.utils.sheet_to_json(sheet);

				addMessage("info", `Processing ${rows.length} rows from Excel file...`);

				const products = [];
				const allErrors = [];
				const seenSKUs = new Map();

				rows.forEach((row, index) => {
					const excelRowNumber = index + 2; // Header = row 1

					const rowErrors = validateRow(row, excelRowNumber);
					if (rowErrors.length) {
						allErrors.push(...rowErrors);
						return;
					}

					const sku = safeStr(row[excelFeilds.sku]);
					const price = toNumber(safeStr(row[excelFeilds.price]));

					// Duplicate SKU inside Excel check
					if (seenSKUs.has(sku)) {
						allErrors.push(
							`Row ${excelRowNumber}: Duplicate SKU '${sku}' found (also in row ${seenSKUs.get(
								sku,
							)})`,
						);
						return;
					}

					seenSKUs.set(sku, excelRowNumber);

					products.push({ sku, price });
				});

				// ❌ Stop if errors
				if (allErrors.length) {
					allErrors.slice(0, 15).forEach((error) => addMessage("error", error));

					if (allErrors.length > 15) {
						addMessage("error", `... and ${allErrors.length - 15} more errors`);
					}

					setLoading(false);
					return;
				}

				if (!products.length) {
					addMessage("error", "No valid rows found in Excel file.");
					setLoading(false);
					return;
				}

				addMessage(
					"success",
					`${products.length} products validated successfully.`,
				);

				console.log("FINAL PAYLOAD:", products);

				// ---------- BATCH UPLOAD ----------
				const batchSize = 200;
				let totalUpdated = 0;

				for (let i = 0; i < products.length; i += batchSize) {
					const batch = products.slice(i, i + batchSize);
					const start = i + 1;
					const end = Math.min(i + batchSize, products.length);

					try {
						addMessage("info", `Uploading products ${start} - ${end}...`);

						const res = await ProductServices.importProductPrices({
							products: batch,
						});

						totalUpdated += res?.updatedProducts?.length || batch.length;

						addMessage(
							"success",
							`Products ${start} - ${end} uploaded successfully`,
						);
					} catch (err) {
						addMessage(
							"error",
							`Error uploading ${start} - ${end}: ${err.message || err}`,
						);
						break;
					}
				}

				setUploadStats({
					updatedProducts: totalUpdated,
				});

				addMessage("success", "Import completed!");
			} catch (error) {
				addMessage("error", `Failed to process file: ${error.message}`);
			} finally {
				setLoading(false);
			}
		};

		reader.readAsArrayBuffer(file);
	};

	return (
		<div className="flex-1">
			{/* Upload Button */}
			<div className="w-full inline-block relative">
				<Button
					onClick={() => document.getElementById("file-input").click()}
					className="group flex gap-2 items-center rounded-md h-12 w-full">
					<FileSpreadsheet className="w-5 h-5" />
					<span className="font-semibold text-base">Import SKU & Price</span>
				</Button>
			</div>

			<input
				id="file-input"
				type="file"
				accept=".xlsx,.xls"
				style={{ display: "none" }}
				onChange={(e) => parseExcelAndUpload(e.target.files[0])}
			/>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
						{/* Header */}
						<div className="px-6 py-4 border-b flex justify-between items-center">
							<h2 className="text-xl font-semibold">
								SKU Price Import Progress
							</h2>
							{!loading && (
								<button
									onClick={() => setShowModal(false)}
									className="text-gray-400 text-2xl">
									×
								</button>
							)}
						</div>

						{/* Messages */}
						<div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
							{messages.map((msg) => (
								<div
									key={msg.id}
									className={`p-3 rounded-md ${
										msg.type === "success"
											? "bg-green-50 text-green-800"
											: msg.type === "error"
												? "bg-red-50 text-red-800"
												: "bg-blue-50 text-blue-800"
									}`}>
									{msg.text}
								</div>
							))}

							{loading && <div className="text-center py-4">Processing...</div>}
						</div>

						{/* Stats */}
						{uploadStats && (
							<div className="px-6 py-4 bg-gray-50 border-t">
								<div>
									<strong>Updated Products:</strong>{" "}
									{uploadStats.updatedProducts}
								</div>
							</div>
						)}

						{!loading && (
							<div className="px-6 py-4 border-t flex justify-end">
								<button
									onClick={() => setShowModal(false)}
									className="px-4 py-2 bg-gray-200 rounded">
									Close
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UploadProductsPriceExcel;
