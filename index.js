require('dotenv').config()
const path = require('path')
const express = require('express')
const urlRoute = require('./routes/url')
const { connectMongo } = require('./connect')


const app = express()
const PORT = process.env.PORT

//  Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


connectMongo(process.env.MONGODB_URL)
    .then(() => console.log('Mongodb Connection established'))
    .catch(err => console.log('Mongodb Connection error', err))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use('/', urlRoute)
app.listen(PORT, () => console.log(`Server Started at ${PORT}`))
