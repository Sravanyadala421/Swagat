import { Room, RoomType, Booking, BookingStatus } from '../types';

export const ROOMS: Room[] = [
  {
    id: 'r1',
    type: RoomType.STANDARD,
    price: 1500,
    capacity: 2,
    description: "Comfortable standard room perfect for short stays.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800",
    amenities: ["Wi-Fi", "AC", "TV", "Tea/Coffee Maker"]
  },
  {
    id: 'r2',
    type: RoomType.DELUXE,
    price: 2500,
    capacity: 2,
    description: "Spacious room with a garden view and premium furnishings.",
    image: "https://images.unsplash.com/photo-1590490360182-f33fb0d41022?auto=format&fit=crop&q=80&w=800",
    amenities: ["Wi-Fi", "AC", "TV", "Mini Bar", "Balcony"]
  },
  {
    id: 'r3',
    type: RoomType.SUITE,
    price: 4500,
    capacity: 4,
    description: "Luxury suite with separate living area and master bedroom.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
    amenities: ["Wi-Fi", "AC", "TV", "Kitchenette", "Living Room", "Bathtub"]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    userId: 'u1',
    userName: 'Prof. Amit Sharma',
    userEmail: 'amit.sharma@paruluniversity.ac.in',
    isInternal: true,
    roomId: 'r2',
    roomType: RoomType.DELUXE,
    checkIn: '2023-11-01',
    checkOut: '2023-11-05',
    guests: 2,
    totalPrice: 0,
    status: BookingStatus.PENDING_APPROVAL,
    requestDate: '2023-10-25'
  },
  {
    id: 'b2',
    userId: 'u2',
    userName: 'John Doe',
    userEmail: 'john.doe@gmail.com',
    isInternal: false,
    roomId: 'r1',
    roomType: RoomType.STANDARD,
    checkIn: '2023-11-02',
    checkOut: '2023-11-04',
    guests: 1,
    totalPrice: 3000,
    status: BookingStatus.CONFIRMED,
    requestDate: '2023-10-28'
  },
  {
    id: 'b3',
    userId: 'u3',
    userName: 'Dr. Priya Patel',
    userEmail: 'priya.patel@paruluniversity.ac.in',
    isInternal: true,
    roomId: 'r3',
    roomType: RoomType.SUITE,
    checkIn: '2023-10-20',
    checkOut: '2023-10-22',
    guests: 3,
    totalPrice: 0,
    status: BookingStatus.CHECKED_IN,
    requestDate: '2023-10-15'
  },
  {
    id: 'b4',
    userId: 'u4',
    userName: 'Rahul Singh',
    userEmail: 'rahul.s@paruluniversity.ac.in',
    isInternal: true,
    roomId: 'r1',
    roomType: RoomType.STANDARD,
    checkIn: '2023-11-10',
    checkOut: '2023-11-12',
    guests: 1,
    totalPrice: 0,
    status: BookingStatus.PENDING_APPROVAL,
    requestDate: '2023-10-29'
  },
  {
    id: 'b5',
    userId: 'u5',
    userName: 'Sarah Jenkins',
    userEmail: 'sarah.j@hotmail.com',
    isInternal: false,
    roomId: 'r3',
    roomType: RoomType.SUITE,
    checkIn: '2023-11-15',
    checkOut: '2023-11-20',
    guests: 2,
    totalPrice: 22500,
    status: BookingStatus.CONFIRMED,
    requestDate: '2023-10-30'
  },
  {
    id: 'b6',
    userId: 'u6',
    userName: 'Dean Robert',
    userEmail: 'dean.r@paruluniversity.ac.in',
    isInternal: true,
    roomId: 'r2',
    roomType: RoomType.DELUXE,
    checkIn: '2023-10-01',
    checkOut: '2023-10-05',
    guests: 2,
    totalPrice: 0,
    status: BookingStatus.CHECKED_OUT,
    requestDate: '2023-09-25'
  },
  {
    id: 'b7',
    userId: 'u7',
    userName: 'Guest User',
    userEmail: 'guest@test.com',
    isInternal: false,
    roomId: 'r1',
    roomType: RoomType.STANDARD,
    checkIn: '2023-10-05',
    checkOut: '2023-10-06',
    guests: 1,
    totalPrice: 1500,
    status: BookingStatus.CANCELLED,
    requestDate: '2023-10-01'
  }
];