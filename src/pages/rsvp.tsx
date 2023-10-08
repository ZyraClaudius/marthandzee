import Link from "next/link";
import { withSessionSsr } from "../lib/withSession";
import NavBar from "~/app/components/NavBar";
import "./globals.css";
import { useEffect, useState } from "react";
import userRsvpStatus from "./api/userRsvpStatus";

interface Props {
  user: string;
  admin: boolean;
}

export default function RSVP({ user, admin }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [rsvp, setRsvp] = useState(false);
  useEffect(() => {
    fetchRsvp();
  }, [user]);

  async function fetchRsvp() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`/api/userRsvpStatus?user=${user}`, options);
    const responseData = await response.json();
    console.log(responseData);
    setRsvp(responseData);
    setLoaded(true);
  }

  async function Rsvp(status: boolean) {
    setLoaded(false);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    };
    const response = await fetch(`/api/userRsvpStatus?user=${user}`, options);
    const responseData = await response.json();
    console.log(responseData);
    fetchRsvp();
  }

  const rsvpStatus = rsvp ? (
    <div>
      <p>{user}, you have RSVP&apos;d</p>
      <button
        onClick={() => {
          Rsvp(false);
        }}
      >
        Click here to cancel
      </button>
      <p>Please note the above button will set your status to NOT attending</p>
    </div>
  ) : (
    <div>
      <p>{user}, you haven&apos;t RSVP&apos;d</p>
      <button
        onClick={() => {
          Rsvp(true);
        }}
      >
        Click here to RSVP
      </button>
      <p>Please note, the above button will set your status to attending</p>
    </div>
  );

  return (
    <div>
      <NavBar admin={admin} />
      {loaded ? (
        rsvpStatus
      ) : (
        <div>
          <p>Please wait while we check your RSVP status</p>
        </div>
      )}
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
