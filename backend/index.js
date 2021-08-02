const express = require('express')
const mysql = require('mysql2')

const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Listen on port ${port}`)
})