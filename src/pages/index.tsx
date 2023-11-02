import Bookings from "@booking/components/Bookings";
import Cars from "@booking/components/Cars";
import { supabase } from "@booking/supabase/client";
import { useState } from "react";

interface HomeProps {
  bookings: any[];
  cars: any[];
}

export const getServerSideProps = async () => {
  const [bookings, cars] = await Promise.all([
    supabase.from("booking").select("*"),
    supabase.from("cars").select("*"),
  ]);

  return {
    props: {
      bookings: bookings.data,
      cars: cars.data,
    },
  };
};

export default function Home(
  { bookings: _bookings, cars }: HomeProps = { bookings: [], cars: [] }
) {
  const [bookings, setBookings] = useState<any[]>(_bookings);

  const updateBookings = (newBookings: any[]) => {
    setBookings(newBookings);
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl mb-4">
          Bookings:
        </h1>
        <Bookings bookings={bookings} />
      </div>

      <div>
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl mb-4">
          Cars:
        </h1>
        <Cars cars={cars} updateBookings={updateBookings} />
      </div>
    </div>
  );
}
