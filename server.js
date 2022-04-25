const express = require('express')
const app = express()
const cors = require('cors')
const userControllers = require('./controllers/user')
const { connect } = require('mongoose')
require('dotenv').config()
const userRoutes = require('./routes/user')

app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/api/users', userRoutes)


const start = async () => {
  try {
    await connect(process.env.MONGO_URI)
    app.listen(process.env.PORT || 3000, () => {
      console.log('Your app is listening on port ' + process.env.PORT || 3000)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

