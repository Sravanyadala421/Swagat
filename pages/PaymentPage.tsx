import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/api';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { BookingStatus, RoomType } from '../types';

export const PaymentPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Booking details passed from BookingPage
    const bookingDetails = location.state;

    useEffect(() => {
        if (!bookingDetails) {
            navigate('/booking');
        }
    }, [bookingDetails, navigate]);

    if (!bookingDetails) return null;

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setError('');

        // Simulate mock payment delay
        setTimeout(async () => {
            try {
                // Create booking in backend
                await bookingService.create({
                    userId: user?.id, // Assuming backend handles this from token usually, but here we might need manual or it's handled by API logic
                    userName: user?.name,
                    userEmail: user?.email,
                    isInternal: user?.type === 'PARUL_MEMBER',
                    roomId: bookingDetails.roomId,
                    roomType: bookingDetails.roomType as RoomType,
                    checkIn: bookingDetails.checkIn,
                    checkOut: bookingDetails.checkOut,
                    guests: bookingDetails.guests,
                    totalPrice: bookingDetails.totalPrice,
                    status: user?.type === 'PARUL_MEMBER' ? BookingStatus.PENDING_APPROVAL : BookingStatus.CONFIRMED // Auto-confirm if paid
                });

                setSuccess(true);
                setProcessing(false);
            } catch (err) {
                console.error(err);
                setError('Payment failed. Please try again.');
                setProcessing(false);
            }
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-600" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for your payment. Your room has been successfully booked.
                    </p>
                    <button onClick={() => navigate('/')} className="w-full bg-brand-wine text-white py-3 rounded-lg font-medium">Return Home</button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-brand-wine mb-8">Secure Payment</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">

                        {/* Payment Methods */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center gap-2 mb-6">
                                <Lock size={20} className="text-brand-peach" />
                                <h2 className="text-lg font-bold text-gray-800">Card Details</h2>
                            </div>

                            <form onSubmit={handlePayment} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Card Number</label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-peach outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Expiry Date</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-peach outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-peach outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Cardholder Name</label>
                                    <input
                                        type="text"
                                        placeholder="Name on card"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-peach outline-none"
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2">
                                        <AlertCircle size={16} /> {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-wine hover:bg-opacity-90'}`}
                                >
                                    {processing ? 'Processing...' : `Pay ₹${bookingDetails.totalPrice}`}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Room Type</span>
                                    <span className="font-medium text-gray-900">{bookingDetails.roomType}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Dates</span>
                                    <span className="font-medium text-gray-900 text-right">
                                        {bookingDetails.checkIn} <br />to {bookingDetails.checkOut}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Guests</span>
                                    <span className="font-medium text-gray-900">{bookingDetails.guests}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between items-center">
                                    <span className="font-bold text-gray-800">Total</span>
                                    <span className="text-xl font-bold text-brand-wine">₹{bookingDetails.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
