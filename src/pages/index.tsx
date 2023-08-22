import Link from "next/link";
import { withSessionSsr } from "../lib/withSession";

interface Props {
  user: string;
}

export default function Home({ user }: Props) {
  return (
    <div>
      <div className="name">I&apos;m {user}</div>
      <button onClick={resetUser}><Link href={"/login"}>Logout</Link></button>
    </div>
  )
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
    throw new Error("Can't login");
  }
}

export const getServerSideProps = withSessionSsr(
  async function getServersideProps({ req, res }) {
    try {
      const user = req.session.user || "";
      if (user === "") {
        throw new Error("No user logged in")
      }
      return {
        props: {
          user: user
        }
      }
    }
    catch(err) {
      console.log("page Home error", err);

      return {
        redirect: {
          destination: '/login',
          statusCode: 307
        }
      }
    }
  }
)
