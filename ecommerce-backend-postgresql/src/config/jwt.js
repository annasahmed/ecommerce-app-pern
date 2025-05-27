const { expressjwt: expressJwt } = require('express-jwt');
const config = require('./config.js');
const db = require('../db/models/index.js');
const { tokenTypes } = require('./tokens.js');

// Better error-safe isRevoked
async function isRevoked(req, payload, done) {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) return done(null, true); // No token, revoke by default

		// Determine if it's a refresh token request (e.g. via endpoint)
		const isRefreshRoute = req.originalUrl.includes('/refresh-token');

		if (!isRefreshRoute) {
			// If it's not a refresh route, assume it's an access token and allow
			return done(null, false);
		}

		// Refresh token check in DB
		const savedToken = await db.token.findOne({
			where: {
				token,
				type: tokenTypes.REFRESH,
				revoked: false,
			},
		});

		// If not found or revoked, deny
		if (!savedToken) return done(null, true);

		// Token is valid
		return done(null, false);
	} catch (err) {
		console.error('JWT isRevoked Error:', err.message);
		return done(err, true); // default to revoked on error
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
			/\/v[1-9](\d)*\/(auth|docs|delete)\/.*/, // Public routes
		],
	});
}

module.exports = jwt;
