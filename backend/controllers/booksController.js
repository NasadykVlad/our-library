const Books = require('../models/Books')

class BooksController {
    async addBook(req, res) {
        try {
            const {text, id, userId} = req.body

            const book = await new Books({
                text,
                id,
                owner: userId,
                important: false,
                completed: false
            })

            await book.save()
            res.json(book)
        } catch (err) {
            console.log(err)
        }
    }

    async getBooks(req, res) {
        try {
            const {userId} = req.query

            const booksAllInfo = await Books.find({owner: userId})

            const books = []

            booksAllInfo.forEach(book => {
                books.push({
                    text: book.text,
                    completed: book.completed,
                    important: book.important,
                    id: book.id
                })
            })

            res.json(books)
        } catch (err) {
            console.log(err)
        }
    }

    async deleteBook(req, res) {
        try {
            const {userId, bookId} = req.body

            await Books.deleteOne({id: bookId, userId})

            res.json({
                status: 'ok'
            })
        } catch (err) {
            console.log(err)
        }
    }

    async completedBook(req, res) {
        try {
            const {userId, bookId, completed} = req.body

            await Books.findOneAndUpdate({id: bookId, userId}, {completed: !completed})

            res.json({
                status: 'ok',
                completed
            })
        } catch (err) {
            console.log(err)
        }
    }

    async importantBook(req, res) {
        try {
            const {userId, bookId, important, completed} = req.body

            if (completed === false) {
                await Books.findOneAndUpdate({id: bookId, userId}, {important: !important})

                res.json({
                    status: 'ok',
                    important
                })
            } else {
                res.json({
                    status: "error"
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = new BooksController()
