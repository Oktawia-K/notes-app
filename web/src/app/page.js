"use client"
import { useState, useEffect } from 'react';
import styles from "./page.module.sass";
import Textarea from "../components/textarea";
import NoNote from "@/components/NoNote";
import { getNote, getNotesList } from '@/actions/action';

export default function Home() {
    const [activeNote, setActiveNote] = useState("");
    const [notes, setNotes] = useState([]);
    const [visible, setVisible] = useState(false);

    const handleList = () => {
        setVisible(!visible);
    }
    /*
    const note = await getNote("671f6b99df48fcc376272949");
    console.log(note);
    console.log(JSON.stringify(note._id).split('\"')[1]);
    */
    async function setNote(id) {
        if (id === null) {
            setActiveNote(null);
        } else {
            const newNote = await getNote(id)
            newNote.map(note => (setActiveNote(note)))
            // console.log(activeNote._id);
        }
    }

    const helperSetNotes = async () => {
        setNotes(await getNotesList());
    }

    useEffect(() => {
        helperSetNotes();

    }, [])

    const handleChangeNote = (id) => {
        setNote(JSON.stringify(id).split('\"')[1]);
    }

    return (
        <div className={styles.main}>
            <div className={styles.bar}>
                <span className="material-symbols-rounded">
                    add
                </span>
                <span className="material-symbols-rounded">
                    draft
                </span>
                <span className="material-symbols-rounded" onClick={handleList}>
                    folder
                </span>
                <span className="material-symbols-rounded">
                    help
                </span>
            </div>
            <div className={styles.modal}>
                {visible ? notes.map(note => (
                    <div key={note._id}>
                        <p onClick={() => { setNote(null); setNote(JSON.stringify(note._id).split('\"')[1]) }}>{note.title}</p>
                    </div>
                )) : ""}
            </div>
            <div className={styles.notes}>
                {activeNote ? <Textarea initialText={[activeNote.title, activeNote.text]} noteID={JSON.stringify(activeNote._id).split('\"')[1]} /> : <NoNote />}
                {/*<NoNote />*/}
            </div>
        </div>
    )
}