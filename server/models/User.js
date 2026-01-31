import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: {
        type: String,
        enum: ['PARUL_MEMBER', 'GUEST', 'ADMIN'],
        default: 'GUEST'
    },
    department: { type: String }, // Optional, for Parul members
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
