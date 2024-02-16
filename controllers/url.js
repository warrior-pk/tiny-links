const shortid = require('shortid') 
const URL = require('../models/url')

async function getHomePage(req,res){
    const allUrls = await URL.find({})
    return res.render('index',{
        urls : allUrls
    })
}

async function generateNewUrl (req, res) {
    const shortId = shortid.generate()
    const body = req.body
    // console.log(body.redirectUrl)
    if(!body.redirectUrl) return res.status(400).json({Error : 'URL is required'})

    await URL.create({
        shortId: shortId,
        redirectUrl: body.redirectUrl,
        visitHistory: []
    })
    return res.redirect('/')
}

async function redirectToUrl(req, res){
    const shortId = req.params.shortId

    const entry = await URL.findOneAndUpdate(
        {
            shortId : shortId,
        },
        {
            $push: {
                visitHistory : {
                    timestamp : Date.now(),
                }
            }
        }
    )
    return res.redirect(entry.redirectUrl)
}

async function showAnalytics(req, res){
    const shortId = req.params.shortId
    const entry = await URL.findOne({
        shortId
    })
    return res.json({
        totalClicks : entry.visitHistory.length,
    })
}

module.exports = { generateNewUrl , redirectToUrl, showAnalytics, getHomePage}