import mongoose from 'mongoose'

const subtodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required : true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export const SubTodo = mongoose.model("SubTodo", subtodoSchema)