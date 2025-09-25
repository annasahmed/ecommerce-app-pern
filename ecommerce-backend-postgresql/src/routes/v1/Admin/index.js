const express = require('express');
const authRoute = require('./authRoute');
const parentCategoryRoute = require('./parentCategoryRoute');
const categoryRoute = require('./categoryRoute');
const uspRoute = require('./uspRoute');
const mediaRoute = require('./mediaRoute');
const branchRoute = require('./branchRoute');
const vendorRoute = require('./vendorRoute');
const productRoute = require('./productRoute');
const settingRoute = require('./settingRoute');
const languageRoute = require('./languageRoute');
const attributeRoute = require('./attributeRoute');

const adminRouter = express.Router();

adminRouter.use('/auth', authRoute);
adminRouter.use('/parent-category', parentCategoryRoute);
adminRouter.use('/category', categoryRoute);
adminRouter.use('/usp', uspRoute);
adminRouter.use('/branch', branchRoute);
adminRouter.use('/vendor', vendorRoute);
adminRouter.use('/product', productRoute);
adminRouter.use('/setting', settingRoute);
adminRouter.use('/language', languageRoute);
adminRouter.use('/media', mediaRoute);
adminRouter.use('/attribute', attributeRoute);

module.exports = adminRouter;
