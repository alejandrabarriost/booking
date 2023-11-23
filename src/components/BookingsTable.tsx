import { useRouter } from "next/router";
import { Button } from "@booking/@components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@booking/@components/ui/table";
import { sessionAtom } from "@booking/config/store";
import { Booking, Car, User } from "@booking/types/booking";
import { useAtom } from "jotai";

export function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const _bookings = bookings as Array<
    Booking & { cars: Car; user: Omit<User, "password"> }
  >;

  const router = useRouter();

  const [session] = useAtom(sessionAtom);

  const deleteBooking = async (id: string) => {
    await fetch("/api/delete-reserve", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    });

    router.reload();
  };

  return (
    <Table style={{ border: "1px solid lightgray" }}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          {session?.user.role === "admin" && <TableHead>Username</TableHead>}
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Engine</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Year</TableHead>
          {session?.user.role === "admin" && (
            <TableHead className="text-end">Action</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {_bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">
              {booking.id.substring(0, 8)}...
            </TableCell>
            {session?.user.role === "admin" && (
              <TableCell>{booking.user.username}</TableCell>
            )}
            <TableCell>
              {new Date(booking.start_date).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(booking.end_date).toLocaleDateString()}
            </TableCell>
            <TableCell className="font-medium">
              $ {booking.total_cost}
            </TableCell>
            <TableCell className="font-medium">{booking.cars.model}</TableCell>
            <TableCell className="font-medium">
              {booking.cars.displacement}
            </TableCell>
            <TableCell className="font-medium">
              {booking.cars.category}
            </TableCell>
            <TableCell className="font-medium">{booking.cars.year}</TableCell>

            {session?.user.role === "admin" && (
              <TableCell className="text-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteBooking(booking.id)}
                >
                  Delete
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
