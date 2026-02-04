const catchAsync = require('../../utils/catchAsync');
const { adminRoleService } = require('../../services/Admin');

const getRoleById = catchAsync(async (req, res) => {
	const role = await adminRoleService.getRoleById(req.params.roleId);
	res.send(role);
});
const getRoles = catchAsync(async (req, res) => {
	const roles = await adminRoleService.getRoles(req);
	res.send(roles);
});
const createRole = catchAsync(async (req, res) => {
	const roles = await adminRoleService.createRole(req);
	res.send(roles);
});

const softDeleteRole = catchAsync(async (req, res) => {
	await adminRoleService.softDeleteRoleById(req.params.roleId, false);
	res.send({ success: true });
});
const permanentDeleteRole = catchAsync(async (req, res) => {
	await adminRoleService.permanentDeleteRoleById(req.params.roleId, false);
	res.send({ success: true });
});

const updateRole = catchAsync(async (req, res) => {
	const role = await adminRoleService.updateRole(req);

	res.send(role);
});

module.exports = {
	getRoleById,
	getRoles,
	createRole,
	softDeleteRole,
	permanentDeleteRole,
	updateRole,
};
