import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, isInternal } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Determine user type logic
        let type = 'GUEST';
        if (email === 'admin@swagat.com') {
            type = 'ADMIN';
        } else if (isInternal) {
            if (email.endsWith('@paruluniversity.ac.in')) {
                type = 'PARUL_MEMBER';
            } else {
                return res.status(400).json({ message: 'Invalid Parul University email' });
            }
        }

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            type
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, type: newUser.type }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                type: newUser.type
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: existingUser._id, type: existingUser.type }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                type: existingUser.type
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

export default router;
