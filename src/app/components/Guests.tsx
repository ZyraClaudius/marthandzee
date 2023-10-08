import { WeddingEvent } from "~/types/event";
import styles from "./Guests.module.css";
import { WeddingGuest } from "~/types/weddingGuest";
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
type Props = {
  event: WeddingEvent;
  invitees?: Array<WeddingGuest>;
  refresh: Function;
};

export default function Guests({ event, invitees, refresh }: Props) {
  const editableInvitees = invitees?.filter((invitee) => invitee.id > 3);

  const alreadyInvited = editableInvitees?.map((invitee) => ({
    id: invitee.id,
    name: invitee.name,
    checked: invitee.events.filter((inviteeEvent) => inviteeEvent.id === event.id).length > 0,
  }));

  const [inviteesChecked, setInviteesChecked] = useState(JSON.parse(JSON.stringify(alreadyInvited)) ?? []);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    console.log("running");
    for (let invitee of inviteesChecked) {
      if (!invitee.checked) {
        setAllChecked(false);
        return;
      }
    }
    setAllChecked(true);
  }, [inviteesChecked]);

  const updateChecked = (source: string, index: number) => {
    console.log(console.log(source));
    const copyInviteesChecked = JSON.parse(JSON.stringify(inviteesChecked));
    copyInviteesChecked[index].checked = !copyInviteesChecked[index].checked;
    setInviteesChecked(copyInviteesChecked);
    console.log(inviteesChecked);
  };

  const changeAll = () => {
    const targetValue = !allChecked;
    const copyInviteesChecked = JSON.parse(JSON.stringify(inviteesChecked));
    for (let invitee of copyInviteesChecked) {
      invitee.checked = targetValue;
    }
    setInviteesChecked(copyInviteesChecked);
  };

  const isChecked = (index: number) => {
    // console.log(inviteesChecked[index].name,"is",inviteesChecked[index].checked ? "checked" : "not checked")
    return inviteesChecked[index].checked;
  };

  const saveChanges = async (formEvent: any) => {
    formEvent.preventDefault()
    console.log(inviteesChecked)
    if (JSON.stringify(inviteesChecked) !== JSON.stringify(alreadyInvited)) {
      console.log("Diff")
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({newInvitees: inviteesChecked, oldInvitees: alreadyInvited}),
        };
        const response = await fetch(`/api/updateEventInvites?event_id=${event.id}`, options);
        if (response.status !== 200) {
          throw new Error("Didn't work");
        }
      } catch (err) {
        console.log(err);
      }
    }
    refresh();
  };

  return (
    <div className={styles.guests}>
      <div className={styles.overlay}>
        <h2>Guests for {event.name}</h2>
        <div className={styles.row}>
          <div className={styles.clickableArea} onClick={changeAll}>
            <input
              type="checkbox"
              id="all"
              checked={allChecked}
              onChange={() => {}}
            />
            <span className={styles.checkbox}>
              <span className={styles.check}></span>
            </span>
            <label htmlFor="all">Select All</label>
          </div>
        </div>
        {editableInvitees?.map((invitee: WeddingGuest, index: number) => (
          <div key={invitee.id} className={styles.row}>
            <div
              className={styles.clickableArea}
              onClick={() => updateChecked("clickableArea", index)}
            >
              <input
                type="checkbox"
                id={invitee.id.toString()}
                checked={isChecked(index)}
                onChange={() => updateChecked("input", index)}
                onClick={(event) => event.stopPropagation()}
              />
              <span className={styles.checkbox}>
                <span className={styles.check}></span>
              </span>
              <label
                htmlFor={invitee.id.toString()}
                onClick={(event) => event.stopPropagation()}
              >
                {invitee.name}
              </label>
            </div>
          </div>
        ))}
        <button onClick={saveChanges}>Save Changes</button>
      </div>
    </div>
  );
}
