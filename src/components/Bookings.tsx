import { Booking } from "@booking/types/booking";

import { BookingsTable } from "./BookingsTable";

interface BookingsProps {
  bookings: Booking[];
}

export default function Bookings({ bookings }: BookingsProps) {
  if (bookings.length < 1) {
    return <div>No bookings</div>;
  }

  return (
    <div>
      <BookingsTable bookings={bookings} />
    </div>
  );
}
