// services/settingService.js
const db = require('../models');
const Setting = db.settings;

const createSetting = async (data) => {
	return await Setting.create(data);
};

const findSettingByName = async (name, projection = null) => {
	const attributes = projection ? Object.keys(projection) : undefined;
	return await Setting.findOne({
		where: { name },
		attributes,
	});
};

const updateSettingByName = async (name, setting) => {
	const [_, updatedSettings] = await Setting.update(
		{ setting },
		{ where: { name }, returning: true }
	);

	return updatedSettings[0];
};

const upsertSettingByName = async (name, setting) => {
	const [record, created] = await Setting.findOrCreate({
		where: { name },
		defaults: { setting },
	});

	if (!created) {
		await record.update({ setting });
	}

	return record;
};

module.exports = {
	createSetting,
	findSettingByName,
	updateSettingByName,
	upsertSettingByName,
};
