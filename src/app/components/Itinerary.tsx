import { useEffect, useState } from "react";
import { getItineraryResult } from "~/types/getItineraryResult";
import EventCard from "./EventCard";
import styles from "./Itinerary.module.css";
import { WeddingGuest } from "~/types/weddingGuest";

type Props = {
  user: string;
  admin: boolean;
  invitees?: Array<WeddingGuest>;
  refreshRsvp?: Function;
};
export default function Itinerary({ user, admin, invitees, refreshRsvp }: Props) {
  const [itinerary, setItinerary] = useState([] as any[]);
  const [loaded, setLoaded] = useState(false);
  async function fetchItinerary() {
    setLoaded(false);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`/api/getItinerary?user=${user}`, options);
    const responseData = await response.json();
    setItinerary(
      responseData.map((event: any) => ({
        ...event,
        time: new Date(event.time),
      }))
    );
    setLoaded(true);
  }
  async function refresh() {
    await fetchItinerary();
    refreshRsvp && await refreshRsvp();
  }
  useEffect(() => {
    fetchItinerary();
  }, [user]);

  return (
    <div className={styles.itinerary}>
      <h2>Itinerary</h2>
      <div className={styles.itineraryList}>
        {itinerary.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            admin={admin}
            refresh={refresh}
            invitees={invitees}
          />
        ))}
        {admin ? (
          <EventCard
            event={{
              id: 0,
              name: "Event Name",
              time: new Date("2024-06-07 23:59:59"),
              notes: undefined,
            }}
            admin={true}
            refresh={refresh}
          />
        ) : null}
      </div>
    </div>
  );
}
