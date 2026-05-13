import React, { useState } from 'react'
import Title from '../../components/Title'
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useNotify } from '../../context/NotificationContext'
import API_URL from '../../config'

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })
  const [inputs, setInputs] = useState({
    hotelName: '',
    hotelLocation: '',
    roomType:'',
    pricePerNight: 0,
    offer: 0,
    amenities: {
      'Free Wi-Fi': false,
      'Free Breakfast': false,
      'Free Service': false,
      'Mountain View': false,
      'Pool Access': false
    }
  })
  
  const navigate = useNavigate();
  const { notify } = useNotify();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('hotelName', inputs.hotelName);
    formData.append('hotelLocation', inputs.hotelLocation);
    formData.append('roomType', inputs.roomType);
    formData.append('pricePerNight', inputs.pricePerNight);
    formData.append('offer', inputs.offer);
    
    const selectedAmenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key]);
    formData.append('amenities', JSON.stringify(selectedAmenities));
    
    Object.keys(images).forEach(key => {
      if (images[key]) {
        formData.append('images', images[key]);
      }
    });

    try {
      const response = await fetch(`${API_URL}/api/rooms`, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        notify({
          type: 'success',
          title: 'Room Added',
          message: 'The room has been added successfully!',
          onConfirm: () => navigate('/owner/list-room')
        });
      } else {
        notify({
          type: 'error',
          title: 'Addition Failed',
          message: 'There was an error adding the room.'
        });
      }
    } catch (error) {
      console.error(error);
      notify({
        type: 'error',
        title: 'Error',
        message: 'An unexpected error occurred while adding the room.'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title align='left' font='outfit' title='Add Room' subTitle='Fill in the details carefully and accurate
       room details, pricing, and amenities, to enhance the user booking experience.'/>

       {/* upload area for images */}

       <p className='text-gray-800 mt-10'>Images</p>
       <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key)=>(
          <label htmlFor={`roomImage${key}`} key={key}>
            <img className='max-h-13 cursor-pointer opacity-80'
            src={images[key] ? URL.createObjectURL(images[key]): assets.uploadArea} alt="" />
            <input type="file" accept='image/*' id={`roomImage${key}`} hidden 
            onChange={e => setImages({...images, [key]: e.target.files[0]})}/>
          </label>
        ))}
       </div>

       <div className='flex w-full max-sm:flex-col sm:gap-4 mt-4'>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Hotel Name</p>
          <input type="text" placeholder='e.g., Grand Plaza Hotel' className='border border-gray-300 mt-1 rounded p-2 w-full'
            value={inputs.hotelName} onChange={e=> setInputs({...inputs, hotelName:e.target.value})} required/>
        </div>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Hotel Location</p>
          <input type="text" placeholder='e.g., Downtown, NY' className='border border-gray-300 mt-1 rounded p-2 w-full'
            value={inputs.hotelLocation} onChange={e=> setInputs({...inputs, hotelLocation:e.target.value})} required/>
        </div>
       </div>

       <div className='flex w-full max-sm:flex-col sm:gap-4 mt-4'>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Room Type</p>
          <select value={inputs.roomType} onChange={e=>setInputs({...inputs, roomType: e.target.value})}
            className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxuary Room">Luxuary Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        <div>
          <p className='mt-4 text-gray-800'>
            Price <span className='text-xs'>/night</span>
          </p>
          <input type="number" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24'
          value={inputs.pricePerNight} onChange={e=> setInputs({...inputs, pricePerNight:e.target.value})}/>
        </div>
        <div>
          <p className='mt-4 text-gray-800'>
            Offer <span className='text-xs'>(%)</span>
          </p>
          <input type="number" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24'
          value={inputs.offer} onChange={e=> setInputs({...inputs, offer:e.target.value})}/>
        </div>
       </div>

       <p className='text-gray-800 mt-4'>Amenities</p>
       <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
        {Object.keys(inputs.amenities).map((amenity, index)=>(
          <div key={index}>
            <input type="checkbox" id={`amenities${index+1}`} checked={inputs.amenities[amenity]} 
            onChange={()=>setInputs({...inputs, amenities: {...inputs.amenities, [amenity]: !inputs.amenities[amenity]}})} />
            <label htmlFor={`amenities${index+1}`}>  {amenity}</label>
          </div>
        ))}
       </div>
       <button className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer'>
        Add Room
       </button>
    </form>
  )
}

export default AddRoom