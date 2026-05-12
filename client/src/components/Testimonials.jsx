import React, { useState, useEffect } from 'react'
import Title from './Title'
import { testimonials as dummyTestimonials } from '../assets/assets'
import StarRating from './StarRating'

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/reviews');
                const data = await response.json();
                if (data && data.length > 0) {
                    setReviews(data);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, []);

    const displayReviews = reviews.length > 0 ? reviews : dummyTestimonials;

    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-primary/5 py-20 pt-1 pb-30 mt-2'>
            <Title title='What Our Guests Say' subTitle='Discover why discerning travelers consistently
        choose Madurai Mandabam for their exclusive and luxurious accommodations around the world.'/>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-20 ">

                {displayReviews.map((testimonial, index) => (

                    <div key={testimonial._id || testimonial.id || index} className="bg-white p-6 rounded-xl shadow max-w-xs w-full min-h-[220px]">

                        <div className="flex items-center gap-3">

                            <img className="w-12 h-12 rounded-full object-cover" 
                                 src={testimonial.user?.image || testimonial.image || 'https://via.placeholder.com/150'} 
                                 alt={testimonial.user?.username || testimonial.name || 'User'} />

                            <div>

                                <p className="font-playfair text-xl">{testimonial.user?.username || testimonial.name}</p>

                                <p className="text-gray-500 text-sm">Verified Guest ✓</p>

                            </div>

                        </div>

                        <div className="flex items-center gap-1 mt-4">

                            <StarRating rating={testimonial.rating} />

                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 text-sm line-clamp-4">"{testimonial.comment || testimonial.review}"</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonials