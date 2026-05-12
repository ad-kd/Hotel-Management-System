import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import assets from '../assets/assets'
import { useNotify } from '../context/NotificationContext'

const Contact = () => {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const { notify } = useNotify()

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch(`http://localhost:5000/api/hotels/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setHotel(data)
        }
      })
      .catch(err => console.error(err))
  }, [id])

  if (!hotel) return (
    <div className='flex items-center justify-center min-h-[60vh]'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
    </div>
  )

  return (
    <div className='py-28 md:py-35 px-4 md:px-6 lg:px-24 xl:px-32 bg-[#fafafa] min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        
        {/* Header Section */}
        <div className='text-center mb-20 space-y-4'>
          <h1 className='text-4xl md:text-6xl font-playfair text-gray-900'>Contact {hotel.name}</h1>
          <div className='w-24 h-1 bg-primary mx-auto rounded-full'></div>
          <p className='text-gray-500 text-lg max-w-2xl mx-auto font-inter'>
            Have specific requests or questions about your upcoming stay? Our team is here to ensure your experience is nothing short of extraordinary.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-16 items-start'>
          
          {/* Left Column: Info & Map Placeholder */}
          <div className='lg:col-span-5 space-y-12'>
            
            {/* Contact Details Cards */}
            <div className='bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100'>
              <h2 className='text-2xl font-playfair mb-10 text-gray-800'>Contact Details</h2>
              
              <div className='space-y-10'>
                <div className='flex items-start gap-6 group'>
                  <div className='bg-orange-50 p-4 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                    <img src={assets.locationIcon} alt="Location" className='w-6 h-6 group-hover:invert'/>
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>Location</h3>
                    <p className='text-gray-500 leading-relaxed'>{hotel.address}, {hotel.city}</p>
                  </div>
                </div>

                <div className='flex items-start gap-6 group'>
                  <div className='bg-orange-50 p-4 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>Phone</h3>
                    <p className='text-gray-500 leading-relaxed font-medium'>{hotel.contact}</p>
                  </div>
                </div>

                <div className='flex items-start gap-6 group'>
                  <div className='bg-orange-50 p-4 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>Email</h3>
                    <p className='text-gray-500 leading-relaxed'>{hotel.owner?.email || 'reception@' + hotel.name.toLowerCase().split(' ')[0] + '.com'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className='bg-gray-900 text-white p-10 rounded-3xl overflow-hidden relative group'>
              <div className='absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700'></div>
              <h3 className='font-playfair text-xl mb-8 relative z-10'>Your Luxury Host</h3>
              <div className='flex items-center gap-6 relative z-10'>
                <img 
                    src={hotel.owner?.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200"} 
                    alt="Owner" 
                    className='w-20 h-20 rounded-2xl object-cover ring-4 ring-white/10'
                />
                <div>
                  <p className='font-semibold text-xl'>{hotel.owner?.username || 'Executive Manager'}</p>
                  <p className='text-primary/80 font-medium'>Verified Hotelier</p>
                  <div className='flex gap-1 mt-2'>
                    {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-4 h-4 text-orange-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className='lg:col-span-7'>
            <div className='bg-white p-10 md:p-14 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100'>
              <h2 className='text-3xl font-playfair mb-8 text-gray-900'>Send a Private Message</h2>
              <form onSubmit={(e) => {
                e.preventDefault()
                notify({
                  type: 'success',
                  title: 'Inquiry Sent',
                  message: 'Your message has been successfully transmitted to the hotel management.'
                })
              }} className='space-y-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <div className='space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 ml-1'>Full Name</label>
                    <input type="text" className='w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white transition-all duration-300' placeholder='Enter your name' required />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 ml-1'>Email Address</label>
                    <input type="email" className='w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white transition-all duration-300' placeholder='Your email' required />
                  </div>
                </div>
                
                <div className='space-y-2'>
                  <label className='text-sm font-semibold text-gray-700 ml-1'>Topic of Inquiry</label>
                  <select className='w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white transition-all duration-300 appearance-none'>
                    <option>Room Booking & Availability</option>
                    <option>Special Events & Functions</option>
                    <option>Concierge & Transport</option>
                    <option>Other Services</option>
                  </select>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-semibold text-gray-700 ml-1'>Your Message</label>
                  <textarea className='w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white transition-all duration-300 h-44 resize-none' placeholder='Describe your requirements...' required></textarea>
                </div>

                <button type='submit' className='w-full bg-primary text-white font-bold py-5 rounded-2xl hover:bg-primary-dull shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer text-lg flex items-center justify-center gap-3'>
                  Deliver Message
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact
