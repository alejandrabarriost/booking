import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@booking/supabase/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const body = JSON.parse(req.body);

  await supabase.from("booking").delete().eq("id", body.id);

  res.status(200).end();
}
