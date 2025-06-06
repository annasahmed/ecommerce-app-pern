function pickLanguageFields(data, lang = 'en', fallbackLang = 'en') {
	return data;
	if (Array.isArray(data)) {
		return data.map((item) => pickLanguageFields(item, lang, fallbackLang));
	}

	if (typeof data !== 'object' || data === null) return data;

	const result = {};
	for (const key in data) {
		const value = data[key];
		if (
			value &&
			typeof value === 'object' &&
			(value.hasOwnProperty(lang) || value.hasOwnProperty(fallbackLang))
		) {
			result[key] = value[lang] || value[fallbackLang];
		} else {
			result[key] = value;
		}
	}
	return result;
}

module.exports = {
	pickLanguageFields,
};
