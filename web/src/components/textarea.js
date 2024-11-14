"use client"
import styles from "./textarea.module.sass";
import Markdown from 'react-markdown';
import { useState } from 'react';
import { updateNote } from '@/actions/action';
import PopUp from '@/components/PopUp';

export default function Textarea({ initialText, noteID }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialText[0]);
    const [text, setText] = useState(initialText[1]);
    const [rowCount, setRowCount] = useState(text.split('  ').length);
    const [confirmation, setConfirmation] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDoubleClick = () => {
        setIsEditing(true);
        setConfirmation(false);
    }
    const handleChange = (event) => {
        setText(event.target.value);
        setRowCount(text.split('  ').length);
    }
    const handleBlur = () => {
        //setText(text.replace("\n", "  \n"));
        setIsEditing(false);
    };

    const handleSave = () => {
        updateNote(noteID, name, text);
        // alert("Notatka zapisana!");
        setConfirmation(true);
    }

    return (
        <div>
            {confirmation ? <PopUp>Notatka zapisana!</PopUp> : " "}
            <div className={styles.textarea}>
                <div className="titleBar">
                    <input type="text" value={name} onChange={handleNameChange}></input>
                    <span className="material-symbols-rounded" onClick={handleSave}>
                        save
                    </span>
                    {/*<span className="material-symbols-outlined">
                    close
                </span>*/}
                </div>
                <section onDoubleClick={handleDoubleClick}>
                    {isEditing ? (<textarea rows={rowCount} value={text} onChange={handleChange} onBlur={handleBlur} />) : (<Markdown>{text}</Markdown>)}
                </section>
            </div>
        </div>

    )
}