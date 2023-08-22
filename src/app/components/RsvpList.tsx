import { withSessionSsr } from "~/lib/withSession";
import styles from "./RsvpList.module.css";
import Link from "next/link";

interface Props {
  names: Array<string>;
  confirmed:boolean
}

export default function RsvpList({ names, confirmed }: Props) {
    const classes = `${styles.RsvpList} ${confirmed ? styles.RsvpListConfirmed : styles.RsvpListUnconfirmed}`
  return (
    <ul className={classes}>
        {names.map(name => <li key={name}>{name}</li>)}
    </ul>
  );
}
