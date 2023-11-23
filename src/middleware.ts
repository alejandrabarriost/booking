import { NextResponse, type NextRequest } from "next/server";
import { sessionOptions } from "@booking/config/session";
import { getIronSession } from "iron-session/edge";

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
