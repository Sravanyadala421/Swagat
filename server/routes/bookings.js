import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// Create Booking
router.post('/', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get Bookings (Filter by user or all for admin)
router.get('/', async (req, res) => {
    try {
        const { userId, type } = req.query;
        let query = {};

        // If specific user
        if (userId) {
            query = { user: userId };
        }

        const bookings = await Booking.find(query).populate('user', 'name email');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
