import React from 'react'
import hotelExterior from '../assets/about_hero.png'
import ownerPortrait from '../assets/owner_portrait.png'

const About = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={hotelExterior} alt="Hotel Exterior" className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-playfair text-5xl md:text-7xl text-white font-bold mb-4 tracking-wide">A Vision of Elegance</h1>
          <p className="text-gray-200 text-lg md:text-2xl max-w-2xl mx-auto font-light">
            Welcome to a place where luxury meets the warmth of home.
          </p>
        </div>
      </section>

      {/* Owner's Message Section */}
      <section className="py-20 md:py-32 px-6 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-secondary/20 translate-x-4 translate-y-4 rounded-xl -z-10"></div>
            <img 
              src={ownerPortrait} 
              alt="Hotel Owner" 
              className="w-full h-auto rounded-xl shadow-2xl object-cover border-4 border-white"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              My Personal Welcome
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-light">
              <p>
                When I first envisioned this hotel, I didn't just want to build another place to sleep. I set out to create a sanctuary—a home away from home that anticipates your every need and wraps you in uncompromising comfort.
              </p>
              <p>
                As a lifelong traveler, I understand the profound difference between a mere stay and an unforgettable experience. That's why every detail here, from the bespoke furnishings in our lobby to the thread count of your sheets, has been personally selected to ensure your utmost satisfaction.
              </p>
              <p>
                I believe that true luxury is found not just in beautiful architecture, but in the warmth of human connection. My dedicated team and I are here to craft moments that you will cherish long after you've checked out. 
              </p>
              <p className="italic font-medium text-gray-900 pt-4 border-t border-gray-200">
                "We don't just host guests; we welcome friends into our grand home. I look forward to personally welcoming you."
              </p>
              <div className="pt-6">
                <p className="font-playfair text-2xl font-bold text-primary">Lakshmi Ranganathan</p>
                <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Founder & Owner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-24 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Our Core Philosophy</h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Uncompromising Luxury</h3>
              <p className="text-gray-600 font-light">Every element is meticulously curated to provide a rich, tactile, and visually stunning environment.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Heartfelt Hospitality</h3>
              <p className="text-gray-600 font-light">We serve with genuine warmth and anticipation, making every guest feel truly seen and valued.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gray-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Timeless Memories</h3>
              <p className="text-gray-600 font-light">Our goal is to be the backdrop for your most cherished life moments, ensuring they are unforgettable.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About