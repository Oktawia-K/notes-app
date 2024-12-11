"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.sass";
import Textarea from "@/components/textarea";
import NoNote from "@/components/NoNote";
import {
	getNote,
	getNotesList,
	createNewNote,
	deleteNote,
} from "@/actions/action";

export default function Notes() {
	const [activeNote, setActiveNote] = useState(null);
	const [notes, setNotes] = useState([]);
	const [visible, setVisible] = useState(false);
	const [newDialogue, setNewDialogue] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const handleList = () => {
		setNewDialogue(false);
		setConfirmDelete(false);
		setVisible(!visible);
	};

	async function setNote(id) {
		if (id === null) {
			setActiveNote(null);
		} else {
			const newNote = await getNote(id);
			newNote.map((note) => setActiveNote(note));
			// console.log(activeNote._id);
		}
	}

	const helperSetNotes = async () => {
		setNotes(await getNotesList());
	};

	useEffect(() => {
		helperSetNotes();
	}, []);

	const openDialogue = () => {
		setNote(null);
		setNewDialogue(true);
	};

	const handleNewNote = () => {
		setTimeout(() => {
			helperSetNotes();
			setNewDialogue(false);
		}, 500);
	};

	const handleConfirmDelete = () => {
		setNewDialogue(false);
		setVisible(false);
		setConfirmDelete(!confirmDelete);
	};

	const handleDelete = async () => {
		await deleteNote(JSON.stringify(activeNote._id).split('"')[1]);
		setActiveNote(null);
		helperSetNotes();
	};

	return (
		<div className={styles.main}>
			<div className={styles.bar}>
				<span
					className="material-symbols-rounded"
					onClick={openDialogue}
				>
					add
				</span>
				<span
					className="material-symbols-rounded"
					onClick={handleConfirmDelete}
				>
					delete
				</span>
				<span className="material-symbols-rounded" onClick={handleList}>
					folder
				</span>
				<Link href="/tasks">
					<span className="material-symbols-rounded">list</span>
				</Link>
			</div>
			<div
				className={
					visible || confirmDelete ? styles.modal : styles.modalhidden
				}
			>
				{visible
					? notes.map((note) => (
							<div key={note._id}>
								<p
									className={
										visible || confirmDelete
											? styles.textlist
											: styles.texthidden
									}
									onClick={() => {
										setNote(null);
										setNote(
											JSON.stringify(note._id).split(
												'"'
											)[1]
										);
									}}
								>
									{note.title}
								</p>
							</div>
					  ))
					: ""}
				{confirmDelete && activeNote === null ? (
					<p>Nie wybrano notatki</p>
				) : (
					""
				)}
				{confirmDelete && activeNote ? (
					<div className={styles.buttonContainer}>
						<button
							className={styles.button}
							onClick={() => setConfirmDelete(false)}
						>
							Anuluj
						</button>
						<button
							className={styles.buttonImportant}
							onClick={handleDelete}
						>
							Usuń
						</button>
					</div>
				) : (
					""
				)}
			</div>
			<div className={styles.notes}>
				{newDialogue ? (
					<form action={createNewNote}>
						<input
							type="text"
							name="title"
							placeholder="Tytuł nowej notatki"
						></input>
						<button type="submit" onClick={handleNewNote}>
							Nowa notatka
						</button>
					</form>
				) : (
					" "
				)}
				{activeNote ? (
					<Textarea
						initialText={[activeNote.title, activeNote.text]}
						noteID={JSON.stringify(activeNote._id).split('"')[1]}
					/>
				) : (
					" "
				)}
				{newDialogue == false && activeNote == null ? <NoNote /> : " "}
				{/*<NoNote />*/}
			</div>
		</div>
	);
}
