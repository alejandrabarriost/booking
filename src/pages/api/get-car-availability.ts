import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "@booking/config/session";
import { supabase } from "@booking/supabase/client";
import { withIronSessionApiRoute } from "iron-session/next";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const queryParams = req.query;

  const month: number = parseInt(queryParams.month as string);

  const carBusyDaysFromMonth: number[] = [];

  const { data: bookings, error } = await supabase
    .from("booking")
    .select("*")
    .eq("car_id", queryParams.car_id as string);

  if (error) {
    return res.status(500).send({ error });
  }

  bookings!.forEach((booking) => {
    const startDate = new Date(booking.start_date);
    const endDate = new Date(booking.end_date);

    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();

    if (startMonth === month || endMonth === month) {
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();

      for (let day = startDay; day <= endDay; day++) {
        carBusyDaysFromMonth.push(day);
      }
    }
  });

  res.status(201).send({ dates: Array.from(new Set(carBusyDaysFromMonth)) });
}

export default withIronSessionApiRoute(handler, sessionOptions);
