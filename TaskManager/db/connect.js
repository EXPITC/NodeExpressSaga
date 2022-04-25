const mongoose = require('mongoose');

// why we do like this because it more make sense IF we connect to the db first then running the server
// but if we just require('./db/connect) on our app with this
/*
mongoose
    .connect(connectionString)
    .then(() => console.log('CONNECTED TO TASK-MANAGER DB'))
    .catch((err) => console.log(err));
*/
// then we already running the server before we know the connection from the db
// so better we exports a modules function then we use variables to take that function module on app
// then running that connectDB function that will invoke server to running if it's connect to DB
const connectDB = (uri) => {
  return mongoose
    .connect(uri)
};

module.exports = connectDB;
