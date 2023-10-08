import { FormEvent, useRef } from "react"
import styles from './InviteSomeone.module.css';

interface Props {
    refresh: ()=>void
}

export default function InviteSomeone({refresh}: Props) {
    const nameRef = useRef<HTMLInputElement>(null)
    async function invite(event: FormEvent<HTMLFormElement>) {
        if(!nameRef.current) {
            return
        }
        const name = nameRef.current.value
        try {
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: name}),
            };
            const response = await fetch("/api/invite", options);
            if (response.status !== 200) {
              throw new Error("Didn't work");
            }
            refresh()
          } catch (err) {
            console.log(err);
          }
    }
return (
    <div className={styles.inviteSomeone}>
        <p>Below you can add people to the guestlist</p>
        <form onSubmit={invite}>
            <input id="name" type="text" ref={nameRef}/>
            <button type="submit">Add</button>
        </form>
    </div>
)
}