import styles from "./nonote.module.sass";

export default function NoNote() {
    return (
        <div className={styles.nonote}>
            <h1>Nie wybrano notatki</h1>
            <h3>Wybierz plik z paska bocznego</h3>
        </div>
    );
}