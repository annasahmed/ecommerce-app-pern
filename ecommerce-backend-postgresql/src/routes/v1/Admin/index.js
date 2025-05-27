const express = require('express');
const authRoute = require('./authRoute');

const adminRouter = express.Router();

adminRouter.use('/auth', authRoute);

module.exports = adminRouter;
