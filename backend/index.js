const express = require('express')
const cors = require('cors')
const configDb = require('./config/database')
const router = require('./config/routes')
const app = express()
const port = 3100

app.use(express.json())
app.use('/upload', express.static('upload'))
app.use(cors())
app.use(router)
configDb()

app.listen(port, () => {
    console.log('server running on port', port)
})