const express = require('express');
const parentCategoryRoute = require('./parentCategoryRoute');
const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');
const authRoute = require('./authRoute');
const languageRoute = require('./languageRoute');

const adminRouter = express.Router();

adminRouter.use('/parent-category', parentCategoryRoute);
adminRouter.use('/category', categoryRoute);
adminRouter.use('/product', productRoute);
adminRouter.use('/auth', authRoute);
adminRouter.use('/language', languageRoute);

module.exports = adminRouter;
