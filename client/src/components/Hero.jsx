import React, { useState } from 'react'
import assets, { cities } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        destination: '',
        checkIn: '',
        checkOut: '',
        guests: 1
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSearchData(prev => ({ ...prev, [id]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        if (searchData.destination) queryParams.append('search', searchData.destination);
        if (searchData.checkIn) queryParams.append('checkIn', searchData.checkIn);
        if (searchData.checkOut) queryParams.append('checkOut', searchData.checkOut);
        if (searchData.guests) queryParams.append('guests', searchData.guests);

        navigate(`/rooms?${queryParams.toString()}`);
    };

    return (
        <div className='relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white h-screen overflow-hidden'>
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/src/assets/heroImage.png"
                    alt="Madurai Mandabam Hero"
                    className="w-full h-full object-cover animate-ken-burns"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative z-10 animate-in fade-in slide-in-from-left duration-1000">
                <p className='bg-secondary/40 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full w-fit text-sm font-medium tracking-wide'>
                    The Ultimate Hotel Experience
                </p>
                <h1 className='font-playfair text-4xl md:text-6xl lg:text-[72px] lg:leading-[80px] font-bold max-w-2xl mt-6'>
                    Discover Your Perfect <span className="text-secondary">Destination</span>
                </h1>
                <p className='max-w-xl mt-4 text-base md:text-lg text-white/80 leading-relaxed'>
                    Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
                </p>
            </div>

            {/* Search Bar */}
            <form 
                onSubmit={handleSearch}
                className='relative z-10 bg-white/95 backdrop-blur-sm text-gray-700 rounded-2xl shadow-2xl p-2 md:p-4 mt-12 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full max-w-5xl animate-in fade-in slide-in-from-bottom duration-1000 delay-300'
            >
                {/* Destination */}
                <div className='flex-1 group px-4 py-2 hover:bg-gray-50 rounded-xl transition-all'>
                    <div className='flex items-center gap-2 mb-1'>
                        <img src={assets.locationIcon} alt="location icon" className='h-4 opacity-60' />
                        <label htmlFor="destination" className="text-xs font-bold uppercase tracking-wider text-gray-400">Destination</label>
                    </div>
                    <input
                        list='destinations'
                        id="destination"
                        type="text"
                        value={searchData.destination}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-gray-300"
                        placeholder="Where are you going?"
                        required
                    />
                    <datalist id='destinations'>
                        {cities.map((city, index) => (
                            <option key={index} value={city} />
                        ))}
                    </datalist>
                </div>

                <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                {/* Check In */}
                <div className='flex-1 group px-4 py-2 hover:bg-gray-50 rounded-xl transition-all'>
                    <div className='flex items-center gap-2 mb-1'>
                        <img src={assets.calenderIcon} alt="calender icon" className='h-4 opacity-60' />
                        <label htmlFor="checkIn" className="text-xs font-bold uppercase tracking-wider text-gray-400">Check in</label>
                    </div>
                    <input
                        id="checkIn"
                        type="date"
                        value={searchData.checkIn}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-sm font-medium outline-none"
                    />
                </div>

                <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                {/* Check Out */}
                <div className='flex-1 group px-4 py-2 hover:bg-gray-50 rounded-xl transition-all'>
                    <div className='flex items-center gap-2 mb-1'>
                        <img src={assets.calenderIcon} alt="calender icon" className='h-4 opacity-60' />
                        <label htmlFor="checkOut" className="text-xs font-bold uppercase tracking-wider text-gray-400">Check out</label>
                    </div>
                    <input
                        id="checkOut"
                        type="date"
                        value={searchData.checkOut}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-sm font-medium outline-none"
                    />
                </div>

                <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                {/* Guests */}
                <div className='flex-1 group px-4 py-2 hover:bg-gray-50 rounded-xl transition-all'>
                    <div className='flex items-center gap-2 mb-1'>
                        <img src={assets.userIcon} alt="guests icon" className='h-4 opacity-60' />
                        <label htmlFor="guests" className="text-xs font-bold uppercase tracking-wider text-gray-400">Guests</label>
                    </div>
                    <input
                        id="guests"
                        type="number"
                        min={1}
                        max={10}
                        value={searchData.guests}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-sm font-medium outline-none"
                        placeholder="1"
                    />
                </div>

                {/* Search Button */}
                <button 
                    type="submit"
                    className='bg-secondary hover:bg-secondary/90 text-white p-4 md:px-8 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-secondary/20'
                >
                    <img src={assets.searchIcon} alt="searchIcon" className='h-5 invert' />
                    <span className="font-bold tracking-wide">Search</span>
                </button>
            </form>
        </div>
    )
}

export default Hero