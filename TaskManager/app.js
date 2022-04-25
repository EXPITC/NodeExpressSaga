const connectDB = require('./db/connect');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
require('dotenv').config();

// middleware

app.use(express.json());

// routes
const defaultRoute = '/api/v1';
app.get('/', (req, res) => {
  res.send('Task Manager App');
});
app.use(defaultRoute, tasks);

const port = 5000;
// this the correct way to start, connect to db first check if it's connect then spin the running server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log('http:localhost:' + port));
  } catch (err) {
    console.log(err);
  }
};

start();
