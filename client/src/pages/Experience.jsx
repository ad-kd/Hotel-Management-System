import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import experienceHero from '../assets/experience_hero.png';
import poolImg from '../assets/madurai_pool.png';
import spaImg from '../assets/experience_spa.png';
import diningImg from '../assets/madurai_dining.png';
import templeImg from '../assets/madurai_temple.png';
import marketImg from '../assets/madurai_market.png';
import urbanImg from '../assets/urban.png';

const Experience = () => {
  const collectionRef = useRef(null);
  const navigate = useNavigate();

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const collections = [
    {
      title: 'Temple Sanctuaries',
      description: 'Experience the divine energy of Madurai\'s ancient gopurams and sacred halls.',
      image: templeImg,
      query: 'temple'
    },
    {
      title: 'Urban Luxury',
      description: 'Sophisticated stays in the heart of the world\'s vibrant cities.',
      image: urbanImg,
      query: 'urban'
    },
    {
      title: 'Heritage Trails',
      description: 'Discover the rich history of the Pandyan empire through traditional markets and monuments.',
      image: marketImg,
      query: 'heritage'
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={experienceHero} alt="Madurai Mandabam Experience" className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <p className="text-secondary tracking-[0.2em] uppercase text-sm font-semibold mb-4 drop-shadow-md">Curated Moments</p>
          <h1 className="font-playfair text-6xl md:text-8xl text-white font-bold mb-6 tracking-wide drop-shadow-lg">
            Beyond the Ordinary
          </h1>
          <p className="text-gray-200 text-lg md:text-2xl font-light mb-10 drop-shadow-md">
            Discover a collection of extraordinary experiences designed to awaken your senses and create lasting memories.
          </p>
          <button 
            onClick={scrollToCollection}
            className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all duration-500 px-10 py-3 uppercase tracking-widest text-sm cursor-pointer active:scale-95"
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6 lg:px-24 max-w-5xl mx-auto text-center">
        <h2 className="font-playfair text-4xl text-gray-900 mb-6">An Artful Approach to Leisure</h2>
        <p className="text-gray-600 text-lg leading-relaxed font-light">
          At Madurai Mandabam, every moment is considered. Whether you seek the deep relaxation of our holistic spa, the culinary adventures of our traditional South Indian dining, or simply the serene beauty of our courtyard at sunset, your experience is tailored to transcend expectations.
        </p>
      </section>

      {/* The Collection Section */}
      <section ref={collectionRef} className="py-24 bg-gray-50 px-6 lg:px-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <p className="text-secondary tracking-[0.15em] uppercase text-sm font-semibold mb-2">Our Portfolio</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-gray-900 mb-4">The Collection</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {collections.map((item, index) => (
            <div 
              key={index} 
              onClick={() => navigate(`/rooms?search=${item.query}`)}
              className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-playfair text-3xl mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-secondary">
                  View Collection <span>&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience 1: The Spa */}
      <section className="py-24 px-6 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-tr-[4rem] rounded-bl-[4rem]">
            <img src={spaImg} alt="Luxury Spa" className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <p className="text-secondary tracking-[0.15em] uppercase text-sm font-semibold mb-2">Rejuvenate</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Serenity Spa</h2>
            <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
              Step into a sanctuary of tranquility. Our world-class therapists combine ancient healing traditions with modern wellness techniques. Featuring natural thermal baths, private treatment villas, and bespoke therapies designed to align your mind, body, and spirit.
            </p>
            <Link to="/rooms" className="text-primary font-medium flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wider text-sm">
              Discover Treatments <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Experience 2: Fine Dining */}
      <section className="py-24 px-6 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-tl-[4rem] rounded-br-[4rem]">
            <img src={diningImg} alt="Fine Dining" className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:items-end lg:text-right">
            <p className="text-secondary tracking-[0.15em] uppercase text-sm font-semibold mb-2">Savor</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">Epicurean Heights</h2>
            <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
              A symphony of flavors awaits at our signature restaurant. Overlooking the majestic temple gopurams, our executive chef crafts seasonal tasting menus that celebrate local provenance and traditional spices. Our curated collection of beverages ensures the perfect pairing for every course.
            </p>
            <Link to="/rooms" className="text-primary font-medium flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wider text-sm">
              <span>&larr;</span> Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Experience 3: The Infinity Pool */}
      <section className="py-24 px-6 lg:px-24 max-w-7xl mx-auto mb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-tr-[4rem] rounded-bl-[4rem]">
            <img src={poolImg} alt="Infinity Pool Sunset" className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <p className="text-secondary tracking-[0.15em] uppercase text-sm font-semibold mb-2">Unwind</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Temple View Pool</h2>
            <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
              Merge with tranquility at our iconic traditional pool. Set against breathtaking views of the Meenakshi Temple gopurams, it's the ultimate setting for daytime lounging or evening cocktails. Enjoy private cabanas, dedicated poolside service, and an atmosphere of pure, unadulterated bliss.
            </p>
            <Link to="/rooms" className="text-primary font-medium flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wider text-sm">
              Book Your Stay <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gray-900 text-white py-24 text-center px-4">
        <h2 className="font-playfair text-4xl md:text-5xl mb-6">Ready to Experience Madurai Mandabam?</h2>
        <p className="text-gray-400 font-light text-lg mb-10 max-w-2xl mx-auto">
          Immerse yourself in luxury. Reserve your journey today and unlock a world of unparalleled experiences.
        </p>
        <Link to="/rooms" className="bg-secondary text-gray-900 px-10 py-4 font-medium uppercase tracking-widest hover:bg-white transition-colors duration-300">
          Begin Your Journey
        </Link>
      </section>
    </div>
  );
};

export default Experience;
