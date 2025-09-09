// components/Themes/autoLoader.js
import dynamic from "next/dynamic";

/**
 * Automatically loads a theme folder
 * @param {string} theme - theme name (e.g., "Theme1", "Theme2")
 */
export function loadThemeComponents(theme) {
	try {
		return {
			HeroSection: dynamic(() => import(`./${theme}/HeroSection`)),
			Footer: dynamic(() => import(`./${theme}/Footer`)),
			Navbar: dynamic(() => import(`./${theme}/Navbar`)),
		};
	} catch (err) {
		console.error(
			`Theme "${theme}" not found, falling back to FurnitureTheme`,
			err,
		);

		// fallback
		return {
			HeroSection: dynamic(() => import("./FurnitureTheme/HeroSection")),
			Footer: dynamic(() => import("./FurnitureTheme/Footer")),
			Navbar: dynamic(() => import("./FurnitureTheme/Navbar")),
		};
	}
}
