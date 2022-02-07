const {Schema, model, Types} = require('mongoose')


const schema = new Schema({
    email: {type: String, required: true, unique: true},
    fullName: {type: String, required: true},
    password: {type: String, required: true},
    passwordConfirm: {type: String, required: true},
    tokenReset: {type: Number}
})

module.exports = model('User', schema)
