const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json({extended: true}))

// Корененвий роут для запросів
app.use('/api/auth/', require("./routes/auth.routes"))

// Функція запуску сервера
async function start() {
    try {
        await mongoose.connect('mongodb+srv://nasadyk:lalka228@cluster0.fhykj.mongodb.net/OurLibrary?retryWrites=true&w=majority', {
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
