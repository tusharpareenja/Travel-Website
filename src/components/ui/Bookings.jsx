import { BedDoubleIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  const hotelBookings = [
    {
      id: 1,
      hotelName: "Sunset Beach Resort",
      checkIn: "2024-07-15",
      checkOut: "2024-07-20",
      guests: 2,
      roomType: "Ocean View Suite",
    },
    {
      id: 2,
      hotelName: "Mountain Lodge",
      checkIn: "2024-08-05",
      checkOut: "2024-08-10",
      guests: 4,
      roomType: "Family Cabin",
    },
  ];

  return (
    <div className="p-2">
      <Card className="bg-customColor1 text-white shadow-none border-none">
        <CardHeader>
          <CardTitle className="flex items-center text-xs font-medium">
            <BedDoubleIcon className="w-4 h-4 mr-1 text-gray-300" /> Hotel Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {hotelBookings.map((booking) => (
              <li key={booking.id} className="bg-gray-700 rounded-sm p-1">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-medium text-xs">{booking.hotelName}</h3>
                  <Badge variant="secondary" className="text-xs">{booking.roomType}</Badge>
                </div>
                <div className="text-xs text-gray-300 space-y-0.5">
                  <p>Check-in: {booking.checkIn}</p>
                  <p>Check-out: {booking.checkOut}</p>
                  <p>Guests: {booking.guests}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
