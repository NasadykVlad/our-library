const {Schema, model, Types} = require('mongoose')


// Схема, яка використовується в базі даних, для синхронізації таблиць
const schema = new Schema({
    email: {type: String, required: true, unique: true},
    fullName: {type: String, required: true},
    password: {type: String, required: true},
    passwordConfirm: {type: String, required: true},
    books: [{type: Types.ObjectId, ref: 'Books'}],
    diskSpace: {type: Number, default: 1024**3*10},
    usedSpace: {type: Number, default: 0},
    files: [{type: Types.ObjectId, ref: 'File'}]
})

module.exports = model('User', schema)
