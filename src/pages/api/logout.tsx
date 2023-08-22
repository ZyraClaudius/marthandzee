import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(logout);

async function logout(req: NextApiRequest, res: NextApiResponse) {
    req.session.destroy();
    res.send({ok: true})
}