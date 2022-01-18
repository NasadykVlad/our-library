const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypter = require('bcryptjs')
const jwtToken = require('jsonwebtoken')


// Опрацювання запроса на реєстрацію користувача
router.post('/registration',
    // Перевірка на помилки в плані вводу даних
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
        // Логіка, коли помилки знайдені
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).json({
                errors: errors.array(),
                message: 'Некоректні дані при реєстрації'
            })
        }

        // Отримуємо дані, які користувач надіслав при реєстрації
        const { email, password, passwordConfirm, fullName } = req.body

        // Шукаємо в базі даних, чи такий користувач вже був зареєстрований
        const isUsed = await User.findOne({email})

        // Логіка, якщо такий користувач знайдений
        if (isUsed) {
            res.send({message: 'Електронна пошта використовується іншим користувачем'})
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
            res.send({message: 'Користувач створений успішно'})
        }
    } catch (err) {
        console.log(err)
    }
})

// Опрацювання запроса на вхід користувача
router.post('/login',
    // Перевірка на помилки в плані вводу даних
    [
        check('email', 'Некоректний email').isEmail(),
        check('password', 'Некоректний пароль').isLength({min: 1})
    ],
    async(req, res) => {
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
            const { email, password } = req.body

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
                        res.send({message: 'Паролі не співпадають'})
                    }
                })
            } else {
                // Якщо користувача не знайдено, відправити це на Front End
                res.send({message: 'Такого користувача не існує'})
            }
        } catch (err) {
            console.log(err)
        }
    })

module.exports = router
