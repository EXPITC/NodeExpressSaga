const mongoose = require('mongoose');
// in mongoose wrapper is wrapper for the schema,
/* if the schema defines the structure for the document like the type validation and etc
    mongoose model provide an interface to the database so using the model will be able
    to  create update query and delete our documents with great ease since the api is
    extremely straightforward
*/
// this below is schema without validation mean it only store that with same value with schema
// but what if we store outside the schema mongoose will eliminate that and just pass with same value
// that's mean to we can store empty data so that why we need validator to do that
/*
const TaskSchema = new mongoose.Schema({
  name: {String},
  completed: Boolean,
});
*/
// this one below is with validator
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'], // you can just require: true, but if you want to costume message the do like this
        trim: true, // mean you can't save like this name : '    expitc   '  it will trim the rest
        maxlength:[20, "name can't be more than 20 character"]
    },
    completed: {
        type: Boolean,
        default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);