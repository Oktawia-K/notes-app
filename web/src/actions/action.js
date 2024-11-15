'use server'

import Note from '@/models/Note';
import Task from "@/models/Task";


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

const createNewNote = async (post) => {
    const owner = "octavia"
    const title = post.get('title');
    const text = "Nowa notatka w Markdown."

    const note = new Note({ owner, title, text });
    await note.save();
}

const deleteNote = async (id) => {
    await Note.find({ _id: id }).deleteOne();
}

const getDailyTasks = async (date) => {
    const dayBefore = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayAfter = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    const datedTasks = await Task.find({ owner: "octavia", date: { $gte: dayBefore, $lt: dayAfter } });
    const recurringTasks = await Task.find({ owner: "octavia", recurring: true });
    for (let i = 0; i < datedTasks.length; i++) {
        for (let j = 0; j < recurringTasks.length; j++) {
            if (datedTasks[i].text == recurringTasks[j].text)
                recurringTasks.splice(j, 1);
        }
    }
    return [...datedTasks, ...recurringTasks];
}

const finishRecurringTask = async (id, date) => {
    const recurringTask = await Task.findOne({ _id: id });
    const finishedTask = new Task({ owner: "octavia", text: recurringTask.text, recurring: false, date: new Date(date), completed: true })
    await finishedTask.save();
}

const finishTask = async (id) => {
    const task = await Task.findOne({ _id: id });
    if (task.completed)
        return;
    task.completed = true;
    await task.save();
}

const addNewTask = async (text, date) => {
    const newTask = new Task({ owner: "octavia", text: text, recurring: false, date: new Date(date), completed: false });
    await newTask.save();
}

const addRecurringTask = async (text) => {
    const newTask = new Task({ owner: "octavia", text: text, recurring: true, completed: false });
    await newTask.save();
}

const removeRecurringTask = async (id) => {
    await Task.findOne({ _id: id }).deleteOne();
}

const getRecurringTasks = async () => {
    return Task.find({ owner: "octavia", recurring: true });
}

const addTaskWeekly = async (text, date) => {
    for (let i = 0; i < 53; i++) {
        let newTask = new Task({ owner: "octavia", text: text, recurring: false, date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 * i), completed: false });
        await newTask.save();
    }
}

const addTaskMonthly = async (text, date) => {
    for (let i = 0; i < 13; i++) {
        let newTask = new Task({ owner: "octavia", text: text, recurring: false, date: new Date(date.getFullYear(), date.getMonth() + i, date.getDate()), completed: false });
        await newTask.save();
    }
}

const addTaskYearly = async (text, date) => {
    for (let i = 0; i < 11; i++) {
        let newTask = new Task({ owner: "octavia", text: text, recurring: false, date: new Date(date.getFullYear() + i, date.getMonth(), date.getDate()), completed: false });
        await newTask.save();
    }
}

export { getNote, updateNote, getNotesList, createNewNote, deleteNote, getDailyTasks, finishRecurringTask, finishTask, addNewTask, addRecurringTask, removeRecurringTask, getRecurringTasks, addTaskWeekly, addTaskMonthly, addTaskYearly }