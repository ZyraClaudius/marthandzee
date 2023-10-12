import Link from "next/link";
import { withSessionSsr } from "../lib/withSession";
import NavBar from "~/app/components/NavBar";
import "./globals.css";
import BigPic from "~/app/components/BigPic";
import Invite from "~/app/components/Invite";
import User from "~/app/components/User";
import Itinerary from "~/app/components/Itinerary";

interface Props {
  user: string;
  admin: boolean;
}

export default function Home({ user, admin }: Props) {
  return (
    <div>
      <NavBar admin={admin} />
      <div className="page">
        <BigPic />
        <main>
          <Invite admin={admin} />
          <User user={user} />
          <Itinerary user={user} admin={false} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Location</h2>
            <p>The address is: Nanspean Farm, Helston, TR12 7PX</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1292016.1914786275!2d-5.2241301150245!3d50.76687667213397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486ad8041726388f%3A0xf521ff6e9953e274!2sHelston%20TR12%207PX!5e0!3m2!1sen!2suk!4v1696792258045!5m2!1sen!2suk"
              width="600"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{maxWidth: '90vw'}}
            ></iframe>
          </div>
        </main>
      </div>
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
