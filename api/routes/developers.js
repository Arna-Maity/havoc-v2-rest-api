const express = require('express');
const router = express.Router();

const developerController = require('../controllers/developers');

router.get('/',developerController.getAllDevelopers);

router.get('/:developerId',developerController.getReqDeveloper);

module.exports = router;