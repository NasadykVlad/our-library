const {Schema, model, Types} = require('mongoose')


// Схема, яка використовується в базі даних, для синхронізації таблиць
const schema = new Schema({
    email: {type: String, required: true, unique: true},
    fullName: {type: String, required: true},
    password: {type: String, required: true},
    passwordConfirm: {type: String, required: true},
    todos: [{type: Types.ObjectId, ref: 'Todo'}]
})

module.exports = model('User', schema)
