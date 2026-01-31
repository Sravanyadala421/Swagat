import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRooms } from '../context/RoomContext';
import { Room, RoomType, BookingStatus } from '../types';
import { Calendar, Users, Info, CreditCard, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BookingPage: React.FC = () => {
    const { user } = useAuth();
    const { rooms } = useRooms();
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const calculateTotal = (price: number) => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // If Parul member, it's free
        if (user?.type === 'PARUL_MEMBER') return 0;
        return diffDays * price;
    };

    const handleBook = (e: React.FormEvent) => {
        e.preventDefault();

        const total = calculateTotal(selectedRoom!.price);

        if (user?.type === 'PARUL_MEMBER') {
            // Direct submission for internal members (no payment)
            // We can implement this api call here or redirect to a confirmation page that handles it
            // For consistency with current request, let's treat it similar but skip payment
            navigate('/payment', {
                state: {
                    roomId: selectedRoom!.id,
                    roomType: selectedRoom!.type,
                    checkIn,
                    checkOut,
                    guests,
                    totalPrice: 0
                }
            });
        } else {
            navigate('/payment', {
                state: {
                    roomId: selectedRoom!.id,
                    roomType: selectedRoom!.type,
                    checkIn,
                    checkOut,
                    guests,
                    totalPrice: total
                }
            });
        }
    };

    if (bookingSuccess) {
        return (
            <div className="min-h-screen bg-brand-light flex items-center justify-center pt-20">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="text-green-600" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
                    <p className="text-gray-600 mb-6">
                        {user?.type === 'PARUL_MEMBER'
                            ? 'Your request has been sent to the Department Head for approval.'
                            : 'Your booking is confirmed. Check your email for details.'}
                    </p>
                    <button onClick={() => navigate('/')} className="w-full bg-brand-wine text-white py-3 rounded-lg font-medium">Return Home</button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-brand-wine">Book Your Stay</h1>
                    <p className="text-gray-500">Select a room and dates for your visit</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Room Selection */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-brand-peach text-brand-wine flex items-center justify-center text-sm font-bold">1</div>
                            Select a Room
                        </h2>
                        <div className="grid gap-6">
                            {rooms.map((room) => (
                                <div
                                    key={room.id}
                                    onClick={() => setSelectedRoom(room)}
                                    className={`bg-white rounded-xl overflow-hidden shadow-sm border-2 cursor-pointer transition-all ${selectedRoom?.id === room.id ? 'border-brand-peach ring-2 ring-brand-peach ring-opacity-50 transform scale-[1.01]' : 'border-transparent hover:border-gray-200'}`}
                                >
                                    <div className="md:flex">
                                        <div className="md:w-1/3">
                                            <img className="h-48 w-full object-cover md:h-full" src={room.image} alt={room.type} />
                                        </div>
                                        <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-xl font-bold text-gray-900">{room.type}</h3>
                                                    <div className="text-right">
                                                        {user?.type === 'PARUL_MEMBER' ? (
                                                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">FREE (Internal)</span>
                                                        ) : (
                                                            <span className="text-brand-wine font-bold text-lg">₹{room.price}<span className="text-sm font-normal text-gray-500">/night</span></span>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 mt-2 text-sm">{room.description}</p>
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {room.amenities.map(a => (
                                                        <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{a}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-4 flex items-center text-sm text-gray-500">
                                                <Users size={16} className="mr-1" /> Max Capacity: {room.capacity} Persons
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Booking Summary Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-full bg-brand-peach text-brand-wine flex items-center justify-center text-sm font-bold">2</div>
                                Reservation Details
                            </h2>

                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                {!selectedRoom ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <Info className="mx-auto mb-2" />
                                        <p>Please select a room to proceed</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleBook} className="space-y-4">
                                        <div className="bg-brand-light p-4 rounded-lg border border-brand-peach border-opacity-30">
                                            <h3 className="font-bold text-brand-wine">{selectedRoom.type}</h3>
                                            {user?.type !== 'PARUL_MEMBER' && <p className="text-sm text-gray-600">₹{selectedRoom.price} / night</p>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">CHECK-IN</label>
                                                <input
                                                    type="date"
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                    value={checkIn}
                                                    onChange={(e) => setCheckIn(e.target.value)}
                                                    className="w-full p-2 border rounded-md text-sm focus:ring-1 focus:ring-brand-peach outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">CHECK-OUT</label>
                                                <input
                                                    type="date"
                                                    required
                                                    min={checkIn || new Date().toISOString().split('T')[0]}
                                                    value={checkOut}
                                                    onChange={(e) => setCheckOut(e.target.value)}
                                                    className="w-full p-2 border rounded-md text-sm focus:ring-1 focus:ring-brand-peach outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">GUESTS</label>
                                            <select
                                                value={guests}
                                                onChange={(e) => setGuests(Number(e.target.value))}
                                                className="w-full p-2 border rounded-md text-sm outline-none"
                                            >
                                                {[...Array(selectedRoom.capacity)].map((_, i) => (
                                                    <option key={i} value={i + 1}>{i + 1} Person{i > 0 ? 's' : ''}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {user?.type === 'PARUL_MEMBER' && (
                                            <div className="bg-yellow-50 p-3 rounded-md text-xs text-yellow-800 border border-yellow-200">
                                                <strong>Note:</strong> Booking requires HOD approval. Availability is subject to department confirmation.
                                            </div>
                                        )}

                                        <div className="border-t pt-4 mt-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="font-semibold text-gray-700">Total</span>
                                                <span className="text-xl font-bold text-brand-wine">
                                                    ₹{calculateTotal(selectedRoom.price)}
                                                </span>
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-brand-peach text-brand-wine font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors shadow-md flex items-center justify-center gap-2"
                                            >
                                                {user?.type === 'PARUL_MEMBER' ? 'Request Approval' : 'Proceed to Payment'}
                                                {user?.type !== 'PARUL_MEMBER' && <CreditCard size={18} />}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
