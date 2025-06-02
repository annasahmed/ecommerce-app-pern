const httpStatus = require('http-status');
const { adminSettingService } = require('../../services/Admin');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');

const addGlobalSetting = catchAsync(async (req, res) => {
	await adminSettingService.createSetting(req.body);
	res.send({ message: 'Global Setting Added Successfully!' });
});

const getGlobalSetting = catchAsync(async (req, res) => {
	const result = await adminSettingService.findSettingByName('globalSetting');
	res.send(result?.setting || { message: 'Global Settings Not Found' });
});

const updateGlobalSetting = catchAsync(async (req, res) => {
	const updated = await adminSettingService.upsertSettingByName(
		'globalSetting',
		req.body.setting
	);
	res.send(updated);
});

const addStoreSetting = catchAsync(async (req, res) => {
	await adminSettingService.createSetting(req.body);
	res.send({ message: 'Store Setting Added Successfully!' });
});

const getStoreSetting = catchAsync(async (req, res) => {
	const result = await adminSettingService.findSettingByName('storeSetting');
	res.send(result?.setting || { message: 'Store Settings Not Found' });
});

const updateStoreSetting = catchAsync(async (req, res) => {
	const updated = await adminSettingService.upsertSettingByName(
		'storeSetting',
		req.body.setting
	);
	res.send({
		data: updated,
		message: 'Store Setting Update Successfully!',
	});
});

const addStoreCustomizationSetting = catchAsync(async (req, res) => {
	const setting = await adminSettingService.createSetting(req.body);
	res.send({
		data: setting,
		message: 'Online Store Customization Setting Added Successfully!',
	});
});

const getStoreCustomizationSetting = catchAsync(async (req, res) => {
	const { key, keyTwo } = req.query;

	const projection = {};
	if (key) projection[`setting.${key}`] = 1;
	if (keyTwo) projection[`setting.${keyTwo}`] = 1;

	const result = await adminSettingService.findSettingByName(
		'storeCustomizationSetting'
	);

	if (!result) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			'Store Customization Settings not found'
		);
	}

	res.send(result.setting || { message: 'Store Customization Not Found' });
});

const getStoreSeoSetting = catchAsync(async (req, res) => {
	const result = await adminSettingService.findSettingByName(
		'storeCustomizationSetting'
	);
	res.send(
		result?.setting || {
			message: 'Store Customization Settings Not Found',
		}
	);
});

const updateStoreCustomizationSetting = catchAsync(async (req, res) => {
	const updated = await adminSettingService.upsertSettingByName(
		'storeCustomizationSetting',
		req.body.setting
	);
	res.send({
		data: updated,
		message: 'Online Store Customization Setting Update Successfully!',
	});
});

module.exports = {
	addGlobalSetting,
	getGlobalSetting,
	updateGlobalSetting,
	addStoreSetting,
	getStoreSetting,
	updateStoreSetting,
	getStoreSeoSetting,
	addStoreCustomizationSetting,
	getStoreCustomizationSetting,
	updateStoreCustomizationSetting,
};
