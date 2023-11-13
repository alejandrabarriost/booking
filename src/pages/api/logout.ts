import { sessionOptions } from "@booking/config/session";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute((req, res) => {
  req.session.destroy();
  res.status(200).end();
}, sessionOptions);
