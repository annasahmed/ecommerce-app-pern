const myTheme = {
	// Alert
	alert: {
		base: "p-4 pl-12 relative rounded-lg leading-5",
		withClose: "pr-12",
		success:
			"bg-customTeal-50 text-customTeal-900 dark:bg-customTeal-600 dark:text-customWhite",
		danger:
			"bg-customRed-50 text-customRed-900 dark:bg-customRed-600 dark:text-customWhite",
		warning:
			"bg-customOrange-50 text-customOrange-900 dark:bg-customOrange-600 dark:text-customWhite",
		neutral:
			"bg-customGray-50 text-customGray-800 dark:bg-customGray-700 dark:text-customGray-300",
		info: "bg-customBlue-50 text-customBlue-900 dark:bg-customBlue-600 dark:text-customWhite",
		icon: {
			base: "h-5 w-5",
			success: "text-customTeal-400 dark:text-customTeal-300",
			danger: "text-customRed-400 dark:text-customRed-300",
			warning: "text-customOrange-400 dark:text-customOrange-100",
			neutral: "text-customGray-400 dark:text-customGray-500",
			info: "text-customBlue-400 dark:text-customBlue-300",
		},
	},
	// Pagination
	pagination: {
		base: "flex flex-col justify-between text-xs sm:flex-row text-customGray-600 dark:text-customGray-400",
	},
	// TableFooter
	tableFooter: {
		base: "px-4 py-3 border-t border-customGray-200 dark:border-customGray-700 bg-customWhite text-customGray-500 dark:text-customGray-400 dark:bg-customGray-800",
	},
	// TableRow
	tableRow: {
		base: "",
	},
	// TableHeader
	tableHeader: {
		base: "text-xs font-semibold tracking-wide text-left text-customGray-500 uppercase border-b border-customGray-200 dark:border-customGray-700 bg-customGray-100 dark:text-customGray-400 dark:bg-customGray-800",
	},
	// TableContainer
	tableContainer: {
		base: "w-full overflow-hidden border border-customGray-200 dark:border-customGray-700 rounded-lg",
	},
	// TableCell
	tableCell: {
		base: "px-4 py-2",
	},
	// TableBody
	tableBody: {
		base: "bg-customWhite divide-y divide-customGray-100 dark:divide-customGray-700 dark:bg-customGray-800 text-customGray-800 dark:text-customGray-400",
	},
	// DropdownItem
	// this is the <li> that lives inside the Dropdown <ul>
	// you're probably looking for the dropdownItem style inside button
	dropdownItem: {
		base: "mb-2 last:mb-0",
	},
	// Dropdown
	dropdown: {
		base: "absolute w-56 p-2 mt-2 text-customGray-600 bg-customWhite dark:bg-customGray-800 dark:border-customGray-700 border border-customGray-100 rounded-lg shadow-md min-w-max-content",
		align: {
			left: "left-0",
			right: "right-0",
		},
	},
	// Avatar
	avatar: {
		base: "relative rounded-full inline-block",
		size: {
			large: "w-16 h-16",
			regular: "w-8 h-8",
			small: "w-6 h-6",
		},
	},
	// Modal
	modal: {
		base: "w-full px-6 py-4 overflow-hidden bg-customWhite rounded-t-lg dark:bg-customGray-800 sm:rounded-lg sm:m-4 sm:max-w-xl custom-modal",
	},
	// ModalBody
	modalBody: {
		base: "mb-6 text-sm text-customGray-800 dark:text-customGray-400",
	},
	// ModalFooter
	modalFooter: {
		base: "flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-3 sm:space-y-0 sm:space-x-4 sm:flex-row bg-customGray-50 dark:bg-customGray-800",
	},
	// ModalHeader
	modalHeader: {
		base: "mt-4 mb-2 text-lg font-semibold text-customGray-800 dark:text-customGray-300",
	},
	// Badge
	badge: {
		base: "inline-flex px-2 text-xs font-medium leading-5 rounded-full",
		success:
			"text-customTeal-600 bg-customTeal-100 dark:bg-customTeal-800 dark:text-customTeal-100",
		danger:
			"text-customRed-500 bg-customRed-100 dark:text-customRed-100 dark:bg-customRed-800",
		warning:
			"text-customOrange-600 bg-customOrange-100 dark:text-customWhite dark:bg-customOrange-600",
		neutral:
			"text-customGray-500 bg-customGray-100 dark:text-customGray-100 dark:bg-customGray-800",
		primary:
			"text-customBlue-500 bg-customBlue-100 dark:text-customWhite dark:bg-customBlue-800",
	},
	// Backdrop
	backdrop: {
		base: "fixed inset-0 z-[9999] flex items-end bg-customBlack bg-opacity-50 sm:items-center sm:justify-center",
	},
	// Textarea
	textarea: {
		base: "block w-full border bg-customGray-100 focus:bg-customWhite text-sm dark:text-customGray-300 rounded-md focus:outline-none p-3",
		active:
			"border border-customGray-200 dark:border-customGray-600 dark:focus:border-customGray-600 dark:bg-customGray-700",
		disabled:
			"cursor-not-allowed opacity-50 bg-customGray-300 dark:bg-customGray-800",
		valid:
			"border-customTeal-600 dark:bg-customGray-700 focus:border-customTeal-400 dark:focus:border-customTeal-400",
		invalid:
			"border-customRed-600 dark:bg-customGray-700 focus:border-customRed-400 dark:focus:border-customRed-400",
	},
	// Select
	select: {
		base: "block w-full h-12 border bg-customGray-100 px-2 py-1 text-sm dark:text-customGray-300 focus:outline-none rounded-md form-select focus:bg-customWhite dark:focus:bg-customGray-700",
		active:
			"focus:border-customGray-200 border-customGray-200 dark:border-customGray-600 focus:shadow-none dark:focus:border-customGray-500 dark:bg-customGray-700",
		select: "leading-5",
		disabled:
			"cursor-not-allowed opacity-50 bg-customGray-300 dark:bg-customGray-800",
		valid:
			"border-customTeal-600 dark:bg-customGray-700 focus:border-customTeal-400 dark:focus:border-customTeal-400",
		invalid:
			"border-customRed-600 dark:bg-customGray-700 focus:border-customRed-400 dark:focus:border-customRed-400",
	},
	// Label
	label: {
		base: "block text-sm text-customGray-800 dark:text-customGray-400",
		// check and radio get this same style
		check: "inline-flex items-center",
		disabled: "opacity-50 cursor-not-allowed",
	},
	// Input
	input: {
		base: "block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-customGray-300 leading-5 rounded-md bg-customGray-100 focus:bg-customWhite dark:focus:bg-customGray-700",
		active:
			"focus:border-customGray-200 border-customGray-200 dark:border-customGray-600 dark:focus:border-customGray-500 dark:bg-customGray-700",
		disabled:
			"border border-customGray-400 cursor-not-allowed opacity-50 bg-customGray-300 dark:bg-customGray-800",
		valid:
			"border-customTeal-600 dark:bg-customGray-700 focus:border-customTeal-400 dark:focus:border-customTeal-400",
		invalid:
			"border-customRed-600 dark:bg-customGray-700 focus:border-customRed-400 dark:focus:border-customRed-400",
		radio:
			"text-customTeal-600 form-radio focus:border-customTeal-400 focus:outline-none",
		checkbox:
			"text-customTeal-600 form-checkbox focus:border-customTeal-500 focus:outline-none rounded",
	},
	// HelperText
	helperText: {
		base: "text-xs",
		valid: "text-customTeal-600 dark:text-customTeal-400",
		invalid: "text-customRed-600 dark:text-customRed-400",
	},
	// Card
	card: {
		base: "min-w-0 rounded-lg overflow-hidden",
		default: "bg-customWhite dark:bg-customGray-800",
	},
	cardBody: {
		base: "p-4",
	},
	// Button
	button: {
		base: "align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none",
		block: "w-full",
		size: {
			larger: "px-10 py-4 rounded-lg",
			large: "px-5 py-3 rounded-lg",
			regular: "px-4 py-2 rounded-lg text-sm",
			small: "px-3 py-1 rounded-md text-sm",
			icon: {
				larger: "p-4 rounded-lg",
				large: "p-3 rounded-lg",
				regular: "p-2 rounded-lg",
				small: "p-2 rounded-md",
			},
			pagination: "px-3 py-1 rounded-md text-xs",
		},
		// styles applied to the SVG icon
		icon: {
			larger: "h-5 w-5",
			large: "h-5 w-5",
			regular: "h-5 w-5",
			small: "h-3 w-3",
			left: "mr-2 -ml-1",
			right: "ml-2 -mr-1",
		},
		primary: {
			base: "text-customWhite bg-customTeal-500 border border-transparent",
			active: "active:bg-customTeal-600 hover:bg-customTeal-600",
			disabled: "opacity-50 cursor-not-allowed",
		},
		modern: {
			base: "text-customWhite bg-customGray-800 border border-transparent",
			active: "active:bg-customGray-800 hover:bg-customGray-900",
			disabled: "opacity-50 cursor-not-allowed",
		},
		outline: {
			base: "text-customGray-600 border-customGray-200 border dark:text-customGray-400 focus:outline-none",
			active:
				"rounded-lg border bg-customGray-200 border-customGray-200 px-4 w-full mr-3 flex items-center justify-center cursor-pointer h-12",
			disabled: "opacity-50 cursor-not-allowed bg-customGray-300",
		},
		delete: {
			base: "text-customRed-600 border-customRed-200 border dark:text-customRed-400 focus:outline-none",
			active:
				"rounded-lg border border-customRed-200 px-4 w-full mr-3 flex items-center justify-center cursor-pointer h-12 bg-customRed-400",
			disabled: "opacity-50 cursor-not-allowed bg-customRed-300",
		},

		link: {
			base: "text-customGray-600 dark:text-customGray-400 focus:outline-none border border-transparent",
			active:
				"active:bg-transparent hover:bg-customGray-100 dark:hover:bg-customGray-500 dark:hover:text-customGray-300 dark:hover:bg-opacity-10",
			disabled: "opacity-50 cursor-not-allowed",
		},
		// this is the button that lives inside the DropdownItem
		dropdownItem: {
			base: "inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-customGray-100 hover:text-customGray-800 dark:hover:bg-customGray-800 dark:hover:text-customGray-200",
		},
	},
};
export default myTheme;
