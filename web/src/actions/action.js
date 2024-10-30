'use server'

import Note from '@/models/Note';
import { ObjectId } from 'mongodb';


const getNote = async (id) => {
    return Note.findOne({ _id: id })
}

const updateNote = async (id, title, text) => {
    const note = await Note.findOne({ _id: id });
    note.title = title;
    note.text = text;
    await note.save();
}

export { getNote, updateNote }