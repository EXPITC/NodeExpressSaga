const connectDB = require('./db/connect');
const express = require('express')
const router = require('./routes/task')

require('dotenv').config()


const app = express()
const port = 5000

app.use(express.json())
app.use(router)

const start = async () => {
  try {
    console.log("connecting to db")
    await connectDB(process.env.MONGO_URI)
    
    console.log('db connected')
    app.listen(port,()=> console.log('https:localhost:'+port));
  } catch (err) {
    console.log(err)
  }
}

start();