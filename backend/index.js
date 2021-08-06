const express = require('express')
const mysql = require('mysql2')
const studentsControler = require('./controllers/StudentsController')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Server is ready')
})

app.use('/estudantes', studentsControler)

app.listen(port, () => {
  console.log(`Listen on port ${port}`)
})