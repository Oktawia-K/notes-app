'use client'

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import styles from "./page.module.sass";
import { getDailyTasks, finishRecurringTask, finishTask, addNewTask, getRecurringTasks, addRecurringTask, removeRecurringTask, addTaskWeekly, addTaskMonthly, addTaskYearly } from "@/actions/action";

export default function Tasks() {
    const [day, setDay] = useState(new Date())
    const [dailyTasks, setDailyTasks] = useState([]);
    const [recurringTasks, setRecurringTasks] = useState([]);
    const [tabManage, setTabManage] = useState(false);
    const [taskText, setTaskText] = useState("")

    const handleCalendar = (newDay) => {
        setDay(newDay);
    }

    const helperGetTasks = async () => {
        setDailyTasks(await getDailyTasks(day));
    }
    const helperGetRecurring = async () => {
        setRecurringTasks(await getRecurringTasks());
    }
    useEffect(() => {
        helperGetTasks();
        helperGetRecurring()
    }, [day, tabManage]);

    const handleDoneRecurring = async (id) => {
        await finishRecurringTask(id, day.toString());
        helperGetTasks();
    }

    const handleDoneRegular = async (id) => {
        await finishTask(id);
        helperGetTasks();
    }

    const handleChange = (event) => {
        setTaskText(event.target.value);
    }

    const handleNewRecurring = async () => {
        await addRecurringTask(taskText);
        setTaskText("");
        helperGetRecurring();
    }

    const handleNewNote = async () => {
        await addNewTask(taskText, day.toString());
        setTaskText("");
        helperGetTasks();
    }


    return (
        <div>
            <Calendar onChange={handleCalendar} value={day} />
            <button disabled={!tabManage} onClick={() => setTabManage(false)}>Tasks</button>
            <button disabled={tabManage} onClick={() => setTabManage(true)}>Manage Tasks</button>
            <p>Today is {day.getDate()}.{day.getMonth() + 1}.{day.getFullYear()}</p>
            <hr />
            {!tabManage &&
                dailyTasks.map(task => (
                    <div key={task._id}>
                        <p className={task.completed ? styles.completed : styles.pending}>{task.text}</p>
                        <span className="material-symbols-rounded" onClick={task.recurring ? () => handleDoneRecurring(task._id) : () => handleDoneRegular(task._id)}>check</span>
                    </div>
                ))}
            {!tabManage && <input type="text" placeholder="Treść zadania" value={taskText} onChange={handleChange}></input>}
            {!tabManage && <button onClick={handleNewNote}>Dodaj zadanie</button>}
            {!tabManage && <hr />}
            {!tabManage && <p>Dodaj okresowo (na rok)</p>}
            {!tabManage && <button onClick={() => { addTaskWeekly(taskText, day); helperGetTasks(); }}>Dodaj co tydzień</button>}
            {!tabManage && <button onClick={() => { addTaskMonthly(taskText, day); helperGetTasks(); }}>Dodaj co miesiąc</button>}
            {!tabManage && <button onClick={() => { addTaskYearly(taskText, day); helperGetTasks(); }}>Dodaj co rok</button>}
            {tabManage && recurringTasks.map(task => (
                <div key={task._id}>
                    <p>{task.text}</p>
                    <span className="material-symbols-rounded" onClick={() => { removeRecurringTask(task._id); helperGetRecurring(); }}>close</span>
                </div>
            ))}
            {tabManage && <input type="text" placeholder="Treść zadania" value={taskText} onChange={handleChange}></input>}
            {tabManage && <button onClick={handleNewRecurring}>Dodaj zadanie</button>}
        </div >
    )
}