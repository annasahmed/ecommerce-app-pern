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

			const updatedData = addSimilarProducts(jsonData);

			exportToExcel(updatedData);
		};

		reader.readAsArrayBuffer(file);
	};

	const addSimilarProducts = (products) => {
		// Step 1: Create a base title (remove color from title)
		const processed = products.map((product) => {
			const color = product["Variants Color"];
			const baseTitle = product.Title.replace(
				new RegExp(color, "i"),
				"",
			).trim();
			return { ...product, baseTitle };
		});

		// Step 2: Group by baseTitle
		const groups = {};
		processed.forEach((p) => {
			if (!groups[p.baseTitle]) groups[p.baseTitle] = [];
			groups[p.baseTitle].push(p);
		});

		// Step 3: Add similar_products column
		const result = processed.map((p) => {
			const similarSkus = groups[p.baseTitle]
				.filter((x) => x.SKU !== p.SKU)
				.map((x) => x.SKU)
				.join(",");
			return { ...p, similar_products: similarSkus || "" }; // keep other columns as-is
		});

		return result;
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

		saveAs(blob, "updated_similar_products.xlsx");
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
