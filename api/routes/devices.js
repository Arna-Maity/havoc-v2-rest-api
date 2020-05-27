// Import Express
const express = require('express');
const cache = require('../middleware/cache');

// Import Device Controller & Auth Middleware.
const deviceController = require('../controllers/devices');

const router = express.Router();

// A POST ReqHandler at /devices/
//router.post('/',deviceController.postDevice);

// A GET ReqHandler at /devices/
router.get('/', cache, deviceController.getAllDevices);

// A GET ReqHandler at /devices/:deviceCode/
router.get('/:deviceCode', cache, deviceController.getReqDevice);

module.exports = router;
