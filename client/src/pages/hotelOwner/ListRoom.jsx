import React, { useState } from 'react'

import Title from '../../components/Title'
import { useNotify } from '../../context/NotificationContext'
import API_URL from '../../config'

const ListRoom = () => {
  const [rooms, setRooms] = useState([])
  const { notify } = useNotify();

  const fetchRooms = () => {
    fetch(`${API_URL}/api/rooms`)
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error(err));
  };

  React.useEffect(() => {
    fetchRooms();
  }, []);

  const toggleAvailability = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/rooms/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isAvailable: !currentStatus })
      });
      if (response.ok) {
        setRooms(prevRooms => prevRooms.map(room => room._id === id ? { ...room, isAvailable: !currentStatus } : room));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRoom = async (id) => {
    notify({
      type: 'confirm',
      title: 'Delete Room',
      message: 'Are you sure you want to delete this room? This action cannot be undone.',
      onConfirm: async () => {
        try {
          const response = await fetch(`${API_URL}/api/rooms/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            fetchRooms();
            notify({
              type: 'success',
              title: 'Deleted',
              message: 'Room deleted successfully.'
            });
          }
        } catch (err) {
          console.error(err);
          notify({
            type: 'error',
            title: 'Error',
            message: 'Failed to delete room.'
          });
        }
      }
    });
  };

  return (
    <div>
      <Title align='left' font='outfit' title='Room Listing'
        subTitle='View, edit, or manage all listed rooms. Keep the Information up-to-date to provide the 
      best experiance for users.' />

      <p className='text-gray-500 mt-8'>All Rooms</p>

      <div className='w-full mt-3 max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
              <th className='py-3 px-4 text-gray-800 font-medium'>Price / night</th>
              <th className='py-3 px-4 text-gray-800 font-medium'>Offer (%)</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {
              rooms.map((item, index) => (
                <tr key={index}>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                    {item.roomType}
                  </td>

                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                    {item.amenities.join(', ')}
                  </td>

                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                    ${item.pricePerNight}
                  </td>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                    {item.offer}%
                  </td>

                  <td className='py-3 px-4 border-t text-sm text-red-500 text-center border-gray-300'>
                    <div className='flex items-center justify-center gap-4'>
                      <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                        <input type="checkbox" className='sr-only peer' checked={item.isAvailable} onChange={() => toggleAvailability(item._id, item.isAvailable)} />
                        <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600
                      transition-colors duration-200'></div>
                        <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform
                          duration-200 ease-in-out peer-checked:translate-x-5'></span>

                      </label>
                      <button onClick={() => deleteRoom(item._id)} className='text-red-500 hover:text-red-700 cursor-pointer bg-red-100 px-3 py-1 rounded'>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListRoom