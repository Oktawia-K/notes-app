import styles from "./bar.module.sass";
// import 'material-symbols';

export default function Bar() {
    return (
        <div className={styles.bar}>
            <span className="material-symbols-rounded">
                add
            </span>
            <span className="material-symbols-rounded">
                draft
            </span>
            <span className="material-symbols-rounded">
                folder
            </span>
            <span className="material-symbols-rounded">
                help
            </span>
        </div>
    )
}