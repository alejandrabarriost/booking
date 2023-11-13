import { Button } from "@booking/@components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@booking/@components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@booking/@components/ui/dialog";
import { BookingForm } from "./BookingForm";
import { useEffect, useRef, useState } from "react";
import type { Car } from "@booking/types/booking";
import { Separator } from "@booking/@components/ui/separator";
import { useRouter } from "next/router";
import { selectedCarAtom, store } from "@booking/config/store";

interface CarsProps {
  cars: Car[];
}

export default function Cars({ cars }: CarsProps = { cars: [] }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const makeReservation = async (
    car_id: string,
    start_date: Date,
    end_date: Date,
    total_cost: number,
    user_id: string
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

    setOpen(false);

    router.reload();
  };

  if (cars.length < 1) {
    return <div>No cars</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {cars.map(car => {
        return (
          <Card key={car.id}>
            <CardHeader>
              <CardTitle>{car.model}</CardTitle>
              <CardDescription>{car.brand}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-md font-semibold tracking-tight">
                Price Per Day: ${car.price_per_day}
              </p>
              <Separator />
              <p className="text-md font-semibold tracking-tight">
                Engine: {car.displacement}
              </p>
              <Separator />
              <p className="text-md font-semibold tracking-tight">
                Category: {car.category}
              </p>
              <Separator />
              <p className="text-md font-semibold tracking-tight">
                Year: {car.year}
              </p>
              <Separator />
            </CardContent>
            <CardFooter>
              <Dialog open={open} onOpenChange={_open => setOpen(_open)}>
                <DialogTrigger
                  onClick={() => store.set(selectedCarAtom, car)}
                  asChild
                >
                  <Button>Reserve</Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-2">Booking Details:</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <BookingForm makeReservation={makeReservation} car={car} />
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
