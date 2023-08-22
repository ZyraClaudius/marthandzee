import { withSessionRoute } from "../../lib/withSession";
import mysql from 'mysql2/promise';

export default withSessionRoute(async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body;
      const connection = await mysql.createConnection(process.env.DATABASE_URL as string);
      
      let result = await connection.execute(`SELECT name FROM Users WHERE emailAddress='${email}' AND passwordHash='${password}'`)

      connection.end();
      
      const loggedInUser = (result[0] as any)[0].name
      
      if(!loggedInUser) {
        res.status(404).send("Can't find the user");
        break;
      }

      req.session.user = loggedInUser;
      await req.session.save();

      res.status(200).send("Found the user");
      break;
    default:
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }
});