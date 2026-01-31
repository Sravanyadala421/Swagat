import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    type: { type: String, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    amenities: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Room', roomSchema);
