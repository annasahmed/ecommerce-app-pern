const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Open Sans", "sans-serif"],
				serif: ["Inter", ...defaultTheme.fontFamily.sans],
			},
			boxShadow: {
				bottom:
					"0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)",
			},
			height: {
				28: "100px",
				sm: "350px",
				md: "400px",
				330: "330px",
				440: "440px",
				lg: "500px",
				xl: "600px",
			},
			width: {
				80: "80px",
				100: "100px",
				200: "200px",
				300: "300px",
				400: "400px",
			},
			padding: {
				2.5: "10px",
			},
			screens: {
				"2xl": "1440px",
				xl: "1280px",
				lg: "1024px",
				ipad: { min: "960px", max: "1023px" },
				md: "768px",
				sm: "640px",
				xs: "420px",
				xss: "320px",
			},
			inset: {
				"-1": "-1rem",
				"-2": "-2rem",
				"-3": "-3rem",
				"-4": "-4rem",
				"-5": "-5rem",
				"-6": "-6rem",
				"-7": "-7rem",
				"-8": "-8rem",
				"-9": "-9rem",
				"-10": "-10rem",
				1: "1rem",
				2: "2rem",
				3: "3rem",
				4: "4rem",
				5: "5rem",
				6: "6rem",
				7: "7rem",
				8: "8rem",
				9: "9rem",
				10: "10rem",
			},
			colors: {
				customTeal: {
					100: "#ccfbf1",
					500: "#14b8a6",
					600: "#0d9488",
					700: "#0f766e",
					800: "#115e59",
					900: "#134e4a",
				},
				customOrange: {
					50: "#fff7ed",
					100: "#ffedd5",
					400: "#fb923c",
					500: "#f97316",
					600: "#ea580c",
					900: "#7c2d12",
				},
				customBlue: {
					50: "#eff6ff",
					100: "#dbeafe",
					300: "#93c5fd",
					400: "#60a5fa",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
					800: "#1e40af",
				},
				// customTeal: {
				// 	50: "#ecfdf5",
				// 	100: "#d1fae5",
				// 	300: "#6ee7b7",
				// 	400: "#34d399",
				// 	500: "#10b981",
				// 	600: "#059669",
				// 	700: "#047857",
				// 	800: "#065f46",
				// },
				// customCyan: {
				// 	600: "#0891b2",
				// },

				customRed: {
					50: "#fef2f2",
					100: "#fee2e2",
					200: "#fecaca",
					300: "#fca5a5",
					400: "#f87171",
					500: "#ef4444",
					600: "#dc2626",
					700: "#b91c1c",
					800: "#991b1b",
					900: "#7f1d1d",
				},
				customGray: {
					50: "#f9fafb",
					100: "#f3f4f6",
					200: "#e5e7eb",
					300: "#d1d5db",
					400: "#9ca3af",
					500: "#6b7280",
					600: "#4b5563",
					700: "#374151",
					800: "#1f2937",
				},
				// customIndigo: {
				// 	500: "#6366f1",
				// },
				customWhite: "#ffffff",
				customBlack: "#000000",
			},
		},
	},
	variants: {
		display: ["group-hover"],
	},
	plugins: [
		require("tailwind-scrollbar-hide"),
		//require('tailwind-scrollbar')
	],
};

module.exports = {
	...config,
};
