"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Calendar from "react-calendar";
import styles from "./page.module.sass";
import "@/calendar.css";
import {
	getDailyTasks,
	finishRecurringTask,
	finishTask,
	addNewTask,
	getRecurringTasks,
	addRecurringTask,
	removeRecurringTask,
	addTaskWeekly,
	addTaskMonthly,
	addTaskYearly,
} from "@/actions/action";

export default function Tasks() {
	const [day, setDay] = useState(new Date());
	const [dailyTasks, setDailyTasks] = useState([]);
	const [recurringTasks, setRecurringTasks] = useState([]);
	const [tabManage, setTabManage] = useState(false);
	const [taskText, setTaskText] = useState("");

	const handleCalendar = (newDay) => {
		setDay(newDay);
	};

	const helperGetTasks = async () => {
		setDailyTasks(await getDailyTasks(day));
	};
	const helperGetRecurring = async () => {
		setRecurringTasks(await getRecurringTasks());
	};
	useEffect(() => {
		helperGetTasks();
		helperGetRecurring();
	}, [day, tabManage]);

	const handleDoneRecurring = async (id) => {
		await finishRecurringTask(id, day.toString());
		helperGetTasks();
	};

	const handleDoneRegular = async (id) => {
		await finishTask(id);
		helperGetTasks();
	};

	const handleChange = (event) => {
		setTaskText(event.target.value);
	};

	const handleNewRecurring = async () => {
		await addRecurringTask(taskText);
		setTaskText("");
		helperGetRecurring();
	};

	const handleNewNote = async () => {
		await addNewTask(taskText, day.toString());
		setTaskText("");
		helperGetTasks();
	};

	return (
		<div className={styles.main}>
			<div className={styles.sidebar}>
				<Link href="/">
					<span className={styles.notes}>
						<span className="material-symbols-rounded">
							description
						</span>
						Notatki
					</span>
				</Link>

				<Calendar
					next2Label={null}
					prev2Label={null}
					onChange={handleCalendar}
					value={day}
				/>
			</div>
			<div className={styles.container}>
				<div className={styles.tabSwitch}>
					<button
						disabled={!tabManage}
						onClick={() => setTabManage(false)}
					>
						Zadania
					</button>
					<button
						disabled={tabManage}
						onClick={() => setTabManage(true)}
					>
						Zarządzaj Zadaniami
					</button>
				</div>
				{!tabManage && (
					<p className={styles.day}>
						Lista zadań na {day.getDate()}.{day.getMonth() + 1}.
						{day.getFullYear()}
					</p>
				)}
				{!tabManage &&
					dailyTasks.map((task) => (
						<div key={task._id} className={styles.item}>
							<p
								className={
									task.completed
										? styles.completed
										: styles.pending
								}
							>
								{task.text}
							</p>
							<span
								className="material-symbols-rounded"
								onClick={
									task.recurring
										? () => handleDoneRecurring(task._id)
										: () => handleDoneRegular(task._id)
								}
							>
								check
							</span>
						</div>
					))}
				{!tabManage && (
					<div className={styles.input}>
						<input
							type="text"
							placeholder="Treść zadania"
							value={taskText}
							onChange={handleChange}
						></input>
						<span
							className="material-symbols-rounded"
							onClick={handleNewNote}
						>
							add
						</span>
					</div>
				)}
				{!tabManage && <hr />}
				{!tabManage && <p>Dodaj okresowo (na rok)</p>}
				{!tabManage && (
					<div className={styles.repeating}>
						<button
							onClick={() => {
								addTaskWeekly(taskText, day);
								helperGetTasks();
							}}
						>
							tygodniowo
						</button>
						<button
							onClick={() => {
								addTaskMonthly(taskText, day);
								helperGetTasks();
							}}
						>
							miesięcznie
						</button>
						<button
							onClick={() => {
								addTaskYearly(taskText, day);
								helperGetTasks();
							}}
						>
							rocznie
						</button>
					</div>
				)}
				{tabManage && <p className={styles.day}>Zadania Okresowe</p>}
				{tabManage &&
					recurringTasks.map((task) => (
						<div key={task._id} className={styles.item}>
							<p>{task.text}</p>
							<span
								className="material-symbols-rounded"
								onClick={() => {
									removeRecurringTask(task._id);
									helperGetRecurring();
								}}
							>
								close
							</span>
						</div>
					))}
				{tabManage && (
					<div className={styles.input}>
						<input
							type="text"
							placeholder="Treść zadania"
							value={taskText}
							onChange={handleChange}
						></input>
						<span
							className="material-symbols-rounded"
							onClick={handleNewRecurring}
						>
							add
						</span>
					</div>
				)}
			</div>
		</div>
	);
}