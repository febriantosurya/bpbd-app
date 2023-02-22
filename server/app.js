const express = require('express')
const User = require('./models/user')

const app = express()

const userRoute = require('./routes/user')

app.use(express.json())

app.use('/api/v1/', userRoute)

app.listen(5000, async () => {
  console.log("App is running on port 5000")
  await User.sync({ alter: true })
})