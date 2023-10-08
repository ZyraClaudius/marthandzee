import { NextApiHandler } from "next";
import mysql from "mysql2/promise";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let result = await connection.execute(
      `DELETE FROM Events WHERE id=${req.body.id};`
    );
    result = await connection.execute(
      `DELETE FROM Event_User WHERE event_id=${req.body.id}`
    );
    res.status(200).send(result);
  }
};

export default handler;
