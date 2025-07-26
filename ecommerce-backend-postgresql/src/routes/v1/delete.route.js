const express = require('express');
const { getEmail } = require('../../controllers/delete.controller');
const router = express.Router();

router.get('/getEmail', getEmail);

module.exports = router;
