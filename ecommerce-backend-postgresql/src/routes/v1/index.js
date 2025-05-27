const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const roleRoute = require('./role.route');
const docsRoute = require('./docs.route');
const deleteRoute = require('./delete.route');

const adminRouter = require('./Admin');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/roles', roleRoute);
router.use('/docs', docsRoute);
router.use('/delete', deleteRoute);

router.use('/admin', adminRouter);

module.exports = router;
