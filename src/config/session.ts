import { IronSessionOptions } from "iron-session";
import { withIronSessionSsr } from "iron-session/next";

export const sessionOptions: IronSessionOptions = {
  cookieName: "booking-system",
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  ttl: 60 * 60 * 8,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};

export type Session = {
  user: {
    username: string;
    role: string;
    id: string;
  };
};
