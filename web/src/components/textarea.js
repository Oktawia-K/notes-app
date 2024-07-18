import styles from "./textarea.module.sass";
import Markdown from 'react-markdown'

export default function Textarea() {
    return (
        <div className={styles.textarea}>
            <div>
                <h1>Name of the note</h1>
                <span className="material-symbols-outlined">
                    close
                </span>
            </div>

            <Markdown>Text would normally go here, but there is none at the moment. This is a *test*. **Please** work, I _beg_ of you.</Markdown>
        </div>
    )
}