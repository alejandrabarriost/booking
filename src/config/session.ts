import type { IronSessionOptions } from "iron-session";

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
    role: "admin" | "customer";
    id: string;
  };
};
