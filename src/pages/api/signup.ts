import { supabase } from "@booking/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "argon2";
import { sessionOptions } from "@booking/config/session";
import { withIronSessionApiRoute } from "iron-session/next";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const body = JSON.parse(req.body);

  try {
    // check if user exists
    const { data: users, error: userError } = await supabase
      .from("user")
      .select("*")
      .eq("username", body.username);

    if (userError) {
      throw new Error(userError.message);
    }

    if (users?.length > 0) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(body.password);

    const { error, data } = await supabase
      .from("user")
      .insert([
        {
          username: body.username,
          password: hashedPassword,
          role: "customer",
        },
      ])
      .select("*");

    if (error) {
      throw new Error(error.message);
    } else {
      req.session.user = {
        username: body.username,
        role: data[0].role,
        id: data[0].id,
      };

      await req.session.save();

      res.status(201).end();
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
