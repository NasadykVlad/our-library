const {Schema, model, Types} = require('mongoose')


// Схема, яка використовується в базі даних, для синхронізації таблиць
const schema = new Schema({
    id: {type: String},
    owner: {type: Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    type: {type: String},
    accessLink: {type: String},
    size: {type: Number, default: 0},
    path: {type: String, default: ''},
    parent: {type: Types.ObjectId, ref: 'File'},
    childs: [{type: Types.ObjectId, ref: 'File'}]
})

module.exports = model('File', schema)
