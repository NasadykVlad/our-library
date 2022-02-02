const {Schema, model, Types} = require('mongoose')


// Схема, яка використовується в базі даних, для синхронізації таблиць
const schema = new Schema({
    id: {type: String},
    owner: {type: Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    type: {type: String},
    date: {type: Date, default: Date.now()},
    size: {type: Number, default: 0},
    path: {type: String, default: ''},
})

module.exports = model('File', schema)
