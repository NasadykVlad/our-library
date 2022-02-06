const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypter = require('bcryptjs')
const jwtToken = require('jsonwebtoken')
const nodemailer = require('nodemailer')

// Опрацювання запроса на реєстрацію користувача
router.post('/registration',
    // Перевірка на помилки в плані вводу даних
    [
        check('email', 'an-incorrect-email').isEmail(),
        check('password', 'an-incorrect-password').isLength({min: 6}),
        check('passwordConfirm', 'an-incorrect-repeat-password').custom((value, {req}) => {
            if (value !== req.body.password) {
                return false
            } else {
                return true
            }
        }),
        check('fullName', "an-incorrect-repeat-name").isLength({min: 3}),
    ],
    async (req, res) => {
        try {
            // Логіка, коли помилки знайдені
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    errors: errors.array(),
                    message: 'Некоректні дані при реєстрації'
                })
            }

            // Отримуємо дані, які користувач надіслав при реєстрації
            const {email, password, passwordConfirm, fullName} = req.body

            // Шукаємо в базі даних, чи такий користувач вже був зареєстрований
            const isUsed = await User.findOne({email})

            // Логіка, якщо такий користувач знайдений
            if (isUsed) {
                res.send({message: 'email-is-used'})
            } else {
                // З ціллю безпеки хешуємо пароль
                const hashedPassword = await bcrypter.hash(password, 12)
                const hashedPasswordConfirm = await bcrypter.hash(passwordConfirm, 12)

                // Створюємо нового користувача через модель
                const user = new User({
                    email, password: hashedPassword, passwordConfirm: hashedPasswordConfirm, fullName
                })

                // Зберігаємо його в базі даних
                await user.save()

                // Повертаємо відповідь на Front-End
                res.send({message: 'user-created'})
            }
        } catch (err) {
            console.log(err)
        }
    })

// Опрацювання запроса на вхід користувача
router.post('/login',
    // Перевірка на помилки в плані вводу даних
    [
        check('email', 'an-incorrect-email').isEmail(),
        check('password', 'an-incorrect-password').isLength({min: 1})
    ],
    async (req, res) => {
        try {
            // Логіка, коли помилки знайдені
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    errors: errors.array(),
                    message: 'Некоректні дані вводу'
                })
            }

            // Отримуємо дані, які користувач надіслав при реєстрації
            const {email, password} = req.body

            // Шукаємо в базі даних, чи такий користувач вже був зареєстрований
            const user = await User.findOne({email})

            // Логіка, якщо такий користувач знайдений
            if (user) {

                // Розхешуємо пароль і перевіримо чи сходиться той пароль,
                // який ввів користувач з тим, який є в базі даних
                bcrypter.compare(password, user.password, (err, ress) => {
                    // Якщо паролі не співпадають, відправити це на Front End
                    if (ress) {
                        // Секретний токен для входу
                        const jwtSecret = '213fdfdsjfsjUs]]f[g%dsodvt2352Fsdkm!!'

                        // Організовуємо вхід, за допомогою usedId, який є в базі в кожного
                        // користувача індивідуальний, і визначаємо його час життя
                        const token = jwtToken.sign(
                            {UserId: user.id},
                            jwtSecret,
                            {expiresIn: '1h'}
                        )
                        // Відсилаємо успішну відповідь на Front End
                        res.send({token, userId: user.id})
                    } else {
                        res.send({message: 'an-incorrect-password'})
                    }
                })
            } else {
                // Якщо користувача не знайдено, відправити це на Front End
                res.send({message: 'you-dont-register'})
            }
        } catch (err) {
            console.log(err)
        }
    })

router.post('/sendResetEmail',
    check('email', 'an-incorrect-email').isEmail(),
    async (req, res) => {
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
                    from: 't.empire228@gmail.com', // sender address
                    to: email, // list of receivers
                    subject: "Відновлення паролю", // Subject line
                    html: "<p>Доброго дня. Ви хочете відновити пароль до свого облікового запису \"Наша бібліотека\". <br> Ваш код відновлення: </p>" + randomToken
                });

                user.tokenReset = randomToken;

                await user.save()

                res.json({message: 'mail-send'})

            } else {
                res.status(200).json({
                    errors:[{msg: 'you-dont-register'}],
                    message: 'Некоректні дані вводу'
                })
            }
        } catch (err) {
            console.log(err)
        }
    })

router.post('/sendToken',
    check('newPassword', 'an-incorrect-password').isLength({min: 6}),
    async (req, res) => {
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
                  errors:[{msg: 'token-is-not-correct'}],
                  message: 'Некоректні дані вводу'
              })
          }
        } else {
            res.json({message: 'error'})
        }
    } catch (err) {
        console.log(err)
    }
})


module.exports = router
