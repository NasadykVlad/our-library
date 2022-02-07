const {Schema, model, Types} = require('mongoose')


const schema = new Schema({
    id: {type: String},
    owner: {type: Types.ObjectId, ref: 'User'},
    text: false,
    completed: false,
    important: false
})

module.exports = model('Books', schema)
