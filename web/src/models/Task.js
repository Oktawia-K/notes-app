import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    recurring: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    }
})

export default mongoose.models.Task || mongoose.model('Task', taskSchema)