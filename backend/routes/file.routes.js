const {Router} = require('express')
const router = Router()
const File = require('../models/File')
const fileController = require('../controllers/fileController')

router.get('/get', fileController.getFiles)
router.post('/upload', fileController.uploadFile)
router.post('/downloadFile', fileController.downloadFile)
router.post('/removeFile', fileController.removeFile)
router.post('/share', fileController.shareFile)

module.exports = router
