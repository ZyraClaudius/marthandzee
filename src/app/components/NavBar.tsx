import { withSessionSsr } from "~/lib/withSession";
import styles from "./NavBar.module.css";
import Link from "next/link";

interface Props {
  admin: boolean;
}

export default function NavBar({ admin }: Props) {
  const links = [
    { text: "Home", href: "/" },
    {
      text: "FAQs",
      href: "/faqs",
    },
    {
      text: "Album",
      href: "/album",
    },
  ];
  if (admin) {
    links.push({
      text: "Admin",
      href: "/admin",
    });
  } else {
    links.push({
      text: "RSVP",
      href: "/rsvp",
    });
  }
  return (
    <div className={styles.NavBar}>
      <ul>
        {links.map((link) => (
          <li key={link.text}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
