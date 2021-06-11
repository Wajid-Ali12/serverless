import express from 'express'
import serverless from 'serverless-http'
import dotenv from 'dotenv'
import connectDB from './db'
import AWS from 'aws-sdk'
import userRoutes from './routes/userRoutes.js'



const app = express()

dotenv.config()
connectDB()

app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(3000, () => console.log(`Listening on: ${PORT}`));
// module.exports.handler = serverless(app);
export default handler = serverless(app)