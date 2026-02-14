import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExcelProcessor = () => {
	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = (evt) => {
			const data = new Uint8Array(evt.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];

			const jsonData = XLSX.utils.sheet_to_json(sheet);

			const combinedData = combineRows(jsonData);
			const finalData = addSimilarProductsColumn(combinedData);

			exportToExcel(finalData);
		};

		reader.readAsArrayBuffer(file);
	};

	const combineRows = (rows) => {
		const grouped = {};
		const finalRows = [];

		const isInvalidSize = (size) => {
			if (size === null || size === undefined) return true;

			const value = String(size).trim().toLowerCase();
			return value === "-" || value === "null" || value === "";
		};

		rows.forEach((row) => {
			const { SKU, Title, VariantsSize } = row;

			// 🚨 Safe invalid check
			if (isInvalidSize(VariantsSize)) {
				finalRows.push(row);
				return;
			}

			const sizeStr = String(VariantsSize).trim();

			// Remove size from title safely
			const baseTitle = String(Title).replace(sizeStr, "").trim();

			if (!grouped[baseTitle]) {
				grouped[baseTitle] = {
					...row,
					SKU: SKU,
					Title: baseTitle,
					VariantsSize: [],
				};
			}

			grouped[baseTitle].VariantsSize.push(`${sizeStr}(${SKU})`);
		});

		const mergedProducts = Object.values(grouped).map((item) => ({
			...item,
			VariantsSize: item.VariantsSize.join(", "),
		}));

		return [...mergedProducts, ...finalRows];
	};
	const addSimilarProductsColumn = (rows) => {
		const grouped = {};

		rows.forEach((row) => {
			const { Title, SKU, ["Variants Color"]: color } = row;

			// Remove color from title safely
			let baseTitle = Title;

			if (color) {
				baseTitle = Title.replace(new RegExp(color, "i"), "").trim();
			}

			if (!grouped[baseTitle]) {
				grouped[baseTitle] = [];
			}

			grouped[baseTitle].push(row);
		});

		// Add similar_products column
		return rows.map((row) => {
			const { Title, SKU, ["Variants Color"]: color } = row;

			let baseTitle = Title;
			if (color) {
				baseTitle = Title.replace(new RegExp(color, "i"), "").trim();
			}

			const group = grouped[baseTitle];

			if (group.length <= 1) {
				return { ...row, similar_products: "" };
			}

			const similarSkus = group
				.filter((item) => item.SKU !== SKU)
				.map((item) => item.SKU)
				.join(",");

			return {
				...row,
				similar_products: similarSkus,
			};
		});
	};

	const exportToExcel = (data) => {
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Combined");

		const excelBuffer = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});

		const blob = new Blob([excelBuffer], {
			type: "application/octet-stream",
		});

		saveAs(blob, "combined_products.xlsx");
	};

	return (
		<div>
			<h2>Upload Excel File</h2>
			<input
				type="file"
				accept=".xlsx, .xls"
				onChange={handleFileUpload}
				style={{
					display: "block",
				}}
			/>
		</div>
	);
};

export default ExcelProcessor;
