import styles from "./page.module.sass";

export default function Home() {
    return (
        <div className={styles.main}>
            <h1>Welcome to my app!</h1>
            <p className={styles.text}>Hope you stay a while :)</p>
        </div>
    )
}