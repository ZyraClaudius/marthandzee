import { NextApiHandler } from "next";
import mysql from "mysql2/promise";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      console.log("Called updateEventInvites");
      const { oldInvitees, newInvitees } = req.body;
      const toInvite = [];
      const toUninvite = [];
      for (let i = 0; i < oldInvitees.length; i++) {
        const currentNewInvitee = newInvitees[i];
        const currentOldInvitee = oldInvitees[i];
        if (currentNewInvitee.checked && !currentOldInvitee.checked) {
          toInvite.push(currentNewInvitee);
        }
        if (!currentNewInvitee.checked && currentOldInvitee.checked) {
          toUninvite.push(currentNewInvitee);
        }
      }
      const connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      if (toUninvite.length !== 0) {
        const userIds =
          toUninvite
            .slice(1)
            .reduce(
              (total, current) => total + ` OR user_id='${current.id}'`,
              `(user_id='${toUninvite[0].id}'`
            ) + ")";
        const result = await connection.execute(
          `DELETE FROM Event_User WHERE ${userIds} AND event_id=${req.query.event_id}`
        );
        console.log(result);
      }
      if (toInvite.length !== 0) {
        const values = toInvite
          .slice(1)
          .reduce(
            (total, current) =>
              total + `, (${req.query.event_id}, ${current.id})`,
            `(${req.query.event_id}, ${toInvite[0].id})`
          );
        const result = connection.execute(
          `INSERT INTO Event_User (event_id, user_id) VALUES ${values}`
        );
      }
      connection.end();
      res.status(200).send(JSON.stringify("Event_User updated"));
      break;
  }
};

export default handler;
