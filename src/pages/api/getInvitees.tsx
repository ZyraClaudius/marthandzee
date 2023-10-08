import { NextApiHandler } from "next";
import { withSessionRoute } from "../../lib/withSession";
import mysql from "mysql2/promise";

const handler: NextApiHandler = async (req, res) => {
  const connection = await mysql.createConnection(process.env.DATABASE_URL as string)
  switch (req.method) {
    case "GET":
      const usersResult = (await connection.execute('SELECT * FROM Users;') as any)[0]
      let usersEventsResult = await connection.execute(
        `SELECT Users.*, Events.id AS eventId, Events.name AS eventName, Events.notes FROM ((Users INNER JOIN Event_User ON Users.id=Event_User.user_id) INNER JOIN Events ON Event_User.event_id=Events.id);`
      ) as any
      console.log("Result")
      console.log(usersEventsResult);

      connection.end();

      usersEventsResult = (usersEventsResult[0] as any).map(mapInvitee)
      console.log()
      const mappedResult: any = []
      for (let userEvent of usersEventsResult) {
        const index = mappedResult.findIndex((value: any) => value.id === userEvent.id)
        if (index > -1) {
          mappedResult[index].events.push({
            id: userEvent.eventId,
            name: userEvent.eventName,
            notes: userEvent.notes
          })
        } else {
          mappedResult.push({
            id: userEvent.id,
            name: userEvent.name,
            rsvp: userEvent.rsvp,
            events: [{
              id: userEvent.eventId,
              name: userEvent.eventName,
              notes: userEvent.notes
            }]
          })
        }
      }
      for (let user of usersResult) {
        const index = mappedResult.findIndex((value: any) => value.name === user.name)
        if (index < 0) {
          mappedResult.push({
            id: user.id,
            name: user.name,
            rsvp: user.rsvp,
            events: []
          })
        } 
      }
      console.log(mappedResult)
      res.status(200).send(JSON.stringify(mappedResult));
      break;
  }
};

const mapInvitee = (invitee: {id: number, name: string, rsvp: 0 | 1}) => {
  return {
    ...invitee,
    rsvp: invitee.rsvp === 1
  }
}

export default handler;
