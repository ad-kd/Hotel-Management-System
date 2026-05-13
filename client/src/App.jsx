import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home.jsx'
import Footer from './components/Footer.jsx'
import AllRooms from './pages/AllRooms.jsx'
import RoomDetails from './pages/RoomDetails.jsx'
import MyBookings from './pages/MyBookings.jsx'
import HotelReg from './components/HotelReg.jsx'
import About from './pages/about.jsx'
import Experience from './pages/Experience.jsx'
import Layout from './pages/hotelOwner/Layout.jsx'
import Dashboard from './pages/hotelOwner/Dashboard.jsx'
import AddRooms from './pages/hotelOwner/AddRoom.jsx'
import ListRooms from './pages/hotelOwner/ListRoom.jsx'
import WriteReview from './pages/WriteReview.jsx'
import Contact from './pages/Contact.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'


const App = () => {

  const isOwnerPath = useLocation().pathname.includes('owner'); 

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path='/'element={<Home />}/>
          <Route path='/rooms'element={<AllRooms />}/>
          <Route path='/rooms/:id'element={<RoomDetails />}/>
          <Route path='/my-bookings'element={<MyBookings />}/>
          <Route path='/about'element={<About />}/>
          <Route path='/experience' element={<Experience />}/>
          <Route path='/write-review' element={<WriteReview />}/>
          <Route path='/contact/:id' element={<Contact />}/>
          <Route path='/terms' element={<TermsOfService />}/>
          <Route path='/privacy' element={<PrivacyPolicy />}/>
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRooms />} />
            <Route path='list-room' element={<ListRooms />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App