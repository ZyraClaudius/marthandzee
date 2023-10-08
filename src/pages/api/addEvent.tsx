import { NextApiHandler } from "next";
import mysql from "mysql2/promise";

const handler: NextApiHandler = async (req, res) => {
  const connection = await mysql.createConnection(
    process.env.DATABASE_URL as string
  );
  switch (req.method) {
    case "POST":
      const time = `2024-07-06 ${req.body.time}:00`
      const query = `INSERT INTO Events (name, time${req.body.notes ? ', notes' : ''}) VALUES ('${req.body.name}', '${time}'${req.body.notes ? `, '${req.body.notes}'` : ""});`
      console.log(query)
      let result = await connection.execute(query);
      let id = (result[0] as any).insertId
      result = await connection.execute(`INSERT INTO Event_User (user_id, event_id) VALUES (1, ${id}), (3, ${id})`)
      connection.end()
      res.status(200).send(JSON.stringify(result))
      break;
  }
};

export default handler;
