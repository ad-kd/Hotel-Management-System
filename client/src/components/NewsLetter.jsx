import React, { useState } from 'react'
import Title from './Title'
import assets from '../assets/assets'

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            // Reset message after 5 seconds
            setTimeout(() => setSubscribed(false), 5000);
        }
    }

    return (
        <div id="newsletter">
            <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-gray-900 text-white mt-2 relative overflow-hidden">
                {/* Background decorative element */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

                <Title title='Stay Inspired' subTitle='Join our newsletter and be the first to discover new destinations, exclusive offers, and travel Inspiration.' />

                {subscribed ? (
                    <div className="mt-8 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                        <div className="bg-green-500/20 text-green-400 px-6 py-3 rounded-full border border-green-500/30 flex items-center gap-2">
                            <span className="text-xl">✓</span>
                            <span className="font-medium">Thank you for subscribing!</span>
                        </div>
                        <p className="text-gray-400 mt-2 text-sm text-center">We'll keep you updated with our latest offers.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 w-full max-w-md">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white/10 px-4 py-3 border border-white/20 rounded-lg outline-none w-full focus:border-secondary transition-all"
                            placeholder="Enter your email"
                        />

                        <button type="submit" className="flex items-center justify-center gap-2 group bg-secondary hover:bg-secondary/90 px-8 py-3 rounded-lg active:scale-95 transition-all text-white font-medium whitespace-nowrap">
                            Subscribe
                            <img src={assets.arrowIcon} alt="arrow-icon" className='w-3.5 invert group-hover:translate-x-1 transition-all' />
                        </button>
                    </form>
                )}

                <p className="text-gray-500 mt-6 text-xs text-center">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
            </div>
        </div>
    )
}

export default NewsLetter