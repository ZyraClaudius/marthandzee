import { NextApiHandler } from "next";
import { withSessionRoute } from "../../lib/withSession";
import mysql from "mysql2/promise";

const handler: NextApiHandler = async (req, res) => {
  const user = req.query.user;
  const connection = await mysql.createConnection(process.env.DATABASE_URL as string)
  let result
  switch (req.method) {
    case "GET":
      result = await connection.execute(
        `SELECT * FROM Users;`
      );
      console.log("Result")
      console.log(result);

      connection.end();

      result = (result[0] as any).map(mapInvitee)
      console.log(result)

      res.status(200).send(JSON.stringify(result));
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
