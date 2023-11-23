import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { CarFormSchema } from "@booking/components/CreateCarForm";
import { supabase } from "@booking/supabase/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const body = JSON.parse(req.body) as z.infer<typeof CarFormSchema>;

  const { error } = await supabase.from("cars").insert(body);

  if (error) {
    return res.status(500).json({ error });
  }

  res.status(201).end();
}
