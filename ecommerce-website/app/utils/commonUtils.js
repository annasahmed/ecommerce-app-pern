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
