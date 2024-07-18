import styles from "./page.module.sass";
import Bar from "../components/bar";
import Textarea from "../components/textarea";

export default function Home() {
    return (
        <div className={styles.main}>
            <Bar />
            <div className={styles.notes}>
                <Textarea />
            </div>

        </div>
    )
}