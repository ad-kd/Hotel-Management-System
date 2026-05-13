import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import assets, { facilityIcons, roomCommonData } from '../assets/assets'
import StarRating from '../components/StarRating.jsx'
import { useNotify } from '../context/NotificationContext'

const RoomDetails = () => {

  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);

  const { user } = useUser();
  const { openSignIn } = useClerk();
  const { notify } = useNotify();

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      return openSignIn();
    }
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    const timeDiff = outDate.getTime() - inDate.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (days <= 0) {
      notify({
        type: 'error',
        title: 'Invalid Dates',
        message: 'Check-Out date must be after Check-In date.'
      });
      return;
    }

    const discountedPrice = room.offer > 0 ? room.pricePerNight * (1 - room.offer / 100) : room.pricePerNight;
    const totalPrice = days * discountedPrice * guests;

    notify({
      type: 'confirm',
      title: 'Confirm Payment',
      message: `Proceed with payment of $${totalPrice}?`,
      onConfirm: async () => {
        try {
          const response = await fetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              clerkId: user.id,
              username: user.fullName || user.username || 'Guest',
              email: user.primaryEmailAddress?.emailAddress || '',
              image: user.imageUrl || '',
              room: room._id,
              hotel: room.hotel._id,
              checkInDate,
              checkOutDate,
              totalPrice,
              guests,
              paymentMethod: 'Stripe',
              offerApplied: room.offer
            })
          });
          if (response.ok) {
            notify({
              type: 'success',
              title: 'Booking Confirmed!',
              message: 'Your stay has been booked successfully. Redirecting to your bookings...',
              onConfirm: () => navigate('/my-bookings')
            });
          } else {
            notify({
              type: 'error',
              title: 'Booking Failed',
              message: 'There was an error making your booking. Please try again.'
            });
          }
        } catch (err) {
          console.error(err);
          notify({
            type: 'error',
            title: 'Error',
            message: 'An unexpected error occurred.'
          });
        }
      }
    });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/rooms/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setRoom(data);
          setMainImage(data.images[0]);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  return room && (

    <div className='py-28 md:py-35 px-4 md:px-6 lg:px-24 xl:px-32'>
      {/* Room Details */}

      <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
        <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name}
          <span className='font-inner text-sm ml-2'>({room.roomType})</span></h1>
        {room.offer > 0 && (
          <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>{room.offer}% OFF</p>
        )}
      </div>

      {/* room rating */}
      <div className='flex items-center gap-1 mt-2'>
        <StarRating />
        <p className='ml-2'>200+ reviews</p>
      </div>

      {/* Room Address */}

      <div className='flex items-center gap-1 text-gray-500'>
        <img src={assets.locationIcon} alt="Location-Icon" />
        <span>{room.hotel.address}</span>
      </div>

      {/* Room Images */}
      <div className='flex flex-col lg:flex-row gap-6 mt-6'>
        <div className='lg:w-1/2 w-full'>
          <img src={mainImage} alt="Room-Image" className='w-full rounded-xl shadow-lg object-cover' />
        </div>
        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
          {room?.images.length > 1 && room.images.map((image, index) => (
            <img onClick={() => setMainImage(image)}
              key={index} src={image} alt="Room Image"
              className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`} />
          ))}
        </div>
      </div>

      {/* Room Highlights */}

      <div className='flex flex-col md:flex-row md:justify-between mt-10'>
        <div className='flex flex-col'>
          <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxuary Like Never Before</h1>
          <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
            {room.amenities.map((item, index) => (
              <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                <p className='text-xs'>{item}</p>
              </div>
            ))}
          </div>
        </div>
        {/* room price */}
        <div className='flex items-center gap-4'>
          <p className='text-2xl font-medium'>
            ${room.offer > 0 ? (room.pricePerNight * (1 - room.offer / 100)).toFixed(2) : room.pricePerNight}/Night
          </p>
          {room.offer > 0 && (
            <p className='text-lg text-gray-400 line-through'>${room.pricePerNight}</p>
          )}
        </div>
      </div>

      {/* Checkin & CheckOut Form */}

      <form onSubmit={handleBooking} className='flex flex-col md:flex-row items-start md:items-center justify-between
       bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
        <div className='flex flex-col flex-wrap md:flex-row items-start
         md:items-center gap-4 md:gap-10 text-gray-500'>
          
          <div className='flex flex-col'>
            <label className='font-medium' htmlFor="checkInDate">Check-In</label>
            <input type="date" id='checkInDate' placeholder='Check-In'
              value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)}
              className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
          </div>
          <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
          <div className='flex flex-col'>
            <label className='font-medium' htmlFor="checkOutDate">Check-Out</label>
            <input type="date" id='checkOutDate' placeholder='Check-Out'
              value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)}
              className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
          </div>
          <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
          <div className='flex flex-col'>
            <label htmlFor='guests' className='font-medium'>Guests</label>
            <input type="number" id='guests' placeholder='0' min="1"
              value={guests} onChange={(e) => setGuests(e.target.value)}
              className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
          </div>
        </div>
        <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 text-base cursor-pointer'>
          Book Now
        </button>
      </form>

      {/* Common Specification */}

      <div className='mt-25 space-y-4'>
        {roomCommonData.map((spec, index)=>(
          <div key={index} className='flex items-start gap-2'>
            <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5'/>
            <div>
              <p className='text-base'>{spec.title}</p>
              <p className='text-gray-500'>{spec.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
        <p>Guests will be allocated on the ground floor according to availability. You get a comfortable 
          Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability.
           You get the comfortable two bedroom apartment that has a true city feeling.</p>
      </div>

      {/* Hosted By */}

      <div className='flex flex-col items-start gap-4'>
        <div className='flex gap-4'>
          <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full'/>
          <div>
            <p className='text-lg md:text-xl'>Hosted By {room.hotel.name}</p>
            <div className='flex items-center mt-1'>
              <StarRating />
              <p className='ml-2'>200+ reviews</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => {
            const customerName = user?.fullName || user?.username || 'Valued Guest';
            const subject = encodeURIComponent("To Contact the Hotel Owner");
            const body = encodeURIComponent(`Hi ${customerName}, i need to enquiry about the ${room.roomType}/${room.hotel.name}`);
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=adkd.discord@gmail.com&su=${subject}&body=${body}`;
            window.open(gmailUrl, '_blank');
          }}
          className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'
        >
          Contact Now
        </button>
      </div>

    </div>
  )
}

export default RoomDetails