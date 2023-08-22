import { NextApiHandler } from "next";
import { withSessionRoute } from "../../lib/withSession";
import mysql from "mysql2/promise";
import { screenInput } from "~/lib/screenInput";

const handler: NextApiHandler = async (req, res) => {
  const user = req.query.user as string;
  screenInput(user)
  const connection = await mysql.createConnection(process.env.DATABASE_URL as string)
  let result
  switch (req.method) {
    case "GET":
      result = await connection.execute(
        `SELECT rsvp FROM Users WHERE name='${user}'`
      );
      console.log(result);

      connection.end();

      if ((result[0] as any).length === 0) {
        res.status(404).send("Can't find the user");
      }

      res.status(200).send((result[0] as any)[0].rsvp === 1);
      break;
    case "POST":
      result = await connection.execute(
        `UPDATE Users
        SET rsvp = ${req.body.status}
        WHERE name='${user}'`
      )
      console.log(result)
      connection.end()
      res.status(200).send(JSON.stringify("RSVP status changed"))
      break;
  }
};

export default handler;
