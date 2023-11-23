import { useCallback, useEffect, useState } from "react";
import { Button } from "@booking/@components/ui/button";
import { Calendar } from "@booking/@components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@booking/@components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@booking/@components/ui/popover";
import { toast } from "@booking/@components/ui/use-toast";
import { sessionAtom } from "@booking/config/store";
import { cn } from "@booking/lib/util";
import { Car } from "@booking/types/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

interface BookingFormProps {
  makeReservation: (
    car_id: string,
    start_date: Date,
    end_date: Date,
    total_cost: number,
    user_id: string,
  ) => Promise<void>;
  car: Car;
}

const FormSchema = z.object({
  start_date: z.date({
    required_error: "A start date is required.",
  }),
  end_date: z.date({
    required_error: "An end date is required.",
  }),
});

function CarDescription({
  labelTitle,
  labelContent,
}: {
  labelTitle: string;
  labelContent: string;
}) {
  return (
    <div className="flex gap-1">
      <p className="text-sm font-semibold tracking-tight">{labelTitle}</p>
      <p className="text-sm">{labelContent}</p>
    </div>
  );
}

export function BookingForm({ makeReservation, car }: BookingFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [session] = useAtom(sessionAtom);

  const [total, setTotal] = useState(0);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const [carBusyDays, setCarBusyDays] = useState<number[]>([]);

  const calculateTotal = useCallback(() => {
    const { start_date, end_date } = form.getValues();

    if (!start_date || !end_date) return;

    //calculate days difference between two dates
    const diffInMs = Math.abs(end_date.getTime() - start_date.getTime());
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    const result = diffInDays * (car?.price_per_day as number);

    setTotal(result < 1 ? (car?.price_per_day as number) : result);
  }, [car?.price_per_day, form]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      await makeReservation(
        car!.id,
        data.start_date,
        data.end_date,
        total,
        session?.user.id!,
      );

      toast({
        title: "Success:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Your booking was created!</code>
          </pre>
        ),
      });
    },
    [car, session?.user.id, total],
  );

  const getCarAvailability = useCallback(async () => {
    const response = await fetch(
      `/api/get-car-availability?car_id=${car?.id}&month=${currentMonth}`,
    );

    const data = await response.json();

    setCarBusyDays(data.dates);
  }, [car, currentMonth]);

  useEffect(() => {
    getCarAvailability();
  }, [currentMonth]);

  return (
    <>
      <CarDescription
        labelTitle="Model:"
        labelContent={`${car?.brand} - ${car?.model}`}
      />
      <CarDescription
        labelTitle="Price per day:"
        labelContent={car?.price_per_day?.toString() as string}
      />
      <CarDescription
        labelTitle="Engine:"
        labelContent={`${car?.displacement}`}
      />
      <CarDescription labelTitle="Year:" labelContent={`${car?.year}`} />
      <CarDescription
        labelTitle="Category:"
        labelContent={`${car?.category}`}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(...args) => {
                        field.onChange(...args);
                        calculateTotal();
                      }}
                      onMonthChange={(month) =>
                        setCurrentMonth(month.getMonth())
                      }
                      initialFocus
                      disabled={(date: Date) =>
                        carBusyDays.includes(date.getDate()) ||
                        date < new Date()
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(...args) => {
                        field.onChange(...args);
                        calculateTotal();
                      }}
                      onMonthChange={(month) =>
                        setCurrentMonth(month.getMonth())
                      }
                      disabled={(date: Date) =>
                        carBusyDays.includes(date.getDate()) ||
                        date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold tracking-tight">
              Estimated Total: ${total}
            </p>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
