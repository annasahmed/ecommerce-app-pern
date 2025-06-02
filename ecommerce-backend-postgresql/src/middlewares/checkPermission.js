const httpStatus = require('http-status');
const db = require('../db/models');
const ApiError = require('../utils/ApiError');

module.exports = function checkPermission(permissionName) {
	return async function (req, res, next) {
		try {
			return next(); // uncomment this to start working
			const userId = req.user?.id;

			if (!userId) {
				throw new ApiError(
					httpStatus.UNAUTHORIZED,
					'Unauthorized: User not found'
				);
			}

			const currentUser = await db.user.findByPk(userId, {
				include: {
					model: db.role,
					include: {
						model: db.permission,
						where: { name: permissionName },
					},
				},
			});

			if (!currentUser || !currentUser.roles.length) {
				throw new ApiError(
					httpStatus.FORBIDDEN,
					'Forbidden: No permission'
				);
			}

			return next();
		} catch (error) {
			console.error('Permission check failed:', error);
			if (error instanceof ApiError) {
				return next(error);
			}

			return next(
				new ApiError(
					httpStatus.INTERNAL_SERVER_ERROR,
					'Internal Server Error'
				)
			);
		}
	};
};
