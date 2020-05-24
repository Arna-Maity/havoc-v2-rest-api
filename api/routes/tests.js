const express = require('express');

const testController = require('../controllers/tests');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// GET ReqHandler at /
router.get('/', testController.getAllTests);

// GET Handler at /:testId
router.get('/:testId', testController.getReqTest);

// POST ReqHandler at /
router.post('/', checkAuth, testController.postTest);

// DELETE ReqHandler at /:testId
router.delete('/:testId', checkAuth, testController.deleteReqTest);

// PATCH ReqHandler at /:testId
router.patch('/:testId', checkAuth, testController.patchReqTest);

module.exports = router;
