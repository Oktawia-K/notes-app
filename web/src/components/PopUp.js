'use client'
import { useState, useEffect } from 'react';
import styles from "./popup.module.sass";

export default function PopUp({ children }) {
    const [show, setShow] = useState(true)

    // On componentDidMount set the timer
    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShow(false)
        }, 1500)

        return () => {
            clearTimeout(timeId)
        }
    }, []);

    // If show is false the component will return null and stop here
    if (!show) {
        return null;
    }

    return (
        <div className={styles.feedback}>
            <div>
                <p>{children}</p>
                <span className="material-symbols-rounded">
                    check
                </span>
            </div>
        </div>
    )
}