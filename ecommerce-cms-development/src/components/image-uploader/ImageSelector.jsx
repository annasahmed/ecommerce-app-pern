import Media from "@/pages/media/Media";
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "@windmill/react-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";

const ImageSelector = ({
	selectedImage,
	setSelectedImage,
	selectedImageUrl,
	setSelectedImageUrl,
	isMultipleSelect = false,
	isSmall,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation();

	// Normalize images for rendering
	const images = isMultipleSelect
		? selectedImageUrl || []
		: selectedImageUrl
		? [selectedImageUrl]
		: [];

	const handleRemove = (index) => {
		if (isMultipleSelect) {
			setSelectedImageUrl((prev) => prev.filter((_, i) => i !== index));
			setSelectedImage((prev) => prev.filter((_, i) => i !== index));
		} else {
			setSelectedImage(null);
			setSelectedImageUrl(null);
		}
	};

	return (
		<>
			<div
				onClick={() => setIsOpen(true)}
				className={`w-full flex flex-wrap gap-12 items-center justify-center border-2
					border-customGray-300 dark:border-customGray-600 border-dashed
					rounded-md cursor-pointer
					${isSmall ? "min-h-20 p-2" : "min-h-52 p-4"}`}>
				{images.length > 0 ? (
					images?.map((img, index) => (
						<div
							key={index}
							className="relative border border-dotted p-1 border-black">
							<img
								src={img}
								alt="selected"
								className={`object-contain rounded
								${isSmall ? "h-20 w-20" : "h-32 w-32"}`}
							/>

							{/* Remove button */}
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									handleRemove(index);
								}}
								className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1
								opacity-100 transition">
								<FiX size={12} />
							</button>
						</div>
					))
				) : (
					<button
						type="button"
						className="border rounded-md px-4 py-2
						border-customGray-400 dark:border-customGray-600 bg-transparent">
						{t("SelectImage")}
					</button>
				)}
			</div>

			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				style={{ maxWidth: "54rem" }}>
				<ModalHeader>{t("SelectImage")}</ModalHeader>
				<ModalBody>
					<Media
						isSelectImage
						isMultipleSelect={isMultipleSelect}
						// Single
						selectedImage={selectedImage}
						setSelectedImage={setSelectedImage}
						setSelectedImageUrl={setSelectedImageUrl}
						onClose={() => setIsOpen(false)}
					/>
				</ModalBody>
				<ModalFooter>
					<Button
						layout="outline"
						type="button"
						onClick={() => setIsOpen(false)}>
						{t("Close")}
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default ImageSelector;
