const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

require('dotenv').config()

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/user.routes'))
app.use('/api/posts', require('./routes/post.routes'))

module.exports = app;
