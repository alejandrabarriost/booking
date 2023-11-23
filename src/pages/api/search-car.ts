// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@booking/supabase/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const queryParams = req.query;

  const searchString = queryParams.term;

  const searchPromises = [
    supabase.from("cars").select("*").textSearch("model", `'${searchString}'`),
    supabase.from("cars").select("*").textSearch("brand", `'${searchString}'`),
  ];

  const [modelResult, brandResult] = await Promise.all(searchPromises);

  if (modelResult.error || brandResult.error) {
    return res.status(500).json({
      error: modelResult.error || brandResult.error,
    });
  }

  const resultsMerged = modelResult?.data.concat(brandResult.data);

  //remove duplicates from resultsMerged
  const resultsMergedFiltered = resultsMerged.filter(
    (car, index, self) => index === self.findIndex((c) => c.id === car.id),
  );

  res.status(200).json(resultsMergedFiltered);
}
