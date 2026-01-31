export enum UserType {
  PARUL_MEMBER = 'PARUL_MEMBER',
  GUEST = 'GUEST',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  department?: string; // Only for Parul members
}

export enum RoomType {
  DELUXE = 'Deluxe Room',
  SUITE = 'Executive Suite',
  STANDARD = 'Standard Room',
  DORM = 'Dormitory'
}

export interface Room {
  id: string;
  type: RoomType;
  price: number; // Price per night (0 for Parul members logic handled in component)
  capacity: number;
  description: string;
  image: string;
  amenities: string[];
}

export enum BookingStatus {
  PENDING_APPROVAL = 'Pending Approval', // Internal only
  CONFIRMED = 'Confirmed',               // External (Paid) or Approved Internal
  CHECKED_IN = 'Checked In',
  CHECKED_OUT = 'Checked Out',
  CANCELLED = 'Cancelled'
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  isInternal: boolean;
  roomId: string;
  roomType: RoomType;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  requestDate: string;
}
