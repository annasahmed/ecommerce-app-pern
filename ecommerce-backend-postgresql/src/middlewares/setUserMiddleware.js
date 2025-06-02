const httpStatus = require('http-status');
const db = require('../db/models');

module.exports = async function setUserMiddleware(req, res, next) {
	try {
		if (!req.auth?.userId) {
			return next();
		}

		const user = await db.user.findByPk(req.auth.userId, {
			include: {
				model: db.role,
				include: db.permission,
			},
		});
		if (!user) {
			throw new ApiError(
				httpStatus.UNAUTHORIZED,
				'Unauthorized: User not found'
			);
		}
		req.user = user; // Replaces token payload with full user object
		next();
	} catch (err) {
		console.error('Error in setUserMiddleware:', err);
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			'Internal server error'
		);
	}
};
