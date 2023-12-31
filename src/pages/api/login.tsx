import { screenInput } from "~/lib/screenInput";
import { withSessionRoute } from "../../lib/withSession";
import mysql from 'mysql2/promise';

export default withSessionRoute(async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { name, password } = req.body
      let admin = false
      let auth = false
      if (password.toUpperCase() === process.env.ADMIN_PASSWORD?.toUpperCase() ) {
        admin = true
        auth = true
      } else if (password.toUpperCase() === process.env.USER_PASSWORD?.toUpperCase()) {
        auth = true
      } else {
        res.status(500).send(`Something went wrong. Incorrect password`)
      }
      screenInput(name)

      const connection = await mysql.createConnection(process.env.DATABASE_URL as string)
      
      let result = await connection.execute(`SELECT name FROM Users WHERE name='${name}'`)
      console.log(result)

      connection.end()

      if((result[0] as any).length === 0) {
        throw new Error('Name not recognised')
      }

      const loggedInUser = (result[0] as any)[0].name

      console.log(loggedInUser, admin)
      
      if(!loggedInUser) {
        res.status(404).send("Can't find the user")
        break
      }

      req.session.user = loggedInUser
      req.session.admin = admin
      await req.session.save()

      res.status(200).send("Found the user")
      break
    default:
      res.status(405).end(`${req.method} Not Allowed`)
      break;
  }
});