import { withIronSessionSsr } from "iron-session/next";

import { sessionOptions } from "./session";

export const withSession = () => {
  return withIronSessionSsr(async ({ req }) => {
    const session = req.session;

    return {
      props: {
        session,
      },
    };
  }, sessionOptions);
};
