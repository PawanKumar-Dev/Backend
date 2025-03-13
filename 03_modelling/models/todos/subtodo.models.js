import mongoose from 'mongoose'

const subtodoSchema = new mongoose.Schema({})

export const SubTodo = mongoose.model("SubTodo", subtodoSchema)