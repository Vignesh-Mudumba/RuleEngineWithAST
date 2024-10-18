const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');

// Routes for rule operations
router.post('/create', ruleController.createRule);
router.post('/evaluate', ruleController.evaluateRule);
router.get('/', ruleController.getAllRules);
router.post('/combine', ruleController.combineRules);

module.exports = router;
