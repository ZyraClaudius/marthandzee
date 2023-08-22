import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";
import { screenInput } from "~/lib/screenInput";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { name } = req.body;
      screenInput(name)
      const connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      const result = await connection.execute(`INSERT INTO Users
      (name) VALUES ('${name}');`);
      console.log(result)
      connection.end()
      res.status(200).send(JSON.stringify(result))
      break;
  }
}
