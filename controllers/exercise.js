const Exercise = require('../models/exercise')
const User = require('../models/User')

const setExercise = async (req, res, next) => {
    const { _id } = req.params
    const { description, duration, date } = req.body
    try {
        const user = await User.findById(_id)
        // console.log(user)
        if (!user) {
            return res.json({ msg: 'No User with such id' })
        } else {
            const exercise = await Exercise.create({
                _userId: _id,
                description,
                duration,
                date: date && Date.parse(date) ? new Date(date).toDateString() : new Date().toDateString()
            })

            return res.json({
                _id: user._id,
                username: user.username, 
                description: exercise.description, 
                duration: exercise.duration,
                date: exercise.date 
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const getUserWithExercise = async (res, req, next) => {

}

module.exports = {
    setExercise,
    getUserWithExercise
}