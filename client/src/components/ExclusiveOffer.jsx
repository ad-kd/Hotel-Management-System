import React from 'react'
import Title from './Title'
import assets, { exclusiveOffers } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const ExclusiveOffer = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pb-30 pt-0.5' id="offers">
            <div className='flex flex-col md:flex-row items-center justify-between w-full'>
                <Title align='left' title='Exclusive Offers' subTitle='Take advantages of our limited-time offers 
                and special packages to enhance your stay and create unforgettable memories.' />

                <button 
                    onClick={() => navigate('/rooms')}
                    className='group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12 bg-gray-100 hover:bg-gray-200 px-6 py-2.5 rounded-full transition-all'
                >
                    View All Offers 
                    <img src={assets.arrowIcon} alt="arrow-icon" className='group-hover:translate-x-1 transition-all' />
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full'>
                {exclusiveOffers.map((item) => (
                    <div 
                        key={item._id} 
                        className='group relative flex flex-col items-start justify-end gap-1 h-[400px] p-6 rounded-2xl text-white overflow-hidden cursor-pointer'
                        onClick={() => navigate('/rooms')}
                    >
                        {/* Background Image with Overlay */}
                        <div 
                            className='absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-700 group-hover:scale-110' 
                            style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent'></div>

                        {/* Discount Badge */}
                        <p className='px-4 py-1.5 absolute top-6 left-6 text-xs bg-secondary text-white font-bold rounded-full shadow-lg z-10'>
                            {item.priceOff}% OFF
                        </p>

                        {/* Content */}
                        <div className='relative z-10 w-full transform transition-transform duration-300 group-hover:-translate-y-2'>
                            <p className='text-2xl font-semibold font-playfair mb-2'>{item.title}</p>
                            <p className='text-sm text-white/90 line-clamp-2 mb-4'>{item.description}</p>
                            
                            <div className='flex items-center justify-between mt-auto'>
                                <p className='text-xs font-medium text-white/70'>Expires {item.expiryDate}</p>
                                <button className='flex items-center gap-2 font-semibold text-sm hover:text-secondary transition-colors'>
                                    Claim Offer <img className='invert w-3 group-hover:translate-x-1 transition-all' src={assets.arrowIcon} alt="arrow-icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExclusiveOffer