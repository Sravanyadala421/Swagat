import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';

dotenv.config({ path: '../.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined");
    process.exit(1);
}

const ROOMS = [
    {
        type: 'Standard Room',
        price: 1500,
        capacity: 2,
        description: "Comfortable standard room perfect for short stays.",
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800",
        amenities: ["Wi-Fi", "AC", "TV", "Tea/Coffee Maker"]
    },
    {
        type: 'Deluxe Room',
        price: 2500,
        capacity: 2,
        description: "Spacious room with a garden view and premium furnishings.",
        image: "https://images.unsplash.com/photo-1590490360182-f33fb0d41022?auto=format&fit=crop&q=80&w=800",
        amenities: ["Wi-Fi", "AC", "TV", "Mini Bar", "Balcony"]
    },
    {
        type: 'Executive Suite',
        price: 4500,
        capacity: 4,
        description: "Luxury suite with separate living area and master bedroom.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        amenities: ["Wi-Fi", "AC", "TV", "Kitchenette", "Living Room", "Bathtub"]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        await Room.deleteMany({});
        console.log('Cleared existing rooms');

        await Room.insertMany(ROOMS);
        console.log('Seeded rooms successfully');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
