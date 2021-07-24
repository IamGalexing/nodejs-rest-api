const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('morgan')
const helmet = require('helmet')
const dotenv = require('dotenv')
dotenv.config()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: 10000 }))

require('../configs/passport-config')

const router = require('../routes/api')
app.use('/api/contacts', router.contacts)
app.use('/api/users', router.auth)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

const PORT = process.env.PORT || 3000
const { DB_HOST } = process.env

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successful'))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err.message)
    process.exit(1)
  })
