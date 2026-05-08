import React from 'react';
import { Link } from 'react-router-dom';
import poolImg from '../assets/experience_pool.png';
import spaImg from '../assets/experience_spa.png';
import diningImg from '../assets/experience_dining.png';

const Experience = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={poolImg} alt="Infinity Pool" className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]" />
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
          <button className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors duration-500 px-10 py-3 uppercase tracking-widest text-sm">
            Explore Collection
          </button>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6 lg:px-24 max-w-5xl mx-auto text-center">
        <h2 className="font-playfair text-4xl text-gray-900 mb-6">An Artful Approach to Leisure</h2>
        <p className="text-gray-600 text-lg leading-relaxed font-light">
          At Aetheris, every moment is considered. Whether you seek the deep relaxation of our holistic spa, the culinary adventures of our Michelin-starred dining, or simply the serene beauty of our infinity edge pool at sunset, your experience is tailored to transcend expectations.
        </p>
      </section>

      {/* Experience 1: The Spa */}
      <section className="py-16 px-6 lg:px-24 max-w-7xl mx-auto">
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
      <section className="py-16 px-6 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-tl-[4rem] rounded-br-[4rem]">
            <img src={diningImg} alt="Fine Dining" className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:items-end lg:text-right">
            <p className="text-secondary tracking-[0.15em] uppercase text-sm font-semibold mb-2">Savor</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">Epicurean Heights</h2>
            <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
              A symphony of flavors awaits at our signature restaurant. Overlooking the glittering city skyline, our executive chef crafts seasonal tasting menus that celebrate local provenance and global technique. An extensive, curated wine cellar ensures the perfect pairing for every course.
            </p>
            <Link to="/rooms" className="text-primary font-medium flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wider text-sm">
              <span>&larr;</span> Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Experience 3: The Infinity Pool */}
      <section className="py-16 px-6 lg:px-24 max-w-7xl mx-auto mb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-tr-[4rem] rounded-bl-[4rem]">
            <img src={poolImg} alt="Infinity Pool Sunset" className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <p className="text-secondary tracking-[0.15em] uppercase text-sm font-semibold mb-2">Unwind</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Horizon Pool</h2>
            <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
              Merge with the horizon at our iconic infinity pool. Set against breathtaking sunset views, it's the ultimate setting for daytime lounging or evening cocktails. Enjoy private cabanas, dedicated poolside service, and an atmosphere of pure, unadulterated bliss.
            </p>
            <Link to="/rooms" className="text-primary font-medium flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wider text-sm">
              Book Your Stay <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gray-900 text-white py-24 text-center px-4">
        <h2 className="font-playfair text-4xl md:text-5xl mb-6">Ready to Experience Aetheris?</h2>
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
