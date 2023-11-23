import { useState } from "react";
import { withIronSessionSsr } from "iron-session/next";

import { Button } from "@booking/@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@booking/@components/ui/dialog";
import { Separator } from "@booking/@components/ui/separator";
import Cars from "@booking/components/Cars";
import SearchForm from "@booking/components/SearchForm";
import Title from "@booking/components/Title";
import { sessionOptions } from "@booking/config/session";
import { supabase } from "@booking/supabase/client";
import { Car } from "@booking/types/booking";

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const cars = await supabase.from("cars").select("*");

  return {
    props: {
      cars: cars.data,
      session: req.session,
    },
  };
}, sessionOptions);

interface CarsProps {
  cars: Car[];
}

export default function CarsPage({ cars: _cars }: CarsProps) {
  const [cars, setCars] = useState<Car[]>(_cars);

  const onResults = (results: Car[]) => {
    setCars(results);
  };

  const resetCarList = () => {
    setCars(_cars);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Title>Cars Inventory:</Title>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add A New Car</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new car:</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="mt-5 mb-5" />

      <div className="mt-5 mb-5">
        <SearchForm onResults={onResults} resetCarList={resetCarList} />
      </div>

      <Cars cars={cars} />
    </div>
  );
}
