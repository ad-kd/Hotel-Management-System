import React, { useEffect } from 'react';
import heroImage from '../assets/heroImage.png';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the Madurai Mandabam platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services. We reserve the right to update these terms at any time without prior notice."
    },
    {
      title: "2. Booking & Reservations",
      content: "All reservations made through Madurai Mandabam are subject to availability. A booking is only confirmed once a confirmation email has been sent to the registered address. We reserve the right to cancel any booking due to technical errors or fraudulent activity."
    },
    {
      title: "3. Payment & Cancellation",
      content: "Payments must be made through our authorized payment gateways. Cancellation policies vary by property and room type. Please review the specific cancellation terms provided during the booking process. Refunds, if applicable, will be processed within 7-10 business days."
    },
    {
      title: "4. Guest Responsibilities",
      content: "Guests are expected to maintain the decorum of the properties and respect local traditions. Any damage to property caused by guests will be their financial responsibility. Illegal activities on the premises are strictly prohibited and will lead to immediate eviction without refund."
    },
    {
      title: "5. Privacy & Data Security",
      content: "Your privacy is paramount. We handle your data in accordance with our Privacy Policy. By using our services, you consent to the collection and use of information as outlined in said policy."
    },
    {
      title: "6. Limitation of Liability",
      content: "Madurai Mandabam acts as a facilitator between guests and property owners. We are not liable for any direct, indirect, or incidental damages arising from your stay, including but not limited to loss of personal belongings or personal injury."
    }
  ];

  return (
    <div className="bg-[#0F0F0F] text-white min-h-screen font-outfit">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-playfair mb-4 slide-in-from-bottom">
            Terms of <span className="text-[#D4AF37]">Service</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto slide-in-from-bottom delay-300"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-sm md:text-base uppercase tracking-widest fade-in">
            Refining the standards of luxury hospitality
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
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
