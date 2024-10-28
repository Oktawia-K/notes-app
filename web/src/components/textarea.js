"use client"
import styles from "./textarea.module.sass";
import Markdown from 'react-markdown';
import { useState } from 'react';

export default function Textarea({ initialText }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("name of the note");
    const [text, setText] = useState(initialText);
    const [rowCount, setRowCount] = useState(1);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDoubleClick = () => {
        setIsEditing(true);
    }
    const handleChange = (event) => {
        setText(event.target.value);
        setRowCount(text.split('  ').length);
    }
    const handleBlur = () => {
        //setText(text.replace("\n", "  \n"));
        setIsEditing(false);
    };

    /*
    const handleEnter = (e) => {
        if (e.keyCode == 13)
            handleBlur();
    }
    window.addEventListener("keydown", handleEnter);
    */

    return (
        <div className={styles.textarea}>
            <div className="titleBar">
                <input type="text" value={name} onChange={handleNameChange}></input>
                <span className="material-symbols-outlined">
                    close
                </span>
            </div>
            <section onDoubleClick={handleDoubleClick}>
                {isEditing ? (<textarea rows={rowCount} value={text} onChange={handleChange} onBlur={handleBlur} />) : (<Markdown>{text}</Markdown>)}
            </section>

        </div>
    )
}