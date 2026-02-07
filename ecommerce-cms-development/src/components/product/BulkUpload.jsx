import { instance } from "@/services/httpService";
import { Button } from "@windmill/react-ui";
import {
	AlertCircle,
	CheckCircle,
	ChevronDown,
	ChevronUp,
	Image,
	Upload,
	XCircle,
} from "lucide-react";
import { useState } from "react";

// Detail Section Component for expandable lists
function UploadDetailSection({ title, count, items, type, renderItem }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const bgColor =
		type === "success"
			? "bg-green-50 border-green-200"
			: "bg-orange-50 border-orange-200";

	const headerColor = type === "success" ? "text-green-800" : "text-orange-800";

	return (
		<div className={`border rounded-lg ${bgColor}`}>
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/50 transition-colors rounded-t-lg">
				<span className={`font-semibold text-sm ${headerColor}`}>
					{title} ({count})
				</span>
				{isExpanded ? (
					<ChevronUp className="w-5 h-5 text-gray-500" />
				) : (
					<ChevronDown className="w-5 h-5 text-gray-500" />
				)}
			</button>

			{isExpanded && (
				<div className="px-4 pb-3 space-y-2 max-h-60 overflow-y-auto">
					{items.map((item, index) => (
						<div
							key={index}
							className="p-3 bg-white rounded border border-gray-200">
							{renderItem(item)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default function BulkUpload() {
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [uploadResults, setUploadResults] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [messages, setMessages] = useState([]);

	const addMessage = (type, text) => {
		setMessages((prev) => [...prev, { type, text, id: Date.now() }]);
	};

	const resetModal = () => {
		setMessages([]);
		setUploadResults([]);
		setProgress(0);
		setUploading(false);
	};

	// Handle file selection
	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		if (!selectedFiles.length) return;

		setFiles(selectedFiles);
		setShowModal(true);
		resetModal();
		uploadFiles(selectedFiles);
	};

	// Chunked upload function
	const uploadFiles = async (files) => {
		setUploading(true);
		addMessage("info", `Starting upload of ${files.length} images...`);

		const CHUNK_SIZE = 50;
		let uploadedCount = 0;

		for (let i = 0; i < files.length; i += CHUNK_SIZE) {
			const chunk = files.slice(i, i + CHUNK_SIZE);
			const start = i + 1;
			const end = Math.min(i + CHUNK_SIZE, files.length);
			const formData = new FormData();

			chunk.forEach((file) => formData.append("file", file));

			try {
				addMessage("info", `Uploading images ${start} - ${end}...`);

				const res = await instance.post("/media/bulk-upload", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				});

				const data = res.data;

				if (data && Array.isArray(data)) {
					setUploadResults((prev) => [...prev, ...data]);
					addMessage(
						"success",
						`Images ${start} - ${end} uploaded successfully`,
					);
				}

				uploadedCount += chunk.length;
				setProgress(Math.round((uploadedCount / files.length) * 100));
			} catch (err) {
				console.error("Batch upload failed:", err);
				addMessage(
					"error",
					`Failed to upload images ${start} - ${end}: ${err.message || err}`,
				);
				break;
			}
		}

		setUploading(false);
		setFiles([]);
		addMessage("success", "Upload complete!");
	};

	const summary = uploadResults.reduce(
		(acc, item) => {
			if (item.status === "attached") {
				acc.attached += 1;
				if (item.isThumbnail) acc.thumbnailSet += 1;
			} else if (
				item.status === "uploaded_only" &&
				item.reason === "product_not_found"
			) {
				acc.productNotFound += 1;
			}
			acc.uploaded += 1;
			return acc;
		},
		{ uploaded: 0, attached: 0, thumbnailSet: 0, productNotFound: 0 },
	);

	return (
		<>
			<div className="flex-1 w-full inline-block relative">
				<Button
					onClick={() => document.getElementById("image-input").click()}
					disabled={uploading}
					// className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3">
					className="group flex gap-2 items-center justify-center rounded-md h-12 w-full">
					<div className="relative">
						<Image className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
					</div>
					<div className="flex flex-col items-center">
						<span className="font-semibold text-base text-center">
							Upload Product Images
						</span>
						<span className="text-gray-100 text-sm italic font-normal">
							(Supports .jpg, .jpeg, .png, webp formats)
						</span>
					</div>
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-shine rounded-lg"></div>
				</Button>
			</div>

			{/* Hidden File Input */}
			<input
				type="file"
				multiple
				accept=".jpg,.jpeg,.png,.webp"
				onChange={handleFileChange}
				id="image-input"
				style={{ display: "none" }}
			/>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
						{/* Header */}
						<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
							<div className="flex items-center gap-2">
								<Image className="w-5 h-5 text-purple-600" />
								<h2 className="text-xl font-semibold text-gray-800">
									Bulk Image Upload Progress
								</h2>
							</div>
							{!uploading && (
								<button
									onClick={() => setShowModal(false)}
									className="text-gray-400 hover:text-gray-600 text-2xl">
									×
								</button>
							)}
						</div>

						{/* Progress Bar */}
						{uploading && (
							<div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
								<div className="flex justify-between items-center mb-2">
									<span className="text-sm font-medium text-gray-700">
										Uploading images...
									</span>
									<span className="text-sm font-semibold text-purple-600">
										{progress}%
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
									<div
										className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
										style={{ width: `${progress}%` }}
									/>
								</div>
							</div>
						)}

						{/* Messages */}
						<div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
							{messages.map((msg) => (
								<div
									key={msg.id}
									className={`p-3 rounded-md flex items-start gap-2 ${
										msg.type === "success"
											? "bg-green-50 text-green-800 border border-green-200"
											: msg.type === "error"
												? "bg-red-50 text-red-800 border border-red-200"
												: "bg-blue-50 text-blue-800 border border-blue-200"
									}`}>
									{msg.type === "success" && (
										<CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
									)}
									{msg.type === "error" && (
										<XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
									)}
									{msg.type === "info" && (
										<AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
									)}
									<span className="flex-1">{msg.text}</span>
								</div>
							))}

							{uploading && messages.length === 0 && (
								<div className="flex items-center justify-center py-8">
									<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
									<span className="ml-3 text-gray-600">
										Processing images...
									</span>
								</div>
							)}
						</div>

						{/* Summary Statistics */}
						{uploadResults.length > 0 && !uploading && (
							<div className="border-t border-gray-200 max-h-96 overflow-y-auto">
								{/* Summary Cards */}
								<div className="px-6 py-4 bg-gray-100">
									<h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
										<CheckCircle className="w-5 h-5 text-green-600" />
										Upload Summary
									</h3>
									<div className="grid grid-cols-2 gap-3">
										<div className="bg-white rounded-lg p-3 border border-purple-100">
											<div className="flex items-center justify-between">
												<span className="text-gray-600 text-sm">
													Total Uploaded
												</span>
												<div className="flex items-center gap-1">
													<Upload className="w-4 h-4 text-purple-600" />
													<span className="font-bold text-lg text-purple-600">
														{summary.uploaded}
													</span>
												</div>
											</div>
										</div>
										<div className="bg-white rounded-lg p-3 border border-green-100">
											<div className="flex items-center justify-between">
												<span className="text-gray-600 text-sm">
													Products Updated
												</span>
												<div className="flex items-center gap-1">
													<CheckCircle className="w-4 h-4 text-green-600" />
													<span className="font-bold text-lg text-green-600">
														{summary.attached}
													</span>
												</div>
											</div>
										</div>
										<div className="bg-white rounded-lg p-3 border border-blue-100">
											<div className="flex items-center justify-between">
												<span className="text-gray-600 text-sm">
													Thumbnails Set
												</span>
												<div className="flex items-center gap-1">
													<Image className="w-4 h-4 text-blue-600" />
													<span className="font-bold text-lg text-blue-600">
														{summary.thumbnailSet}
													</span>
												</div>
											</div>
										</div>
										<div className="bg-white rounded-lg p-3 border border-orange-100">
											<div className="flex items-center justify-between">
												<span className="text-gray-600 text-sm">
													Products Not Found
												</span>
												<div className="flex items-center gap-1">
													<AlertCircle className="w-4 h-4 text-orange-600" />
													<span className="font-bold text-lg text-orange-600">
														{summary.productNotFound}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Detailed Results */}
								{(summary.attached > 0 || summary.productNotFound > 0) && (
									<div className="px-6 py-4 bg-white space-y-4">
										{/* Successfully Attached Images */}
										{summary.attached > 0 && (
											<UploadDetailSection
												title="✓ Successfully Attached to Products"
												count={summary.attached}
												items={uploadResults.filter(
													(item) => item.status === "attached",
												)}
												type="success"
												renderItem={(item) => (
													<div className="flex items-start justify-between gap-2">
														<div className="flex-1">
															<p className="font-medium text-sm text-gray-800">
																{item.file}
															</p>
															<p className="text-xs text-gray-500">
																Product: {item.product}
															</p>
														</div>
														{item.isThumbnail && (
															<span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
																Thumbnail
															</span>
														)}
													</div>
												)}
											/>
										)}

										{/* Product Not Found */}
										{summary.productNotFound > 0 && (
											<UploadDetailSection
												title="⚠ Uploaded but Product Not Found"
												count={summary.productNotFound}
												items={uploadResults.filter(
													(item) =>
														item.status === "uploaded_only" &&
														item.reason === "product_not_found",
												)}
												type="warning"
												renderItem={(item) => (
													<div>
														<p className="font-medium text-sm text-gray-800">
															{item.file}
														</p>
														<p className="text-xs text-orange-600">
															Expected product slug:{" "}
															<span className="font-mono">{item.slug}</span>
														</p>
													</div>
												)}
											/>
										)}
									</div>
								)}
							</div>
						)}

						{/* Footer */}
						{!uploading && (
							<div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
								<button
									onClick={() => {
										setShowModal(false);
										resetModal();
									}}
									className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium">
									Close
								</button>
								{uploadResults.length > 0 && (
									<Button
										onClick={() => {
											document.getElementById("image-input").click();
										}}
										// className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
									>
										Upload More
									</Button>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
