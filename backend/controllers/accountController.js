const User = require('../models/User')
const {validationResult} = require("express-validator");
const bcrypter = require("bcryptjs");

class accountController {
    async getAccountInformation(req, res) {
        try {
            const {userId} = req.query

            const user = await User.findOne({_id: userId})

            if (user) {
                res.json({
                    fullName: user.fullName
                })
            } else {
                res.json({message: 'User is not defined'})
            }
        } catch (e) {
            console.log(e)
        }
    }

    async changeUserName(req, res) {
        try {
            const {userId, fullName} = req.body

            const user = await User.findOne({_id: userId})

            if (user) {
                user.fullName = fullName

                await user.save()

                res.json({status: 'ok'})
            } else {
                res.json({message: 'User is not defined'})
            }
        } catch (e) {
            console.log(e)
        }
    }

    async changeUserPassword(req, res) {
        try {
            const {userId, oldPassword, newPassword} = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    errors: errors.array(),
                    message: 'Некоректні дані вводу'
                })
            }

            const user = await User.findOne({_id: userId})

            if (user) {
                const checkPass = bcrypter.compareSync(oldPassword, user.password)
                if (checkPass === true) {
                    let hashPas = bcrypter.hashSync(newPassword, 12)

                    user.password = hashPas
                    user.passwordConfirm = hashPas

                    await user.save()

                    res.json({message: 'ok'})
                } else {
                    res.send({message: 'an-incorrect-old-password'})
                }

            } else {
                res.json({message: 'User is not defined'})
            }
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new accountController()
