const express = require('express');
const authRoute = require('./authRoute');
const parentCategoryRoute = require('./parentCategoryRoute');
const categoryRoute = require('./categoryRoute');
const uspRoute = require('./uspRoute');
const settingRoute = require('./settingRoute');
const languageRoute = require('./languageRoute');

const adminRouter = express.Router();

adminRouter.use('/auth', authRoute);
adminRouter.use('/parent-category', parentCategoryRoute);
adminRouter.use('/category', categoryRoute);
adminRouter.use('/usp', uspRoute);
adminRouter.use('/setting', settingRoute);
adminRouter.use('/language', languageRoute);

module.exports = adminRouter;
