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
import { useState } from "react";

interface CarsProps {
  cars: any[];
  updateBookings: (newBookings: any[]) => void;
}

export default function Cars(
  { cars, updateBookings }: CarsProps = { cars: [], updateBookings: () => {} }
) {
  const [open, setOpen] = useState(false);

  const makeReservation = async (
    car_id: string,
    start_date: Date,
    end_date: Date,
    total_cost: number
  ) => {
    const response = await fetch("/api/reserve", {
      method: "POST",
      body: JSON.stringify({
        car_id,
        start_date: start_date.toISOString(),
        end_date: end_date.toISOString(),
        total_cost: total_cost,
      }),
    });

    const data = await response.json();

    updateBookings(data);
    setOpen(false);
  };

  if (cars.length < 1) {
    return <div>No cars</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {cars.map((car, idx) => {
        return (
          <Card key={`booking-${idx}`}>
            <CardHeader>
              <CardTitle>{car.model}</CardTitle>
              <CardDescription>{car.brand}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-md font-semibold tracking-tight">
                Price Per Day: ${car.price_per_day}
              </p>
            </CardContent>
            <CardFooter>
              <Dialog open={open} onOpenChange={_open => setOpen(_open)}>
                <DialogTrigger>
                  <Button>Reserve</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <p className="mb-2">Booking Details: </p>
                    </DialogTitle>
                    <DialogDescription>
                      <BookingForm
                        price_per_day={car.price_per_day}
                        makeReservation={makeReservation}
                        car_id={car.id}
                      />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
