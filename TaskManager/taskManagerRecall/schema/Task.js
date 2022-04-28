const { default: mongoose } = require("mongoose");


const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
        maxlength: [20, 'only allow up to 20 characters']
    },
    completed: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Task', taskSchema)