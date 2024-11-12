'use server'

import Note from '@/models/Note';


const getNote = async (id) => {
    return Note.find({ _id: id });
}

const getNotesList = async () => {
    return Note.find({ owner: "octavia" })
}

const updateNote = async (id, title, text) => {
    const note = await Note.findOne({ _id: id });
    note.title = title;
    note.text = text;
    await note.save();
}

export { getNote, updateNote, getNotesList }