const password = (value, helpers) => {
	if (value.length < 8) {
		return helpers.message('password must be at least 8 characters');
	}
	if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
		return helpers.message(
			'password must contain at least 1 letter and 1 number'
		);
	}
	return value;
};

const validateSlug = (value, helpers) => {
	if (typeof value !== 'string' || value.trim() === '') {
		return helpers.message('Slug must be a non-empty string');
	}

	const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

	if (!slugRegex.test(value)) {
		return helpers.message(
			'Slug must be lowercase, alphanumeric, and may contain hyphens (no spaces or special characters)'
		);
	}

	return value;
};

module.exports = {
	password,
	validateSlug,
};
