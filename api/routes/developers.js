const express = require('express');
const cache = require('../middleware/cache');

const router = express.Router();

const developerController = require('../controllers/developers');

router.get('/', cache, developerController.getAllDevelopers);

router.get('/:developerId', cache, developerController.getReqDeveloper);

module.exports = router;
