const { expressjwt: expressJwt } = require('express-jwt');
const config = require('./config.js');
const db = require('../db/models/index.js');
const { tokenTypes } = require('./tokens.js');

// Better error-safe isRevoked
async function isRevoked(req, token) {
	try {
		const jwtToken = req.headers.authorization?.split(' ')[1];
		if (!jwtToken) return true;

		const isRefreshRoute = req.originalUrl.includes('/refresh-token');

		if (!isRefreshRoute) {
			// It's an access token route, don't revoke
			return false;
		}

		const savedToken = await db.token.findOne({
			where: {
				token: jwtToken,
				type: tokenTypes.REFRESH,
				revoked: false,
			},
		});

		// Revoke if not found
		return !savedToken;
	} catch (err) {
		console.error('JWT isRevoked Error:', err.message);
		// Revoke on error for safety
		return true;
	}
}

function jwt() {
	const { secret } = config.jwt;

	return expressJwt({
		secret,
		algorithms: ['HS256'],
		isRevoked,
		getToken: function fromHeaderOrQuerystring(req) {
			return req.headers.authorization?.split(' ')[1] || null;
		},
	}).unless({
		path: [
			/\/v[1-9](\d)*\/(auth|admin\/auth|docs|delete)\/.*/, // Public routes
		],
	});
}

module.exports = jwt;
