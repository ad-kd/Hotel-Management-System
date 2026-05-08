import React, { useState } from 'react'
import Title from '../components/Title'
import assets from '../assets/assets'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import BillModal from '../components/BillModal'
import { useNotify } from '../context/NotificationContext'

const MyBookings = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { notify } = useNotify();
  const [bookings, setBooking] = useState([]);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [selectedBillBooking, setSelectedBillBooking] = useState(null);

  React.useEffect(() => {
    if (user) {
      fetch('http://localhost:5000/api/bookings')
        .then(res => res.json())
        .then(data => {
          const userBookings = data.filter(booking => booking.user?.clerkId === user.id);
          userBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setBooking(userBookings);
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  const handlePayment = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}/pay`, {
        method: 'PUT'
      });
      if (response.ok) {
        setBooking(prevBookings => prevBookings.map(b => b._id === id ? { ...b, isPaid: true } : b));
        notify({
          type: 'success',
          title: 'Payment Successful',
          message: 'Your payment has been processed and your bill is now paid.'
        });
      }
    } catch (err) {
      console.error(err);
      notify({
        type: 'error',
        title: 'Payment Failed',
        message: 'There was an error processing your payment.'
      });
    }
  };

  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
      <Title title='My Bookings' subTitle='Easily manage your past, current, and upcoming hotel reservation
        in one place. Plan your trips seamlessly with just a few clicks' align='left' />

      <div className='max-w-6xl mt-8 w-full text-gray-800'>

        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300
            font-medium text-base py-3'>
          <div className='w-1/3'>Hotels</div>
          <div className='w-1/3'>Date & Timing</div>
          <div className='w-1/3'>Payment</div>
        </div>

        {bookings.map((booking) => (
          <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300
              py-6 first:border-t'>
            {/* Hotel Details */}
            <div className='flex flex-col md:flex-row'>
              <img src={booking.room?.images?.[0] || assets.roomImg1} alt="Hotel-Img"
                className=' min-md:w-44 rounded shadow object-cover' />
              <div className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>
                <p className='font-playfair text-2xl'>{booking.hotel?.name || 'Unknown Hotel'}
                  <span className='font-inner text-sm'> ({booking.room?.roomType || 'Deleted Room'})</span>
                </p>
                <div className='flex items-center gap-1 text-gray-500 text-sm'>
                  <img src={assets.locationIcon} alt="Locarion-Icon"/>
                  <span>{booking.hotel?.address || 'Unknown Address'}</span>
                </div>
                <div className='flex items-center gap-1 text-gray-500 text-sm'>
                  <img src={assets.guestsIcon} alt="Guest-Icon"/>
                  <span>Guest: {booking.guests}</span>
                </div>
                <p className='text-base'>Total: ${booking.totalPrice}</p>
              </div>
            </div>

            {/* Date & Timing */}

            <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
              <div>
                <p>Check-In: </p>
                <p className='text-gray-500 text-sm'>{new Date(booking.checkInDate).toDateString()}</p>
              </div>
              <div>
                <p>Check-Out: </p>
                <p className='text-gray-500 text-sm'>{new Date(booking.checkOutDate).toDateString()}</p>
              </div>
            </div>
            
            {/* Payment status */}
            <div className='flex flex-col items-start justify-center pt-3 gap-2'>
              <div className='flex items-center gap-2'>
                <div className={`h-3 w-3 rounded-full
                   ${booking.isPaid?"bg-green-500":"bg-red-500"}`}></div>
                   <p className={`text-sm ${booking.isPaid?"text-green-500":"text-red-500"}`}>
                    {booking.isPaid?"Paid":"Unpaid"}
                   </p>
              </div>
              
              {booking.isPaid ? (
                <div className='flex flex-col gap-2 mt-2'>
                  <button 
                    onClick={() => {
                      setSelectedBillBooking(booking);
                      setIsBillModalOpen(true);
                    }} 
                    className='px-4 py-1.5 text-xs border border-indigo-400 text-indigo-600 rounded-full hover:bg-indigo-50 transition-all cursor-pointer'
                  >
                    View Bill
                  </button>
                  <button 
                    onClick={() => navigate('/write-review')} 
                    className='px-4 py-1.5 text-xs bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all cursor-pointer'
                  >
                    Write Review
                  </button>
                </div>
              ) : (
                <button onClick={() => handlePayment(booking._id)} className='px-4 py-1.5 mt-2 text-xs border border-gray-400
                rounded-full hover:bg-gray-50 transition-all cursor-pointer'>
                  Pay Now
                </button>
              )}
            </div>

          </div>
        ))}

      </div>
      <BillModal 
        isOpen={isBillModalOpen} 
        onClose={() => setIsBillModalOpen(false)} 
        booking={selectedBillBooking} 
      />
    </div>
  )
}

export default MyBookings