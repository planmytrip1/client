// lib/types/IBooking
export interface IBooking {
  userId: string;
  packageId: string;
  packageType: "hajj" | "umrah" | "tours";
  numberOfTravellers: number;
  status: "pending" | "confirmed" | "cancelled";
  client: {
    Name: string;
    email: string;
    phone: string;
    address: string;
  };
  specialRequests?: string;
  createdAt: Date;
}
