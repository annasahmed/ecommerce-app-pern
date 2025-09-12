import Image from "next/image";
import noImage from "@/app/assets/no-image.png";

const BaseImage = ({ src, alt = "", ...props }) => {
	const validSrc = src ? src : noImage;
	return <Image src={validSrc} alt={alt} {...props} />;
};

export default BaseImage;
