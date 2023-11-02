import { Button } from "@booking/@components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@booking/@components/ui/table";

export function BookingsTable(
  { bookings }: { bookings: any[] } = { bookings: [] }
) {
  return (
    <Table style={{ border: "1px solid lightgray" }}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-end">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map(booking => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">
              {booking.id.substring(0, 8)}...
            </TableCell>
            <TableCell>
              {new Date(booking.start_date).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(booking.end_date).toLocaleDateString()}
            </TableCell>
            <TableCell className="font-medium">{booking.total_cost}</TableCell>
            <TableCell className="text-end">
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
