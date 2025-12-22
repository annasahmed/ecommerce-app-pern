import LabelArea from "../selectOption/LabelArea";
import ImageSelector from "../../image-uploader/ImageSelector";

const ImageSelectorField = ({
	required,
	label,
	selectedImage,
	setSelectedImage,
	selectedImageUrl,
	setSelectedImageUrl,
	isVertical,
	className = "",
	onChange = () => {},
	isSmall = false,
	isMultipleSelect = false,
}) => {
	return (
		<div
			className={`${
				isVertical
					? "flex flex-col gap-2"
					: "grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
			} ${className}`}>
			{!isSmall && <LabelArea label={label} required={required} />}
			<div className="col-span-8 sm:col-span-4">
				<ImageSelector
					selectedImage={selectedImage}
					setSelectedImage={setSelectedImage}
					selectedImageUrl={selectedImageUrl}
					setSelectedImageUrl={setSelectedImageUrl}
					isSmall={isSmall}
					isMultipleSelect={isMultipleSelect}
				/>
			</div>
		</div>
	);
};

export default ImageSelectorField;
