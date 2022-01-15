const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypter = require('bcryptjs')
const jwtToken = require('jsonwebtoken')

router.post('/registration',
    [
        check('email', 'Некоректний email').isEmail(),
        check('password', 'Некоректний пароль').isLength({min: 6}),
        check('passwordConfirm', 'Некоректно повторений пароль').custom((value, { req }) => {
            if (value !== req.body.password) {
                return false
            } else {
                return true
            }
        }),
        check('fullName', "Некоректне ім'я").isLength({min: 3}),
    ],
    async(req, res) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).json({
                errors: errors.array(),
                message: 'Некоректні дані при реєстрації'
            })
        }

        const { email, password, passwordConfirm, fullName } = req.body

        const isUsed = await User.findOne({email})

        if (isUsed) {
            res.send({message: 'Електронна пошта використовується іншим користувачем'})
        } else {

            const hashedPassword = await bcrypter.hash(password, 12)
            const hashedPasswordConfirm = await bcrypter.hash(passwordConfirm, 12)

            const user = new User({
                email, password: hashedPassword, passwordConfirm: hashedPasswordConfirm, fullName
            })

            await user.save()

            res.send({message: 'Користувач створений успішно'})
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/login',
    [
        check('email', 'Некоректний email').isEmail(),
        check('password', 'Некоректний пароль').isLength({min: 1})
    ],
    async(req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    errors: errors.array(),
                    message: 'Некоректні дані вводу'
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({email})

            if (user) {
                const isMatch = bcrypter.compare(password, user.password)

                if (!isMatch) {
                    res.send({message: 'Паролі не співпадають'})
                } else {
                    const jwtSecret = '213fdfdsjfsjUs]]f[g%dsodvt2352Fsdkm!!'

                    const token = jwtToken.sign(
                        {UserId: user.id},
                        jwtSecret,
                        {expiresIn: '1h'}
                        )

                    res.send({token, userId: user.id})
                }

            } else {
                res.send({message: 'Такого користувача не існує'})
            }

        } catch (err) {
            console.log(err)
        }
    })

module.exports = router
