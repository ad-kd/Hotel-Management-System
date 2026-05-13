import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import API_URL from '../config';

const WriteReview = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // In a real app we would fetch only bookings for this user via clerkId or email
                // But since the current api gets all bookings, we will filter them here.
                const response = await fetch(`${API_URL}/api/bookings`);
                const data = await response.json();
                
                // Filter to only show the current logged-in user's paid bookings
                const userBookings = data.filter(b => b.isPaid && b.user?.clerkId === user.id);
                setBookings(userBookings);
                
                if (userBookings.length > 0) {
                    setSelectedBooking(userBookings[0]._id);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        if (user) fetchBookings();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBooking) return setMessage("Please select a booking to review.");
        
        const booking = bookings.find(b => b._id === selectedBooking);
        if (!booking) return;

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${API_URL}/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    clerkId: user.id,
                    roomId: booking.room._id,
                    hotelId: booking.hotel._id,
                    rating,
                    comment
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                setMessage(data.isVerified ? "Review submitted and verified successfully!" : "Review submitted (Unverified).");
                setComment('');
                setTimeout(() => navigate('/'), 2000);
            } else {
                setMessage(data.error || "Failed to submit review.");
            }
        } catch (error) {
            setMessage("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div className="min-h-[60vh] flex items-center justify-center">Please log in to write a review.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-10 py-16 mt-20">
            <Title title="Write a Review" subTitle="Share your experience with others" />
            
            <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 mt-8 border border-gray-100">
                {message && (
                    <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                        {message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Select your stay</label>
                        {bookings.length > 0 ? (
                            <select 
                                value={selectedBooking} 
                                onChange={(e) => setSelectedBooking(e.target.value)}
                                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                            >
                                {bookings.map(b => (
                                    <option key={b._id} value={b._id}>
                                        {b.hotel?.name || 'Hotel'} - {b.room?.roomType || 'Room'} (Checked in: {new Date(b.checkInDate).toLocaleDateString()})
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                You don't have any paid bookings to review yet.
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`text-3xl transition-all ${rating >= star ? 'text-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-200'}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Your Review</label>
                        <textarea 
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us what you loved about your stay..."
                            required
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all resize-none"
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading || bookings.length === 0}
                        className="bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WriteReview;
