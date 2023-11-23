import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@booking/supabase/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const body = JSON.parse(req.body);

  await supabase.from("cars").delete().eq("id", body.car_id);

  res.status(200).end();
}
