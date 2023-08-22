import Link from "next/link";
import { withSessionSsr } from "../lib/withSession";
import NavBar from "~/app/components/NavBar";
import "./globals.css";

interface Props {
  user: string;
  admin: boolean;
}

export default function Home({ user, admin }: Props) {
  return (
    <div>
      <NavBar admin={admin} />
      <div className="page">
        <div className="name">
          Signed in as {user}
          {admin ? " in admin mode" : ""}
        </div>
        <button onClick={resetUser}>
          <Link href={"/login"}>Logout</Link>
        </button>
      </div>
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
    throw new Error("Can't login");
  }
};

export const getServerSideProps = withSessionSsr(
  async function getServersideProps({ req, res }) {
    try {
      const user = req.session.user || "";
      console.log(user);
      const admin = req.session.admin || false;
      if (user === "") {
        throw new Error("No user logged in");
      }
      return {
        props: {
          user: user,
          admin: admin,
        },
      };
    } catch (err) {
      console.log("page Home error", err);

      return {
        redirect: {
          destination: "/login",
          statusCode: 307,
        },
      };
    }
  }
);
