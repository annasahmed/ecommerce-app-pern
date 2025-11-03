const logger = require('../config/logger');

// middlewares/responseFormatter.js

const responseFormatter = (req, res, next) => {
	const oldSend = res.send;

	res.send = function (body) {
		// Don't format error responses (e.g., already formatted by errorHandler)
		if (res.statusCode >= 400) {
			return oldSend.call(this, body);
		}

		let data = body;

		// Try to parse body if it's a JSON string
		try {
			data = typeof body === 'string' ? JSON.parse(body) : body;
		} catch (_) {
			// leave as-is if it's not JSON string
		}

		// If already formatted, don't wrap again
		if (
			data &&
			typeof data === 'object'
			// && data._isFormatted &&
			// data.code &&
			// (data.message || data.error)
		) {
			return oldSend.call(this, body);
		}

		// Format successful response
		const formattedResponse = data;

		// will euncomment below to make formatter work well

		// const formattedResponse = {
		// 	code: res.statusCode,
		// 	message: res.statusMessage || 'Success',
		// 	error: false,
		// 	data,
		// };

		return oldSend.call(this, formattedResponse);
	};

	next();
};

module.exports = responseFormatter;
