const express = require('express');
const app = express();
const tasks = require('./routes/tasks')

// middleware

app.use(express.json())

// routes
const defaultRoute = '/api/v1'
app.get('/', (req, res) => {
    res.send('Task Manager App');
})
app.use(defaultRoute,tasks)



const port = 5000
app.listen(port, ()=> console.log('http:localhost:'+port))