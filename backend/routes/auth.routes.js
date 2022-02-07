const {Router} = require('express')
const router = Router()
const authController = require('../controllers/authController')
const {check} = require('express-validator')

router.post('/registration',
    check('email', 'an-incorrect-email').isEmail(),
    check('password', 'an-incorrect-password').isLength({min: 6}),
    check('passwordConfirm', 'an-incorrect-repeat-password').custom((value, {req}) => {
        if (value !== req.body.password) {
            return false
        } else {
            return true
        }
    }),
    authController.accountRegistration)

router.post('/login',
    check('email', 'an-incorrect-email').isEmail(),
    check('password', 'an-incorrect-password').isLength({min: 1}),
    authController.accountLogin)

router.post('/sendResetEmail',
    check('email', 'an-incorrect-email').isEmail(),
    authController.accountResetEmail)

router.post('/sendToken',
    check('newPassword', 'an-incorrect-password').isLength({min: 6}),
    authController.accountSendToken)


module.exports = router
