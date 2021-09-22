const express = require('express');
const router = express.Router();
const puppeteerController = require('../controllers/puppeteer.controller');

router.post('/api/v1/puppeteer', puppeteerController.createPuppeteerEvent);

module.exports = router;