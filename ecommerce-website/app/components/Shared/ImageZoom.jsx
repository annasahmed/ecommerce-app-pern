import React, { useState } from "react";
import { createPortal } from "react-dom";
import BaseImage from "../BaseComponents/BaseImage";

const SideZoomImage = ({ src }) => {
	const [zoomState, setZoomState] = useState({
		show: false,
		x: 0,
		y: 0,
		floatingTop: 0,
		floatingLeft: 0,
		width: 0,
		height: 0,
		zoom: 1.5, // Change this number to increase/decrease zoom level
		// zoom: 2.5, // Change this number to increase/decrease zoom level
	});

	const handleMouseMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();

		// Calculate cursor position relative to the image
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		setZoomState((prev) => ({
			...prev,
			show: true,
			x,
			y,
			floatingTop: rect.top + window.scrollY,
			floatingLeft: rect.right + 20, // 20px gap to the right
			width: rect.width,
			height: rect.height,
		}));
	};

	// Lens Size Calculation: The lens size should be proportional to the zoom level
	const lensWidth = zoomState.width / zoomState.zoom;
	const lensHeight = zoomState.height / zoomState.zoom;

	return (
		<div
			className="relative w-full h-full cursor-crosshair overflow-hidden border"
			onMouseMove={handleMouseMove}
			onMouseLeave={() => setZoomState({ ...zoomState, show: false })}>
			{/* 1. Main Base Image */}
			<BaseImage
				src={src}
				className="w-full h-full object-contain aspect-square"
				alt="Product"
				width={600}
				height={600}
			/>

			{/* 2. The Lens (Floating Square over image) */}
			{zoomState.show && (
				<div
					style={{
						position: "absolute",
						pointerEvents: "none",
						border: "1px solid #999",
						backgroundColor: "rgba(255, 255, 255, 0.4)",
						width: `${lensWidth}px`,
						height: `${lensHeight}px`,
						// Center the lens on the cursor
						left: `${zoomState.x - lensWidth / 2}px`,
						top: `${zoomState.y - lensHeight / 2}px`,
					}}
				/>
			)}

			{/* 3. The Portal (Floating Zoom Window) */}
			{zoomState.show &&
				createPortal(
					<div
						style={{
							position: "absolute",
							top: `${zoomState.floatingTop}px`,
							left: `${zoomState.floatingLeft}px`,
							width: `${zoomState.width}px`,
							height: `${zoomState.height}px`,
							overflow: "hidden",
							border: "1px solid #ddd",
							backgroundColor: "white",
							boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
							pointerEvents: "none",
							zIndex: 9999,
						}}>
						<BaseImage
							src={src}
							style={{
								position: "absolute",
								// Zoom Math: Moves the image so the lens area fills the window
								left: `${
									-zoomState.x * zoomState.zoom + zoomState.width / 2
								}px`,
								top: `${
									-zoomState.y * zoomState.zoom + zoomState.height / 2
								}px`,
								width: `${zoomState.width * zoomState.zoom}px`,
								height: `${zoomState.height * zoomState.zoom}px`,
								maxWidth: "none",
							}}
							alt="Zoomed view"
							width={600}
							height={600}
						/>
					</div>,
					document.body,
				)}
		</div>
	);
};

export default SideZoomImage;
