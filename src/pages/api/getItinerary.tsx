import { NextApiHandler } from "next";
import mysql from "mysql2/promise";
import { getItineraryResult } from "~/types/getItineraryResult";

const handler: NextApiHandler = async (req, res) => {
  const user = req.query.user;
  const connection = await mysql.createConnection(
    process.env.DATABASE_URL as string
  );
  let result;
  switch (req.method) {
    case "GET":
      result = await connection.execute(
        `SELECT Events.* FROM ((Users INNER JOIN Event_User ON Users.id=Event_User.user_id) INNER JOIN Events ON Event_User.event_id=Events.id) WHERE Users.name='${user}';`
      );
      const events = result[0] as any;
      events.map((event: any) => ({... event, time: new Date(event.time)}))
      events.sort((a: any, b: any) => (a.time > b.time ? 1 : -1));
      res.status(200).send(JSON.stringify(events));
      break;
  }
};

export default handler;
