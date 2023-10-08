import { useState } from "react";
import { WeddingEvent } from "~/types/event";

type Props = {
  event: WeddingEvent;
};

export default function EventInfo({ event }: Props) {
  const [showingNotes, setShowingNotes] = useState(false);
  return (
    <li key={event.id}>
      {event.name}
      <button onClick={() => setShowingNotes(!showingNotes)}>
        {showingNotes ? "▼" : "▲"}
      </button>
      {showingNotes ? <p>{event.notes}</p> : undefined}
    </li>
  );
}
