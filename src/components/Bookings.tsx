import { BookingsTable } from "./BookingsTable";

interface BookingsProps {
  bookings: any[];
}

export default function Bookings(
  { bookings }: BookingsProps = { bookings: [] }
) {
  if (bookings.length < 1) {
    return <div>No bookings</div>;
  }

  return (
    <div>
      <BookingsTable bookings={bookings} />
    </div>
  );
}
