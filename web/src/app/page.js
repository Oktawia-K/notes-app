import styles from "./page.module.sass";
import Bar from "../components/bar";
import Textarea from "../components/textarea";
import { getNote, updateNote } from '@/actions/action';

export default async function Home() {
    const note = await getNote("671f6b99df48fcc376272949");
    console.log(note);
    console.log(JSON.stringify(note._id).split('\"')[1]);

    /*
    const handleNoteSave = (title, text) => {
        updateNote(note._id, title, text);
    }
    */

    return (
        <div className={styles.main}>
            <Bar />
            <div className={styles.notes}>
                <Textarea initialText={[note.title, note.text]} noteID={JSON.stringify(note._id).split('\"')[1]} />
            </div>

        </div>
    )
}