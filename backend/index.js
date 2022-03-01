const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
require('dotenv').config()
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(fileUpload({}))
app.use(express.json({extended: true}))

app.use('/api/auth/', require("./routes/auth.routes"))
app.use('/api/books/', require("./routes/books.routes"))
app.use('/api/files', require('./routes/file.routes'))
app.use('/api/account', require('./routes/account.routes'))


async function start() {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log(`server started on ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()
