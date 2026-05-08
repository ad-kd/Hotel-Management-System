const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Hotel = require('./models/Hotel');
const Room = require('./models/Room');
const Booking = require('./models/Booking');

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany();
        await Hotel.deleteMany();
        await Room.deleteMany();
        await Booking.deleteMany();

        console.log('Cleared existing data');

        // Create User
        const user = await User.create({
            clerkId: "user_2unqyL4diJFP1E3pIBnasc7w8hP",
            username: "Great Stack",
            email: "user.greatstack@gmail.com",
            image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
            role: "hotelOwner",
            recentSearchedCities: ["New York"]
        });

        console.log('User created');

        // Create Hotel
        const hotel = await Hotel.create({
            name: "Urbanza Suites",
            address: "Main Road 123 Street, 23 Colony",
            contact: "+0123456789",
            owner: user._id,
            city: "New York"
        });

        console.log('Hotel created');

        // Create Rooms
        const rooms = await Room.insertMany([
            {
                hotel: hotel._id,
                roomType: "Double Bed",
                pricePerNight: 399,
                amenities: ["Room Service", "Mountain View", "Pool Access"],
                images: ["/assets/roomImg1.png", "/assets/roomImg2.png", "/assets/roomImg3.png", "/assets/roomImg4.png"],
                isAvailable: true
            },
            {
                hotel: hotel._id,
                roomType: "Double Bed",
                pricePerNight: 299,
                amenities: ["Room Service", "Mountain View", "Pool Access"],
                images: ["/assets/roomImg2.png", "/assets/roomImg3.png", "/assets/roomImg4.png", "/assets/roomImg1.png"],
                isAvailable: true
            },
            {
                hotel: hotel._id,
                roomType: "Double Bed",
                pricePerNight: 249,
                amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
                images: ["/assets/roomImg3.png", "/assets/roomImg4.png", "/assets/roomImg1.png", "/assets/roomImg2.png"],
                isAvailable: true
            },
            {
                hotel: hotel._id,
                roomType: "Single Bed",
                pricePerNight: 199,
                amenities: ["Free WiFi", "Room Service", "Pool Access"],
                images: ["/assets/roomImg4.png", "/assets/roomImg1.png", "/assets/roomImg2.png", "/assets/roomImg3.png"],
                isAvailable: true
            }
        ]);

        console.log('Rooms created');

        // Create Bookings
        await Booking.insertMany([
            {
                user: user._id,
                room: rooms[1]._id,
                hotel: hotel._id,
                checkInDate: new Date("2025-04-30T00:00:00.000Z"),
                checkOutDate: new Date("2025-05-01T00:00:00.000Z"),
                totalPrice: 299,
                guests: 1,
                status: "pending",
                paymentMethod: "Stripe",
                isPaid: true
            },
            {
                user: user._id,
                room: rooms[0]._id,
                hotel: hotel._id,
                checkInDate: new Date("2025-04-27T00:00:00.000Z"),
                checkOutDate: new Date("2025-04-28T00:00:00.000Z"),
                totalPrice: 399,
                guests: 1,
                status: "pending",
                paymentMethod: "Pay At Hotel",
                isPaid: false
            }
        ]);

        console.log('Bookings created');
        console.log('Database successfully seeded!');
        process.exit();
    } catch (error) {
        console.error('Error with data import', error);
        process.exit(1);
    }
};

seedData();
