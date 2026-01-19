const express = require('express');
const parentCategoryRoute = require('./parentCategoryRoute');
const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');
const authRoute = require('./authRoute');
const languageRoute = require('./languageRoute');

const websiteRouter = express.Router();

websiteRouter.use('/parent-category', parentCategoryRoute);
websiteRouter.use('/category', categoryRoute);
websiteRouter.use('/product', productRoute);
websiteRouter.use('/products', productRoute);
websiteRouter.use('/auth', authRoute);
websiteRouter.use('/language', languageRoute);
websiteRouter.use('/homepage-sections', require('./homepageSectionsRoute'));
websiteRouter.use('/metadata', require('./metadataRoute'));

module.exports = websiteRouter;
