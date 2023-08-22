import Link from "next/link";
import { withSessionSsr } from "../lib/withSession";

interface Props {
  user: string;
}

export default function Home({ user }: Props) {
  return (
    <div>
      <div className="name">I&apos;m {user || "Guest User"}</div>
      <button><Link href={"/login"}>Go To Login</Link></button>
    </div>
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServersideProps({ req, res }) {
    try {
      const user = req.session.user || "";
      
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
