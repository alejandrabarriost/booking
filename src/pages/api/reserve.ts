// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "@booking/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = JSON.parse(req.body);

  await supabase.from("booking").insert([
    {
      start_date: body.start_date,
      end_date: body.end_date,
      car_id: body.car_id,
      total_cost: body.total_cost,
    },
  ]);

  const response = await supabase.from("booking").select("*");

  res.status(200).json(response.data);
}
