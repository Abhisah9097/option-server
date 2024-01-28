const express = require('express');
const options_controller = require('../controllers/options_controller');

const router = express.Router();

router.get('/options', options_controller);

module.exports = router;