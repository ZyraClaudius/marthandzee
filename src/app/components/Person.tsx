import { useState } from "react";
import EventInfo from "./EventInfo";
import styles from './Person.module.css';

type Props = {
  person: any;
};

export default function Person({ person }: Props) {
  const [showingEvents, setShowingEvents] = useState(false);
  return (
    <li key={person.id} className={styles.person}>
      {person.name}
      {person.events.length > 0 ? (
        <button onClick={() => setShowingEvents(!showingEvents)}>
          {showingEvents ? "▼" : "▲"}
        </button>
      ) : null}
      {showingEvents ? (
        <ul>
          {person.events.map((event: any) => (
            <EventInfo key={event.id} event={event} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
