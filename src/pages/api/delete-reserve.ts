import { supabase } from "@booking/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = JSON.parse(req.body);

  await supabase.from("booking").delete().eq("id", body.id);

  const response = await supabase.from("booking").select("*");

  res.status(200).json(response.data);
}
