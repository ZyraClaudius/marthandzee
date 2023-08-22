import RsvpList from "./RsvpList";
import styles from "./InviteeInfo.module.css";
import { useEffect, useState } from "react";

interface Props {
  invitees: Array<{ id: number; name: string; rsvp: boolean }>;
  refresh: () => void;
}

type invitee = {
  id: number;
  name: string;
  rsvp: boolean;
};

export default function InviteeInfo({ invitees, refresh }: Props) {
  const [confirmed, setConfirmed] = useState([] as Array<invitee>);
  const [unconfirmed, setUnconfirmed] = useState([] as Array<invitee>);

  useEffect(() => {
    updateConfirmed(invitees);
    updateUnconfirmed(invitees);
  }, [invitees]);

  const updateConfirmed = (invitees: Array<invitee>) => {
    setConfirmed(invitees.filter((invitee) => invitee.rsvp));
  };

  const updateUnconfirmed = (invitees: Array<invitee>) => {
    setUnconfirmed(invitees.filter((invitee) => !invitee.rsvp));
  };

  if (invitees.length === 0) {
    return (
      <p>
        No one&apos;s invited?! That doesn&apos;t seem right, add some invitees
        below
      </p>
    );
  }

  const jsxArray = [
    <p key="inviteeCount">There are {invitees.length} people invited</p>,
  ];
  if (confirmed.length > 0) {
    jsxArray.push(
      <div key="confirmed">
        <p>The following {confirmed.length} people have RSVP&apos;d:</p>
        <RsvpList names={confirmed.map((invitee) => invitee.name)} confirmed />
      </div>
    );
  }
  if (unconfirmed.length > 0) {
    jsxArray.push(
      <div key="unconfirmed">
        <p>The following {unconfirmed.length} people have not RSVP&apos;d:</p>
        <RsvpList
          names={unconfirmed.map((invitee) => invitee.name)}
          confirmed={false}
        />
      </div>
    );
  }

  return invitees.length > 0 ? (
    <div className={styles.InviteeInfo}>
      {jsxArray}
      <button onClick={refresh}>Refresh</button>
      </div>
  ) : (
    <p>
      No one&apos;s invited?! That doesn&apos;t seem right, add some invitees
      below
    </p>
  );
}
