const {Router} = require('express')
const router = Router()
const BooksController = require('../controllers/BooksController')


router.post('/add', BooksController.addBook)

router.get('/get', BooksController.getBooks)

router.post('/delete', BooksController.deleteBook)

router.post('/completed', BooksController.completedBook)

router.post('/important', BooksController.importantBook)



module.exports = router
