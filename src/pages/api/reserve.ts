// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sessionOptions } from "@booking/config/session";
import { supabase } from "@booking/supabase/client";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const body = JSON.parse(req.body);

  await supabase.from("booking").insert([
    {
      start_date: body.start_date,
      end_date: body.end_date,
      car_id: body.car_id,
      total_cost: body.total_cost,
      user_id: body.user_id,
    },
  ]);

  res.status(201).end();
}

export default withIronSessionApiRoute(handler, sessionOptions);
