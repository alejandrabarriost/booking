import { supabase } from "@booking/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "argon2";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@booking/config/session";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const body = JSON.parse(req.body);

  try {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("username", body.username);

    if (error) {
      throw new Error(error.message);
    }

    if (data?.length === 0) {
      throw new Error("User not found");
    }

    console.log(data);

    await verify(data[0].password, body.password);

    req.session.user = {
      username: body.username,
      role: data[0].role,
      id: data[0].id,
    };

    await req.session.save();

    res.status(200).end();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
