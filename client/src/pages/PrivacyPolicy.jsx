import React, { useEffect } from 'react';
import assets from '../assets/assets';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, make a reservation, or communicate with our concierge team. This includes your name, email address, phone number, and payment details."
    },
    {
      title: "2. How We Use Your Information",
      content: "Your data is used primarily to process your bookings and provide a personalized experience. We also use it to send you confirmation emails, updates regarding your stay, and occasional promotional offers that align with your interests."
    },
    {
      title: "3. Information Sharing",
      content: "We do not sell your personal information. We only share data with trusted third-party service providers (like payment processors) necessary to fulfill your requests, or when required by law to protect our rights or comply with a judicial proceeding."
    },
    {
      title: "4. Data Security",
      content: "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
    },
    {
      title: "5. Cookies & Tracking",
      content: "Madurai Mandabam uses cookies to enhance your browsing experience and analyze site traffic. You can manage your cookie preferences through your browser settings, though disabling them may affect some features of our platform."
    },
    {
      title: "6. Your Rights",
      content: "You have the right to access, correct, or delete your personal data. If you wish to exercise these rights or have questions about our privacy practices, please contact our support team at privacy@maduraimandabam.com."
    }
  ];

  return (
    <div className="bg-[#0F0F0F] text-white min-h-screen font-outfit">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${assets.hero_img || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop'})` }}
        ></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-playfair mb-4 slide-in-from-bottom">
            Privacy <span className="text-[#D4AF37]">Policy</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto slide-in-from-bottom delay-300"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-sm md:text-base uppercase tracking-widest fade-in">
            Committed to protecting your personal sanctuary
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="space-y-16">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="group border-l-2 border-[#7B1818] pl-8 hover:border-[#D4AF37] transition-colors duration-500"
            >
              <h2 className="text-2xl font-playfair text-[#D4AF37] mb-4 group-hover:translate-x-2 transition-transform duration-300">
                {section.title}
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-24 pt-12 border-t border-white/10 text-center">
          <p className="text-gray-500 italic mb-8">
            Last Updated: May 12, 2026
          </p>
          <button 
            onClick={() => window.print()}
            className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 rounded-sm uppercase tracking-widest text-xs font-bold"
          >
            Print Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
