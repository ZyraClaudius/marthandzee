import Link from "next/link";
import styles from './User.module.css';

type Props = {
  user: string;
};
export default function User({ user }: Props) {
  return (
    <div className={styles.user}>
      <p>Signed in as {user}</p>
      <button onClick={resetUser}>
        Logout
      </button>
    </div>
  );
}

const resetUser = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api/logout", options);
    if (response.status !== 200) {
      throw new Error("Can't logout");
    }
    window.location.pathname = 'login'
  };
