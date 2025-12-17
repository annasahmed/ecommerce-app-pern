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

const ImageSelector = ({
	selectedImage,
	setSelectedImage,
	isMultipleSelect,
	selectedImageUrl,
	setSelectedImageUrl,
	isSmall,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const { t } = useTranslation();

	return (
		<>
			<div
				onClick={() => {
					setIsOpen(true);
				}}
				className={`w-full  flex items-center justify-center border-2 border-customGray-300 dark:border-customGray-600 border-dashed rounded-md cursor-pointer ${
					isSmall ? "min-h-20 py-1 px-1" : "h-52 px-6 pt-5 pb-6"
				} `}>
				{selectedImageUrl ? (
					<img
						src={selectedImageUrl}
						alt={"selectedImage"}
						className={`w-full h-full ${
							isSmall ? "h-20 py-1 px-1" : "max-h-52 px-6 pt-5 pb-6"
						} object-contain`}
					/>
				) : (
					<button
						type="button"
						className="border rounded-md px-4 py-2 border-customGray-400 dark:border-customGray-600 bg-transparent">
						{t("SelectImage")}
					</button>
				)}
			</div>
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				// className="max-w-5xl"
				style={{
					maxWidth: "54rem",
				}}>
				<ModalHeader>{t("SelectImage")}</ModalHeader>
				<ModalBody>
					<Media
						isSelectImage
						selectedImage={selectedImage}
						setSelectedImage={setSelectedImage}
						setSelectedImageUrl={setSelectedImageUrl}
						isMultipleSelect={isMultipleSelect}
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
