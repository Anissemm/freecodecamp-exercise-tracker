const Exercise = require('../models/exercise')
const User = require('../models/User')

const setExercise = async (req, res, next) => {
    const { _id } = req.params
    const { description, duration, date } = req.body
    try {
        if (!_id) {
            res.status(400).json('Path `userID` is required');
            return;
        }
        if (!description) {
            res.status(400).json('Path `description` is required');
            return;
        }
        if (!duration) {
            res.status(400).json('Path `duration` is required');
            return;
        }

        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).json({ msg: 'No User with such id' })
        } else {
            const exercise = await Exercise.create({
                _userId: _id,
                description,
                duration,
                date: date && Date.parse(date) ? new Date(date) : new Date()
            })

            return res.status(201).json({
                _id,
                username: user.username,
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date.toDateString()
            })
        }

    } catch (error) {
        res.status(500).json({ msg: 'Internal server error!' })
    }
}

const getLogs = async (req, res, next) => {
    const { _id: id } = req.params
    const { from, to, limit } = req.query
    
    let dateObj = {}

    if (from) {
        dateObj['$gte'] = new Date(from);
    }
    
    if (to) {
        dateObj['$lte'] = new Date(to);
    }

    let filter = {
        _userId: id,
    }

    if (from || to) {
        filter.date = dateObj
    }

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.state(404).json({ msg: 'No such user!' })
        }

        const exercises = await Exercise.find(filter).limit(limit ? limit : 1000)
        console.log(exercises)
        res.status(200).json({
            count: exercises.length,
            username: user.username,
            _id: user._id,
            log: exercises.map(exercise => ({
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date.toDateString()
            }))
        })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    setExercise,
    getLogs
}