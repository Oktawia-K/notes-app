import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
})

export default mongoose.models.Note || mongoose.model('Note', postSchema)