const {Router} = require('express')
const router = Router()
const accountController = require('../controllers/accountController')
const {check} = require("express-validator");

router.get('/get', accountController.getAccountInformation)
router.post('/changeName', accountController.changeUserName)
router.post('/changePassword',
    check('oldPassword', 'an-incorrect-old-password').isLength({min: 6}),
    check('newPassword', 'an-incorrect-new-password').isLength({min: 6}),
    accountController.changeUserPassword)


module.exports = router
