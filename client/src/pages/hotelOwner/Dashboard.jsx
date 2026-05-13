import React, { useState } from 'react'
import Title from '../../components/Title'
import assets from '../../assets/assets'
import API_URL from '../../config'

const Dashboard = () => {

  const[dashboardData, setDashboardData]= useState({ totalBookings: 0, totalRevenue: 0, bookings: [] })

  React.useEffect(() => {
    fetch(`${API_URL}/api/dashboard`)
      .then(res => res.json())
      .then(data => setDashboardData(data))
      .catch(err => console.error(err));
  }, []);


  const handleDeleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await fetch(`${API_URL}/api/bookings/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Update local state after successful deletion
          setDashboardData(prev => ({
            ...prev,
            totalBookings: prev.totalBookings - 1,
            bookings: prev.bookings.filter(b => b._id !== id)
          }));
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  return (
    <div>
      <Title align='left' font='outfit' title='Dashboard' subTitle='Monitor your 
      room listings, track bookings and analyze revenue-all in one place. Stay updated
      with real-time insights to ensure smooth operations.'/>

      <div className='flex flex-col sm:flex-row gap-4 my-8'>
          {/* Total Booking */}
          <div className='bg-primary/5 border border-primary/10 rounded-xl flex p-6 shadow-sm'>
            <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-12'/>
            <div className='flex flex-col sm:ml-4 font-medium'>
              <p className='text-primary text-lg'>Total Bookings</p>
              <p className='text-gray-600 text-2xl font-bold'>{dashboardData.totalBookings}</p>
            </div>
          </div>
          {/* Total Revenue */}
          <div className='bg-primary/5 border border-primary/10 rounded-xl flex p-6 shadow-sm'>
            <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-12'/>
            <div className='flex flex-col sm:ml-4 font-medium'>
              <p className='text-primary text-lg'>Total Revenue</p>
              <p className='text-gray-600 text-2xl font-bold'>$ {dashboardData.totalRevenue}</p>
            </div>
          </div>
      </div>

    {/* Recent Bookings */}
    <div className="flex items-center justify-between mb-6">
      <h2 className='text-2xl text-gray-800 font-bold'>Recent Bookings</h2>
      <span className="text-sm text-gray-500 font-medium">{dashboardData.bookings.length} Bookings Total</span>
    </div>

    <div className='w-full max-w-5xl text-left border border-gray-200 rounded-2xl shadow-sm bg-white overflow-hidden'>
      <div className="overflow-x-auto">
        <table className='w-full'>
          <thead className='bg-gray-50 border-b border-gray-100'>
            <tr>
              <th className='py-4 px-6 text-gray-600 font-semibold text-sm'>User</th>
              <th className='py-4 px-6 text-gray-600 font-semibold text-sm max-sm:hidden'>Room Type</th>
              <th className='py-4 px-6 text-gray-600 font-semibold text-sm text-center'>Amount</th>
              <th className='py-4 px-6 text-gray-600 font-semibold text-sm text-center'>Status</th>
              <th className='py-4 px-6 text-gray-600 font-semibold text-sm text-center'>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-50'>
            {dashboardData.bookings.map((item, index)=>(
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className='py-4 px-6 text-gray-700 font-medium'>
                  {item.user?.username || 'Guest'}
                </td>

                <td className='py-4 px-6 text-gray-500 text-sm max-sm:hidden'>
                  {item.room?.roomType || 'Standard Room'}
                </td>

                <td className='py-4 px-6 text-gray-800 font-bold text-center'>
                $ {item.totalPrice}
                </td>

                <td className='py-4 px-6 text-center'>
                  <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full ${item.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {item.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </td>

                <td className='py-4 px-6 text-center'>
                  <button 
                    onClick={() => handleDeleteBooking(item._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-lg group"
                    title="Delete Booking"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    </div>
  )
}

export default Dashboard