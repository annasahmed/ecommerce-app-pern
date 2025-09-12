// components/Themes/autoLoader.js
import dynamic from "next/dynamic";

/**
 * Automatically loads a theme folder and memoizes the result
 * @param {string} theme - theme name (e.g., "Theme1", "Theme2")
 */
const cache = {}; // store components by theme so we don't recreate them

export function loadThemeComponents(theme) {
	if (cache[theme]) {
		return cache[theme]; // return memoized components if already loaded
	}

	let components;

	try {
		components = {
			HeroSection: dynamic(() => import(`./${theme}/HeroSection`)),
			Footer: dynamic(() => import(`./${theme}/Footer`)),
			Navbar: dynamic(() => import(`./${theme}/Navbar`)),
		};
	} catch (err) {
		console.error(
			`Theme "${theme}" not found, falling back to FurnitureTheme`,
			err,
		);

		components = {
			HeroSection: dynamic(() => import("./FurnitureTheme/HeroSection")),
			Footer: dynamic(() => import("./FurnitureTheme/Footer")),
			Navbar: dynamic(() => import("./FurnitureTheme/Navbar")),
		};
	}

	// store in cache so we reuse the same references
	cache[theme] = components;

	return components;
}
