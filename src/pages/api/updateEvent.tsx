import { NextApiHandler } from "next";
import mysql from "mysql2/promise";

const handler: NextApiHandler = async (req, res) => {
  const connection = await mysql.createConnection(
    process.env.DATABASE_URL as string
  );
  switch (req.method) {
    case "POST":
      const time = `2024-07-06 ${req.body.time}:00`
      const query = `UPDATE Events SET name='${req.body.name}', time='${time}'${req.body.notes ? `, notes='${req.body.notes}'` : ""} WHERE id='${req.body.id}';`
      console.log(query)
      const result = await connection.execute(query);
      connection.end()
      res.status(200).send(JSON.stringify(result))
      break;
  }
};

export default handler;
