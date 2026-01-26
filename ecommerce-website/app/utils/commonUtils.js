export function scrollToSection(e, id) {
	e.preventDefault();
	setActiveSection(id);
	const element = document.querySelector(`#${id}`);
	element?.scrollIntoView({ behavior: "smooth" });
	if (element && id !== "home") {
		let offset = 50;
		if (isScrolled === false) {
			offset = 120;
		}
		if (id == "about_app") {
			offset = 180;
		}
		const elementPosition =
			element.getBoundingClientRect().top + window.scrollY;

		window.scrollTo({
			top: elementPosition - offset,
			behavior: "smooth",
		});
	}
}
export function formatDateTime(isoString, { dateOnly = false } = {}) {
	if (!isoString) return "";

	const date = new Date(isoString);

	const dateOptions = {
		year: "numeric",
		month: "short",
		day: "2-digit",
	};

	const timeOptions = {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	};

	const formattedDate = date.toLocaleDateString("en-US", dateOptions);

	if (dateOnly) {
		return formattedDate;
	}

	const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

	return `${formattedDate} ${formattedTime}`;
}
