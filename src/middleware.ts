import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "@booking/config/session";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const session = await getIronSession(req, res, sessionOptions);

  const { user } = session;

  if (!user) {
    await session.destroy();
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return res;
}

export const config = {
  matcher: "/dashboard/:path*",
};
