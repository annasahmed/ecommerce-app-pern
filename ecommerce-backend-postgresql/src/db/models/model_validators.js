const stringWithTranslation = (value, attribute = 'title') => {
	if (value == null) return;
	if (typeof value !== 'object' || Array.isArray(value)) {
		throw new Error(`${attribute} must be an object`);
	}

	for (const [key, val] of Object.entries(value)) {
		if (typeof val !== 'string' || val.trim() === '') {
			throw new Error(
				`${attribute} for '${key}' must be a non-empty string`
			);
		}
	}
	/**
	 * Example structure stringWithTranslation:
	 * {
	 * en: "Size",
	 * ur: "سائز"
	 * ...
	 * },
	 */
};

const validateSlug = (value, attribute = 'slug') => {
	if (typeof value !== 'string' || value.trim() === '') {
		throw new Error(`${attribute} must be a non-empty string`);
	}

	// RegEx explanation:
	// ^[a-z0-9]+(?:-[a-z0-9]+)*$ — allows "hello-world-123", but not "-start", "end-", "UPPER", "with space"
	const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

	if (!slugRegex.test(value)) {
		throw new Error(
			`${attribute} must be lowercase, alphanumeric, and may contain hyphens (no spaces or special characters)`
		);
	}
};

const validatePhoneNumber = (value) => {
	if (value === null || value === undefined) return; // ✅ Allow null values
	if (typeof value !== 'string' || value.trim() === '') {
		throw new Error(`Phone number must be a non-empty string`);
	}

	// Accepts formats like: +1234567890, 1234567890, 00923123456789
	const phoneRegex = /^(\+?\d{10,15})$/;

	if (!phoneRegex.test(value)) {
		throw new Error(
			`Phone number must be between 10 to 15 digits, and may start with +`
		);
	}

	return value;
};

const modelValidators = {
	stringWithTranslation,
	validateSlug,
	validatePhoneNumber,
};

module.exports = modelValidators;
