import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@booking/@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@booking/@components/ui/form";
import { Input } from "@booking/@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@booking/@components/ui/select";
import { toast } from "@booking/@components/ui/use-toast";
import { cn } from "@booking/lib/util";

const CAR_CATEGORIES = ["domestic", "offroad", "sport", "supersport"] as const;

interface CreateCarFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CarFormSchema = z.object({
  brand: z.string(),
  price_per_day: z.number(),
  model: z.string(),
  displacement: z.string(),
  category: z.enum(CAR_CATEGORIES),
  year: z.number(),
  image: z.string(),
});

export function CreateCarForm({ className, ...props }: CreateCarFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof CarFormSchema>>({
    resolver: zodResolver(CarFormSchema),
  });

  async function onSubmit(data: z.infer<typeof CarFormSchema>) {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/create-car`, {
        body: JSON.stringify(data),
        method: "POST",
      });

      if (response.status === 400) {
        throw new Error((await response.json()).message);
      }

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      toast({
        title: "Success",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Car created {form.getValues().model} - {form.getValues().brand}
            </code>
          </pre>
        ),
      });
      setIsLoading(false);
      router.reload();
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Error:",
        variant: "destructive",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Brand" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Model" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Category</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category for the new car" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CAR_CATEGORIES.map((category) => {
                          return (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Year"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value || "0"))
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displacement"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Displacement</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Year" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price_per_day"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Price Per Day</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Price Per Day"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value || "0"))
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Image" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
