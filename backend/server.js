const express = require('express')
const serverless = require('serverless-http')
const dotenv = require('dotenv')
const connectDB = require('./db')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')



const app = express()

app.use(cors())
app.use(express.json())

dotenv.config()
connectDB()

app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.use('/api/users', userRoutes)

app.use('*', (req, res) => {res.status(404).json({error: 'not found'})})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
module.exports.handler = serverless(app);
