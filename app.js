const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const urlRouter = require('./src/routes/url')


//middleware
app.use(cors({
  origin: '*'
}))
app.use(express.json())


//urlRoutes
app.use('/',urlRouter);


app.listen(process.env.PORT || 5000,() => {
    console.log(`Server started running on : ${process.env.PORT}`)
})