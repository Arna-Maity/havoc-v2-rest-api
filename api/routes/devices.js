// Import Express
const express = require('express');

// Import Device Controller & Auth Middleware.
const deviceController = require('../controllers/devices');

const router = express.Router();

// A POST ReqHandler at /devices/
//router.post('/',deviceController.postDevice);

// A GET ReqHandler at /devices/
router.get('/', deviceController.getAllDevices);

// A GET ReqHandler at /devices/:deviceCode/
router.get('/:deviceCode', deviceController.getReqDevice);

module.exports = router;
