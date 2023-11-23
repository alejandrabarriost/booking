import { useRouter } from "next/router";
import type { Car } from "@booking/types/booking";

import CarCard from "./CarCard";

interface CarsProps {
  cars: Car[];
}

export default function Cars({ cars }: CarsProps = { cars: [] }) {
  const router = useRouter();

  const makeReservation = async (
    car_id: string,
    start_date: Date,
    end_date: Date,
    total_cost: number,
    user_id: string,
  ) => {
    await fetch("/api/reserve", {
      method: "POST",
      body: JSON.stringify({
        car_id,
        start_date: start_date.toISOString(),
        end_date: end_date.toISOString(),
        total_cost: total_cost,
        user_id: user_id,
      }),
    });

    router.reload();
  };

  if (cars.length < 1) {
    return <p>No cars...</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 xxs:grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => {
        return (
          <div key={car.id}>
            <CarCard car={car} makeReservation={makeReservation} />
          </div>
        );
      })}
    </div>
  );
}
