const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypter = require('bcryptjs')
const jwtToken = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

class authController {

    async accountRegistration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    errors: errors.array(),
                    message: 'Некоректні дані при реєстрації'
                })
            }

            const {email, password, passwordConfirm, fullName} = req.body

            const isUsed = await User.findOne({email})

            if (isUsed) {
                res.send({message: 'email-is-used'})
            } else {
                const hashedPassword = await bcrypter.hash(password, 12)
                const hashedPasswordConfirm = await bcrypter.hash(passwordConfirm, 12)

                const user = new User({
                    email, password: hashedPassword, passwordConfirm: hashedPasswordConfirm, fullName
                })

                await user.save()

                res.send({message: 'user-created'})
            }
        } catch (err) {
            console.log(err)
        }
    }

    async accountLogin(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    errors: errors.array(),
                    message: 'Некоректні дані вводу'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (user) {
                bcrypter.compare(password, user.password, (err, ress) => {
                    if (ress) {
                        const jwtSecret = process.env.JWT_SECRET

                        const token = jwtToken.sign(
                            {UserId: user.id},
                            jwtSecret,
                            {expiresIn: '1h'}
                        )
                        res.send({token, userId: user.id})
                    } else {
                        res.send({message: 'an-incorrect-password'})
                    }
                })
            } else {
                res.send({message: 'you-dont-register'})
            }
        } catch (err) {
            console.log(err)
        }
    }

    async accountResetEmail(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    errors: errors.array(),
                    message: 'Некоректні дані вводу'
                })
            }

            const {email} = req.body

            const user = await User.findOne({email})

            if (user) {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 't.empire228@gmail.com',
                        pass: 'Vlad2001nasadyk'
                    }
                });

                let randomToken = Math.floor(Math.random() * 9999) + 1000
                await transporter.sendMail({
                    from: 't.empire228@gmail.com',
                    to: email,
                    subject: "Відновлення паролю",
                    html: "<p>Доброго дня. Ви хочете відновити пароль до свого облікового запису \"Наша бібліотека\". <br> Ваш код відновлення: </p>" + randomToken
                });

                user.tokenReset = randomToken;

                await user.save()

                res.json({message: 'mail-send'})
            } else {
                res.status(200).json({
                    errors: [{msg: 'you-dont-register'}],
                    message: 'Некоректні дані вводу'
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    async accountSendToken(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    errors: errors.array(),
                    message: 'Некоректні дані вводу'
                })
            }

            const {email, token, newPassword} = req.body

            const user = await User.findOne({email})

            if (user) {
                if (+token === user.tokenReset) {
                    const hashedPassword = await bcrypter.hash(newPassword, 12)

                    user.password = hashedPassword
                    user.passwordConfirm = hashedPassword
                    user.tokenReset = undefined

                    await user.save()

                    res.json({message: 'password-change'})
                } else {
                    res.status(200).json({
                        errors: [{msg: 'token-is-not-correct'}],
                        message: 'Некоректні дані вводу'
                    })
                }
            } else {
                res.json({message: 'error'})
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new authController()
