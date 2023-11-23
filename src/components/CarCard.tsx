import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@booking/@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@booking/@components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@booking/@components/ui/dialog";
import { Separator } from "@booking/@components/ui/separator";
import { sessionAtom } from "@booking/config/store";
import { Car } from "@booking/types/booking";
import { useAtom } from "jotai";

import { BookingForm } from "./BookingForm";

export default function CarCard({
  car,
  makeReservation,
}: {
  car: Car;
  makeReservation: (
    car_id: string,
    start_date: Date,
    end_date: Date,
    total_cost: number,
    user_id: string,
  ) => Promise<void>;
}) {
  const [session] = useAtom(sessionAtom);

  const [open, setOpen] = useState(false);

  const reserve = async (
    car_id: string,
    start_date: Date,
    end_date: Date,
    total_cost: number,
    user_id: string,
  ) => {
    await makeReservation(car_id, start_date, end_date, total_cost, user_id);
    setOpen(false);
  };

  const deleteCar = async (car_id: string) => {
    await fetch("/api/delete-car", {
      method: "DELETE",
      body: JSON.stringify({
        car_id,
      }),
    });

    router.reload();
  };

  const router = useRouter();

  return (
    <Card>
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
        <p className="text-md font-semibold tracking-tight">Year: {car.year}</p>
        <Separator />
      </CardContent>

      <CardFooter className="block">
        <Dialog open={open} onOpenChange={(_open) => setOpen(_open)}>
          <div className="flex justify-between">
            <DialogTrigger asChild>
              <Button>Reserve</Button>
            </DialogTrigger>

            {router.pathname === "/dashboard/cars" &&
              session?.user.role === "admin" && (
                <Button onClick={() => deleteCar(car.id)}>Delete</Button>
              )}
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-2">Booking Details:</DialogTitle>
            </DialogHeader>

            <BookingForm makeReservation={reserve} car={car} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
