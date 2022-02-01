const {Router} = require('express')
const router = Router()
const File = require('../models/File')
const fileController = require('../controllers/fileController')

router.post('', fileController.createDir)
router.get('', fileController.getFiles)

module.exports = router
