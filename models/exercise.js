const { default: mongoose, Schema } = require('mongoose')

const exerciseSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    duration: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
})

module.exports = new mongoose.model('Exercise', exerciseSchema)