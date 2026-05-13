import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import asset from '../assets/assets.js'
import { useClerk, useUser ,UserButton } from '@clerk/clerk-react';
import LoginModal from './LoginModal';


const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

const ReviewIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.322c.214.896-.71 1.523-1.483 1.05l-3.84-2.35a1 1 0 0 0-.965 0l-3.84 2.35c-.773.473-1.697-.154-1.483-1.05l1.03-4.322a1 1 0 0 0-.337-1.016l-3.33-2.723c-.699-.571-.344-1.702.556-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
    </svg>
)

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/experience' },
        { name: 'About', path: '/about' },
    ];


    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {openSignIn} = useClerk();
    const {user} = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(false);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    React.useEffect(() => {
        const token = localStorage.getItem('hotelOwnerToken');
        if (token) {
            setIsOwnerLoggedIn(true);
        }
    }, []);

    const handleOwnerLogout = () => {
        localStorage.removeItem('hotelOwnerToken');
        setIsOwnerLoggedIn(false);
        navigate('/');
    };

    React.useEffect(() => {
        const transparentPages = ['/', '/about', '/experience', '/terms', '/privacy'];
        const isTransparentPage = transparentPages.includes(location.pathname);

        setIsScrolled(!isTransparentPage || window.scrollY > 10);

        const handleScroll = () => {
            setIsScrolled(!isTransparentPage || window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/rooms?search=${searchQuery.trim()}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <>
        <nav className={`fixed top-0 left-0  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

            {/* Logo */}
            <Link to='/'>
                <img src={asset.logo} alt="Madurai Mandabam Logo" className={`h-9 ${isScrolled && 'invert opacity-80'}`} />
            </Link>

            {/* Desktop Nav */}
            <div className={`hidden md:flex items-center gap-4 lg:gap-8 transition-all duration-500 ${isSearchOpen ? 'opacity-0 invisible w-0' : 'opacity-100 visible'}`}>
                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </a>
                ))}
                {isOwnerLoggedIn && (
                    <button onClick={() => {navigate('/owner')}} className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black border-black' : 'text-white border-white'} transition-all`}>
                        Dashboard
                    </button>
                )}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4 transition-all duration-500">
                <div className={`flex items-center transition-all duration-500 ${isSearchOpen ? 'bg-gray-100/80 rounded-full px-4 py-1.5 w-64' : 'w-10'}`}>
                    <img 
                        onClick={() => setIsSearchOpen(!isSearchOpen)} 
                        src={asset.searchIcon} 
                        alt="search" 
                        className={`cursor-pointer ${isScrolled && 'invert h-7 transition-all duration-500'}`} 
                    />
                    {isSearchOpen && (
                        <input 
                            autoFocus
                            type="text" 
                            placeholder="Search by city..." 
                            className="bg-transparent border-none outline-none ml-2 w-full text-sm text-gray-800"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            onBlur={() => !searchQuery && setIsSearchOpen(false)}
                        />
                    )}
                </div>
                
                {user ? 
                (<UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label='My Bookings' labelIcon={<BookIcon/>} onClick={()=> navigate('/my-bookings')} />
                        <UserButton.Action label='Write Review' labelIcon={<ReviewIcon/>} onClick={()=> navigate('/write-review')} />
                    </UserButton.MenuItems>
                </UserButton>)
                : isOwnerLoggedIn ?
                (<button onClick={handleOwnerLogout} className="group px-8 py-2.5 bg-red-600 rounded-lg text-white cursor-pointer active:scale-95 transition duration-300 hover:bg-red-700">
                    Logout
                </button>)
                :
                (<button onClick={() => setIsLoginModalOpen(true)} className="group px-8 py-2.5 bg-primary rounded-lg text-white cursor-pointer active:scale-95 transition duration-300 hover:bg-primary/90">
                    <p className="relative h-6 overflow-hidden">
                        <span className="block transition-transform duration-300 group-hover:-translate-y-full">Login</span>
                        <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:translate-y-[-100%]">Login</span>
                    </p>
                </button>)}
            </div>

            {/* Mobile Menu Button */}
            


            <div className="flex items-center gap-3 md:hidden">
                <img 
                    onClick={() => setIsSearchOpen(!isSearchOpen)} 
                    src={asset.searchIcon} 
                    alt="search" 
                    className={`cursor-pointer ${isScrolled && 'invert h-6'} h-6`} 
                />
                {user && <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label='My Bookings' labelIcon={<BookIcon/>} onClick={()=> navigate('/my-bookings')} />
                        <UserButton.Action label='Write Review' labelIcon={<ReviewIcon/>} onClick={()=> navigate('/write-review')} />
                    </UserButton.MenuItems>
                </UserButton>}
                <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={asset.menuIcon} alt="Menu Icon" className={`${isScrolled && "invert h-4"} h-6`} />
            </div>

            {/* Mobile Search Input Overlay */}
            {isSearchOpen && (
                <div className="md:hidden fixed top-0 left-0 w-full bg-white p-4 shadow-lg z-[60] flex items-center gap-3 animate-in slide-in-from-top duration-300">
                    <img src={asset.searchIcon} alt="search" className="h-5 invert" />
                    <input 
                        autoFocus
                        type="text" 
                        placeholder="Search by city..." 
                        className="flex-1 bg-transparent border-none outline-none text-gray-800"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(e);
                                setIsSearchOpen(false);
                            }
                        }}
                    />
                    <button onClick={() => setIsSearchOpen(false)} className="text-gray-500 text-xl">✕</button>
                </div>
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={asset.closeIcon} alt="Close Icon" className="h-6.5" />
                </button>

                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </a>
                ))}

                {isOwnerLoggedIn && <button className="border border-gray-500 px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all" onClick={() => {navigate('/owner')}}>
                    Dashboard
                </button>}

                {!user && !isOwnerLoggedIn && <button onClick={() => setIsLoginModalOpen(true)} className="bg-primary text-white px-8 py-2.5 rounded-full transition-all duration-500">
                    Login
                </button>}
                {isOwnerLoggedIn && <button onClick={handleOwnerLogout} className="bg-red-600 text-white px-8 py-2.5 rounded-full transition-all duration-500">
                    Logout
                </button>}
            </div>

        </nav>
        <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => setIsLoginModalOpen(false)} 
            setOwnerLoggedIn={setIsOwnerLoggedIn} 
        />
        </>
    );
}

export default Navbar;