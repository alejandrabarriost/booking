import { Button } from "@booking/@components/ui/button";
import { Calendar } from "@booking/@components/ui/calendar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@booking/@components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@booking/@components/ui/popover";
import { toast } from "@booking/@components/ui/use-toast";
import { selectedCarAtom, sessionAtom } from "@booking/config/store";
import { cn } from "@booking/lib/util";
import { Car } from "@booking/types/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface BookingFormProps {
  makeReservation: (
    car_id: string,
    start_date: Date,
    end_date: Date,
    total_cost: number,
    user_id: string
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

export function BookingForm({ makeReservation }: BookingFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [car] = useAtom(selectedCarAtom);

  const [session] = useAtom(sessionAtom);

  const [total, setTotal] = useState(0);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await makeReservation(
      car!.id,
      data.start_date,
      data.end_date,
      total,
      session?.user.id!
    );
    toast({
      title: "Success:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Your booking was created!</code>
        </pre>
      ),
    });
  }

  const calculateTotal = () => {
    const { start_date, end_date } = form.getValues();

    if (!start_date || !end_date) return;

    //calculate days difference between two dates
    const diffInMs = Math.abs(end_date.getTime() - start_date.getTime());
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    const result = diffInDays * (car?.price_per_day as number);

    setTotal(result < 1 ? (car?.price_per_day as number) : result);
  };

  return (
    <>
      <p className="mb-4">
        {car?.brand} - {car?.model}
      </p>
      <p className="mb-4">Price per day: ${car?.price_per_day}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                          !field.value && "text-muted-foreground"
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
                      initialFocus
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
                          !field.value && "text-muted-foreground"
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
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <p>Estimated Total: ${total}</p>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
