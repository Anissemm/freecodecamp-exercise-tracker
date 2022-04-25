const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user')
const exerciseControllers = require('../controllers/exercise')

router.route('/').get(userControllers.getAllUsers).post(userControllers.setUser)
router.route('/:_id/exercises').post(exerciseControllers.setExercise)

module.exports = router