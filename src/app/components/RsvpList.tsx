import { withSessionSsr } from "~/lib/withSession";
import styles from "./RsvpList.module.css";
import Link from "next/link";
import Person from "./Person";

interface Props {
  people: Array<{
    id: number;
    name: string;
    rsvp: boolean;
    events: Array<any>;
  }>;
  confirmed: boolean;
}

export default function RsvpList({ people, confirmed }: Props) {
  const classes = `${styles.RsvpList} ${
    confirmed ? styles.RsvpListConfirmed : styles.RsvpListUnconfirmed
  }`;
  return (
    <ul className={classes}>
      {people.map((person) => (<Person key={person.id} person={person} />))}
    </ul>
  );
}
