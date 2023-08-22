import { withSessionRoute } from "../../lib/withSession";

const mockUsers = [
  {
    user: "Admin User",
    email: "admin@gmail.com",
  },
  {
    user: "Just User",
    email: "justuser@gmail.com",
  },
];

export default withSessionRoute(async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { email } = req.body;
      const loggedInUser = mockUsers.find((user) => user.email === email);

      if (!loggedInUser) {
        res.status(404).send("Can't find the user");
        break;
      }

      req.session.user = loggedInUser.user;
      await req.session.save();

      res.status(200).send("Found the user");
      break;
    default:
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }
});
