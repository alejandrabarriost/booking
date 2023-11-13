import Bookings from "@booking/components/Bookings";
import Cars from "@booking/components/Cars";
import { supabase } from "@booking/supabase/client";
import { useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@booking/config/session";
import { sessionAtom } from "@booking/config/store";
import { useAtom } from "jotai";
import type { Booking, Car } from "@booking/types/booking";

interface HomeProps {
  bookings: Booking[];
  cars: Car[];
}

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const promises: any[] = [supabase.from("cars").select("*")];

  if (req.session.user.role === "admin") {
    promises.push(
      supabase.from("booking").select(`
    *,
    cars:car_id (
      *
    ),
    user:user_id (
      id,
      created_at,
      username,
      role
    )
    `)
    );
  } else {
    promises.push(
      supabase
        .from("booking")
        .select(
          `
      *,
      cars:car_id (
        *
      )
      `
        )
        .eq("user_id", req.session.user.id)
    );
  }

  const [cars, bookings] = await Promise.all(promises);

  return {
    props: {
      bookings: bookings.data,
      cars: cars.data,
      session: req.session,
    },
  };
}, sessionOptions);

export default function Dashboard({ bookings, cars }: HomeProps) {
  const [session] = useAtom(sessionAtom);

  return (
    <div>
      <div className="mb-10">
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-xl mb-4">
          {session?.user.role === "admin" ? "All Bookings :" : "My Bookings :"}
        </h1>
        <Bookings bookings={bookings} />
      </div>

      <div>
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-xl mb-4">
          Cars Available To Book :
        </h1>
        <Cars cars={cars} />
      </div>
    </div>
  );
}
