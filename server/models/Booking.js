import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }, // Optional if room is dynamic
    roomType: { type: String, required: true }, // Store snapshot
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending Approval', 'Confirmed', 'Checked In', 'Checked Out', 'Cancelled'],
        default: 'Pending Approval'
    },
    requestDate: { type: Date, default: Date.now },
    isInternal: { type: Boolean, default: false }
});

export default mongoose.model('Booking', bookingSchema);
