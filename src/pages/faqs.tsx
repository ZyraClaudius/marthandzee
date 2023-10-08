import Faqs from "~/app/components/Faqs";
import "./globals.css";
import { withSessionSsr } from "../lib/withSession";
import NavBar from "~/app/components/NavBar";
interface Props {
  user: string;
  admin: boolean;
}

export default function RSVP({ user, admin }: Props) {
  return (
    <div>
      <NavBar admin={admin} />
      <Faqs />
    </div>
  );
}

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
