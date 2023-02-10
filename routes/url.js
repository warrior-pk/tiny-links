const express = require('express')
const { generateNewUrl, redirectToUrl, showAnalytics, getHomePage} = require('../controllers/url')
const router = express.Router()
const URL = require('../models/url')

router
    .get('/', getHomePage)
    .post('/api/url', generateNewUrl)
    .get('/api/:shortId', redirectToUrl)
    .get('/api/analytics/:shortId', showAnalytics)

module.exports = router