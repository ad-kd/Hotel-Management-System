const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const User = require('../models/User');
const Review = require('../models/Review');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../client/public/assets'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Owner DB Authentication
router.post('/owner/login', async (req, res) => {
    const { email, password } = req.body;
    
    // As requested: predefined user
    if (email === 'owner@gmail.com' && password === 'owner12345') {
        // Return a simple success token (in a real app, this would be a JWT)
        return res.json({ token: 'hotel-owner-db-token' });
    } else {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
});

// Add room
router.post('/rooms', upload.any(), async (req, res) => {
    try {
        let hotelName = req.body.hotelName || 'My Hotel';
        let hotelLocation = req.body.hotelLocation || 'Unknown Location';
        
        let hotel = await Hotel.findOne({ name: hotelName });
        if (!hotel) {
            let owner = await User.findOne();
            // If no user exists, create a dummy one just to satisfy the required ref
            if (!owner) {
                owner = await User.create({
                    username: 'hotel_owner',
                    email: 'owner@gmail.com',
                    role: 'hotelOwner',
                    clerkId: 'dummy_clerk_id'
                });
            }
            hotel = await Hotel.create({
                owner: owner._id,
                name: hotelName,
                address: hotelLocation,
                contact: 'Not Provided',
                city: hotelLocation.split(',')[0].trim() || 'Unknown City'
            });
        } else if (req.body.hotelLocation && hotel.address !== req.body.hotelLocation) {
            hotel.address = req.body.hotelLocation;
            await hotel.save();
        }
        
        let amenities = [];
        try {
            amenities = JSON.parse(req.body.amenities || '[]');
        } catch (e) {
            console.error('Error parsing amenities:', e);
        }

        const images = req.files ? req.files.map(file => `/assets/${file.filename}`) : [];

        const newRoom = await Room.create({
            hotel: hotel._id,
            roomType: req.body.roomType,
            pricePerNight: Number(req.body.pricePerNight),
            amenities: amenities,
            images: images.length ? images : ['/assets/roomImg1.png']
        });

        res.json(newRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all rooms
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find().populate('hotel').lean();
        for (let room of rooms) {
            if (room.hotel && room.hotel.owner) {
                const owner = await User.findById(room.hotel.owner).lean();
                room.hotel.owner = owner;
            }
        }
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get hotel by ID
router.get('/hotels/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id).lean();
        if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
        
        if (hotel.owner) {
            const owner = await User.findById(hotel.owner).lean();
            hotel.owner = owner;
        }
        res.json(hotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get room by ID
router.get('/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate('hotel').lean();
        if (!room) return res.status(404).json({ error: 'Room not found' });
        
        if (room.hotel && room.hotel.owner) {
            const owner = await User.findById(room.hotel.owner).lean();
            room.hotel.owner = owner;
        }
        res.json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update room by ID
router.put('/rooms/:id', async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('room').populate('hotel').populate('user').lean();
        for (let booking of bookings) {
            if (booking.room && booking.room.hotel) {
                const hotel = await Hotel.findById(booking.room.hotel).lean();
                booking.room.hotel = hotel;
            }
        }
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get dashboard stats
router.get('/dashboard', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('room').populate('hotel').populate('user').lean();
        for (let booking of bookings) {
            if (booking.room && booking.room.hotel) {
                const hotel = await Hotel.findById(booking.room.hotel).lean();
                booking.room.hotel = hotel;
            }
        }
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
        res.json({ totalBookings, totalRevenue, bookings });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete room
router.delete('/rooms/:id', async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: 'Room deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add booking
router.post('/bookings', async (req, res) => {
    try {
        const { clerkId, username, email, image, room, hotel, checkInDate, checkOutDate, totalPrice, guests, paymentMethod } = req.body;
        
        // Find or create user
        let user;
        if (clerkId) {
            user = await User.findOne({ clerkId });
            if (!user) {
                user = await User.create({
                    clerkId,
                    username: username || 'Guest',
                    email: email || `${clerkId}@clerk.com`,
                    image: image || '',
                    role: 'user'
                });
            }
        } else {
            user = await User.findOne(); // Fallback for dummy
        }

        const booking = await Booking.create({
            user: user._id,
            room,
            hotel,
            checkInDate,
            checkOutDate,
            totalPrice,
            guests,
            paymentMethod: paymentMethod || 'Stripe',
            status: 'confirmed',
            isPaid: true
        });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update booking payment
router.put('/bookings/:id/pay', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, { isPaid: true }, { new: true });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- REVIEWS ROUTES ---

// Add a new review
router.post('/reviews', async (req, res) => {
    try {
        const { clerkId, roomId, hotelId, rating, comment } = req.body;
        
        // Find user
        const user = await User.findOne({ clerkId });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Verify if user paid for this room
        const hasPaidBooking = await Booking.findOne({
            user: user._id,
            room: roomId,
            isPaid: true
        });

        // Review is verified only if they have a paid booking
        const isVerified = !!hasPaidBooking;

        const newReview = await Review.create({
            user: user._id,
            room: roomId,
            hotel: hotelId,
            rating,
            comment,
            isVerified
        });

        res.json(newReview);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get verified reviews
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ isVerified: true })
            .populate('user', 'username image')
            .sort({ createdAt: -1 })
            .limit(10)
            .lean();
            
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete booking
router.delete('/bookings/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
