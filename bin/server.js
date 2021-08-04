const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')
const helmet = require('helmet')
const { createFolderIfNotExist } = require('../helpers')
require('dotenv').config()

const { DB_HOST, TEMP_DIR, IMG_DIR } = process.env

const TEMP_FOLDER = path.join(process.cwd(), TEMP_DIR)
const IMG_FOLDER = path.join(process.cwd(), 'public', IMG_DIR)

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: 10000 }))

require('../configs/passport-config')

const router = require('../routes/api')

app.use('/api/contacts', router.contacts)
app.use('/api/users', router.auth)
app.use(express.static(path.join(process.cwd(), 'public')))

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

const PORT = process.env.PORT || 3000

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successful'))
  .then(() => {
    app.listen(PORT, () => {
      createFolderIfNotExist(TEMP_FOLDER)
      createFolderIfNotExist(IMG_FOLDER)
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err.message)
    process.exit(1)
  })
