import Image from "next/image";
import noImage from "@/app/assets/no-image.png";

const BaseImage = ({
	src,
	alt = "",
	width,
	height,
	sizes,
	className = "",
	...props
}) => {
	const validSrc = src ? src : noImage;
	return (
		<Image
			src={validSrc}
			width={width}
			height={height}
			sizes={sizes}
			className={className}
			alt={alt}
			{...props}
		/>
	);
};

export default BaseImage;
