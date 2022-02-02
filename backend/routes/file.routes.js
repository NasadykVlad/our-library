const {Router} = require('express')
const router = Router()
const File = require('../models/File')
const fileController = require('../controllers/fileController')

router.post('/upload', fileController.uploadFile)
router.get('/get', fileController.getFiles)
router.post('/downloadFile', fileController.downloadFile)

module.exports = router
