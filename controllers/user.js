const User = require('../models/User')

const setUser = async (req, res, next) => {
    const { username } = req.body
    if (!username) {
        return res.status(400).json({ error: 'Missing username' })
    }

    try {
        let user = await User.findOne({ username })
        if (user) {
            res.status(201).json({ username: user.username, _id: user._id })
        } else {
            user = await User.create({ username })
            res.status(201).json({ username: user.username, _id: user._id })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = {
    setUser,
    getAllUsers
}