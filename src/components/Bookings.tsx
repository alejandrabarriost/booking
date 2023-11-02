import { BookingsTable } from "./BookingsTable";

interface BookingsProps {
  bookings: any[];
  updateBookings: (newBookings: any[]) => void;
}

export default function Bookings({ bookings, updateBookings }: BookingsProps) {
  if (bookings.length < 1) {
    return <div>No bookings</div>;
  }

  return (
    <div>
      <BookingsTable bookings={bookings} updateBookings={updateBookings} />
    </div>
  );
}
