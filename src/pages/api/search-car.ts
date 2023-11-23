// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@booking/supabase/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const queryParams = req.query;

  const searchString = queryParams.term;

  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .textSearch(
      "model, year, category, displacement, brand",
      `'${searchString}'`,
      { config: "english" },
    );

  if (error) {
    return res.status(500).json({ error });
  }

  res.status(200).json(data);
}
