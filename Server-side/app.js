require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT
const { User } = require('./models');

const router = require('./routes');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static('public'))

app.use('/v2',router)

// app.get('/', (req, res) => {
//   res.send("hello world")
// })

app.listen(port, () => {
  console.log(`gorengan ${port}`)
})