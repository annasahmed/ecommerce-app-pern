const express = require('express');
const authRoute = require('./authRoute');
const parentCategoryRoute = require('./parentCategoryRoute');

const adminRouter = express.Router();

adminRouter.use('/auth', authRoute);
adminRouter.use('/parent-category', parentCategoryRoute);

module.exports = adminRouter;
