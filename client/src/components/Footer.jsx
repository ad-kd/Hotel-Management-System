import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import assets from '../assets/assets'
import './Footer.css'
import LoginModal from './LoginModal'

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleCustomerLink = (e, path) => {
    e.preventDefault();
    if (user) {
      navigate(path);
    } else {
      openSignIn();
    }
  };

  const handleOwnerLink = (e, path) => {
    e.preventDefault();
    const token = localStorage.getItem('hotelOwnerToken');
    if (token) {
      navigate(path);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <footer className='footer-container pt-16 px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
          
          {/* Brand Section */}
          <div className='flex flex-col gap-6'>
            <img 
              src={assets.logo} 
              alt="Madurai Mandabam Logo" 
              className='footer-brand-logo w-40' 
            />
            <p className='text-sm leading-relaxed'>
              Elevating your travel experience with handpicked luxury stays and seamless booking services worldwide. Your journey to extraordinary starts here.
            </p>
            <div className='flex items-center gap-4 mt-2'>
              <a href="#" className='social-icon-wrapper'>
                <img src={assets.instagramIcon} alt="Instagram" />
              </a>
              <a href="#" className='social-icon-wrapper'>
                <img src={assets.facebookIcon} alt="Facebook" />
              </a>
              <a href="#" className='social-icon-wrapper'>
                <img src={assets.twitterIcon} alt="Twitter" />
              </a>
              <a href="#" className='social-icon-wrapper'>
                <img src={assets.linkendinIcon} alt="LinkedIn" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='footer-heading font-playfair text-xl'>Quick Links</h4>
            <ul className='flex flex-col gap-4 text-sm'>
              <li><Link to="/" className='footer-link'>Home</Link></li>
              <li><Link to="/about" className='footer-link'>About Us</Link></li>
              <li><Link to="/rooms" className='footer-link'>Our Hotels</Link></li>
              <li><Link to="/experience" className='footer-link'>Experiences</Link></li>
              <li><a href="/my-bookings" onClick={(e) => handleCustomerLink(e, '/my-bookings')} className='footer-link'>My Bookings</a></li>
            </ul>
          </div>

          {/* Owner Portal */}
          <div>
            <h4 className='footer-heading font-playfair text-xl'>For Owners</h4>
            <ul className='flex flex-col gap-4 text-sm'>
              <li><a href="/owner" onClick={(e) => handleOwnerLink(e, '/owner')} className='footer-link'>Owner Dashboard</a></li>
              <li><a href="/owner/add-room" onClick={(e) => handleOwnerLink(e, '/owner/add-room')} className='footer-link'>Add Room</a></li>
              <li><a href="/owner/list-room" onClick={(e) => handleOwnerLink(e, '/owner/list-room')} className='footer-link'>Manage Rooms</a></li>
              <li><a href="#" className='footer-link'>Partner Help</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='footer-heading font-playfair text-xl'>Contact Us</h4>
            <ul className='flex flex-col gap-4 text-sm'>
              <li className='flex items-start gap-3'>
                <img src={assets.locationIcon} alt="Location" className='w-5 opacity-70 invert mt-1' />
                <span>123 Luxury Avenue, Resort District,<br />New York, NY 10001</span>
              </li>
              <li className='flex items-center gap-3'>
                <img src={assets.userIcon} alt="Phone" className='w-5 opacity-70 invert' />
                <span>+1 (555) 000-8888</span>
              </li>
              <li className='flex items-center gap-3'>
                <img src={assets.searchIcon} alt="Email" className='w-5 opacity-70 invert' />
                <span>reservations@maduraimandabam.com</span>
              </li>
            </ul>
            <div className='mt-8 pt-6 border-t border-white/5'>
              <p className='text-[10px] uppercase tracking-widest opacity-50 mb-2'>Support Available 24/7</p>
              <p className='text-xs font-light'>Our dedicated concierge team is always here to assist you.</p>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className='footer-bottom py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs tracking-wide uppercase'>
          <p>© {new Date().getFullYear()} Madurai Mandabam Global. All rights reserved.</p>
          <div className='flex gap-8'>
            <Link to="#" className='hover:text-white transition-colors'>Terms of Service</Link>
            <Link to="#" className='hover:text-white transition-colors'>Sitemap</Link>
            <Link to="#" className='hover:text-white transition-colors'>Privacy Policy</Link>
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        setOwnerLoggedIn={() => {}} 
        initialView="ownerLogin"
      />
    </footer>
  )
}

export default Footer