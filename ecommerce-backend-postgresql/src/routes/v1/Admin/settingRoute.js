const express = require('express');
const { adminSettingController } = require('../../../controllers/Admin');

const router = express.Router();

//add a global setting
router.post('/global/add', adminSettingController.addGlobalSetting);

//get global setting
router.get('/global/all', adminSettingController.getGlobalSetting);

//update global setting
router.put('/global/update', adminSettingController.updateGlobalSetting);

//add a store setting
router.post('/store-setting/add', adminSettingController.addStoreSetting);

//get store setting
router.get('/store-setting/all', adminSettingController.getStoreSetting);

//get store setting
router.get('/store-setting/seo', adminSettingController.getStoreSeoSetting);

//update store setting
router.put('/store-setting/update', adminSettingController.updateStoreSetting);

//store customization routes

//add a online store customization setting
router.post(
	'/store/customization/add',
	adminSettingController.addStoreCustomizationSetting
);

//get online store customization setting
router.get(
	'/store/customization/all',
	adminSettingController.getStoreCustomizationSetting
);

//update online store customization setting
router.put(
	'/store/customization/update',
	adminSettingController.updateStoreCustomizationSetting
);

module.exports = router;
