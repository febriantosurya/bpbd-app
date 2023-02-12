const express = require('express')
const Admin = require('./models/admin')
const Root = require('./models/root')

const app = express()

const rootRoute = require('./routes/root')
const adminRoute = require('./routes/admin')

app.use(express.json())

app.use('/api/v1/auth', rootRoute)
app.use('/api/v1/auth', adminRoute)

app.listen(5000, async () => {
  console.log("App is running on port 5000")
  await Admin.sync({ alter: true })
  await Root.sync({ alter: true })
})