import { useRef, useState } from "react";
import styles from "./EventCard.module.css";
import formatSqlInput from "~/lib/formatSqlInput";
import Guests from "./Guests";
import { WeddingGuest } from "~/types/weddingGuest";
import { WeddingEvent } from "~/types/event";

type Props = {
  event: WeddingEvent;
  admin: boolean;
  refresh: Function;
  invitees?: Array<WeddingGuest>;
};

export default function EventCard({ event, admin, refresh, invitees }: Props) {
  console.log(invitees);
  const eventNameRef = useRef<HTMLInputElement>(null);
  const eventTimeRef = useRef<HTMLInputElement>(null);
  const eventNotesRef = useRef<HTMLTextAreaElement>(null);
  const [editMode, setEditMode] = useState(event.id === 0);
  const [showingGuests, setShowingGuests] = useState(false);
  function toggleEditMode() {
    setEditMode(!editMode);
  }
  async function saveChanges(formEvent: any) {
    formEvent.preventDefault();
    if (!eventNameRef.current || !eventTimeRef.current) {
      return;
    }
    const eventName = eventNameRef.current.value;
    const eventTime = eventTimeRef.current.value;
    const eventNotes = eventNotesRef.current?.value ?? "";
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: eventName,
          time: eventTime,
          notes: formatSqlInput(eventNotes),
          id: event.id,
        }),
      };
      const postUrl = event.id === 0 ? "/api/addEvent" : "/api/updateEvent";
      const response = await fetch(postUrl, options);
      if (response.status !== 200) {
        throw new Error("Didn't work");
      }
    } catch (err) {
      console.log(err);
    }
    eventNameRef.current.value = "";
    eventTimeRef.current.value = "";
    if (eventNotesRef.current?.value) eventNotesRef.current.value = "";
    if (event.id !== 0) {
      toggleEditMode();
    }
    await refresh();
  }
  async function deleteEvent(formEvent: any) {
    formEvent.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: event.id,
        }),
      };
      const response = await fetch("/api/deleteEvent", options);
      if (response.status !== 200) {
        throw new Error("Didn't work");
      }
    } catch (err) {
      console.log(err);
    }
    await refresh();
  }
  function showGuests(formEvent: any) {
    formEvent.preventDefault();
    setShowingGuests(true);
  }
  function hideGuests() {
    setShowingGuests(false);
  }
  function formatTime(time: Date) {
    return time.toLocaleTimeString("en", {
      timeStyle: "short",
      hour12: true,
    });
  }

  if (editMode) {
    return (
      <form onSubmit={saveChanges} className={styles.eventCard}>
        {showingGuests && (
          <Guests
            event={event}
            invitees={invitees}
            refresh={async () => {
              hideGuests();
              toggleEditMode();
              await refresh();
            }}
          />
        )}
        <input defaultValue={event.name} ref={eventNameRef}></input>
        <input
          type="time"
          defaultValue={
            event.id !== 0 ? event.time.toTimeString().slice(0, 5) : ""
          }
          ref={eventTimeRef}
        ></input>
        <textarea
          defaultValue={event.notes ?? ""}
          ref={eventNotesRef}
        ></textarea>
        <div>
          <button type="submit">Save changes</button>
          {event.id !== 0 && <button onClick={deleteEvent}>Delete</button>}
          {event.id !== 0 && <button onClick={showGuests}>Guests</button>}
        </div>
      </form>
    );
  }
  return (
    <div className={styles.eventCard}>
      <h3>{event.name}</h3>
      <p>{formatTime(event.time)}</p>
      {event.notes ? <p>{event.notes}</p> : null}
      {admin ? <button onClick={toggleEditMode}>Edit</button> : null}
    </div>
  );
}
