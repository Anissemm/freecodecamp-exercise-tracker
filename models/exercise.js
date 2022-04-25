const { default: mongoose, Schema } = require('mongoose')

const exerciseSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        required: true
    }, 
    description: String,
    duration: Number,
    date: {
        type: Schema.Types.Date,
    }
})

module.exports = new mongoose.model('Exercise', exerciseSchema)