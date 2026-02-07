import { useState } from "react";
import { Button, Progress } from "@windmill/react-ui";
import { instance } from "@/services/httpService";

export default function BulkUpload() {
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [subFolder, setSubFolder] = useState("");

	// 1️⃣ Handle file selection
	const handleFileChange = (e) => {
		setFiles(Array.from(e.target.files)); // convert FileList to array
	};

	// 2️⃣ Chunked upload function
	const uploadFiles = async () => {
		if (!files.length) return;

		setUploading(true);
		const CHUNK_SIZE = 50; // files per batch
		let uploadedCount = 0;

		for (let i = 0; i < files.length; i += CHUNK_SIZE) {
			const chunk = files.slice(i, i + CHUNK_SIZE);
			const formData = new FormData();
			chunk.forEach((file) => formData.append("file", file));

			// optional subfolder
			if (subFolder) formData.append("subFolder", subFolder);

			try {
				await instance.post("/media/bulk-upload", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				});

				uploadedCount += chunk.length;
				setProgress(Math.round((uploadedCount / files.length) * 100));
			} catch (err) {
				console.error("Batch upload failed:", err);
				alert("Some files failed to upload. You can retry.");
			}
		}

		setUploading(false);
		setFiles([]);
		setProgress(0);
		alert("Upload complete!");
	};

	return (
		<div className="space-y-4 p-4 bg-white shadow rounded">
			<div className="flex flex-col md:flex-row md:items-center gap-4">
				<input
					type="text"
					placeholder="Optional subfolder"
					value={subFolder}
					onChange={(e) => setSubFolder(e.target.value)}
					className="border rounded p-2 flex-1"
				/>
				<input
					type="file"
					multiple
					onChange={handleFileChange}
					className="border rounded p-2"
					style={{
						display: "block",
					}}
				/>
				<Button
					onClick={uploadFiles}
					disabled={uploading || files.length === 0}>
					{uploading ? "Uploading..." : "Upload"}
				</Button>
			</div>

			{uploading && (
				<div className="w-full bg-gray-200 rounded h-3 mt-2">
					<div
						className="bg-green-500 h-3 rounded"
						style={{ width: `${progress}%` }}></div>
				</div>
			)}

			{files.length > 0 && (
				<p className="text-gray-600">
					Selected {files.length} file{files.length > 1 ? "s" : ""}
				</p>
			)}
		</div>
	);
}
