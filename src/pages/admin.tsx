import Link from "next/link";
import { withSessionSsr } from "../lib/withSession";
import NavBar from "~/app/components/NavBar";
import "./globals.css";
import { useEffect, useState } from "react";
import InviteeInfo from "~/app/components/InviteeInfo";
import InviteSomeone from "~/app/components/InviteSomeone";
import User from "~/app/components/User";
import Itinerary from "~/app/components/Itinerary";
import { WeddingGuest } from "~/types/weddingGuest";
import { WeddingEvent } from "~/types/event";

interface Props {
  user: string;
  admin: boolean;
}

export default function Admin({ user, admin }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [invitees, setInvitees] = useState(
    [] as Array<{
      id: number;
      name: string;
      rsvp: boolean;
      events: Array<WeddingEvent>;
    }>
  );
  useEffect(() => {
    fetchInvitees();
  }, []);

  async function fetchInvitees() {
    setLoaded(false);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`/api/getInvitees`, options);
    const responseData = await response.json();
    console.log(responseData);
    setInvitees(responseData);
    setLoaded(true);
  }

  return (
    <div>
      <NavBar admin={admin} />
      <main>
        <User user={user} />
        <div className="page">
          {loaded ? (
            <InviteeInfo invitees={invitees} refresh={fetchInvitees} />
          ) : (
            <p>Please wait while invitee information is retreived</p>
          )}
          <InviteSomeone refresh={fetchInvitees} />
          <Itinerary
            user={user}
            admin={true}
            invitees={invitees}
            refreshRsvp={fetchInvitees}
          />
        </div>
      </main>
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
