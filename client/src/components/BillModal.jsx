import React from 'react';
import assets from '../assets/assets';

const BillModal = ({ isOpen, onClose, booking }) => {
    if (!isOpen || !booking) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
            <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="bg-indigo-600 p-8 text-white relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <img src={assets.logo} alt="QuickStay" className="h-8 invert brightness-0" />
                        <span className="text-xl font-playfair font-bold">QuickStay</span>
                    </div>
                    <h2 className="text-2xl font-bold">Booking Receipt</h2>
                    <p className="text-indigo-100 text-sm mt-1">Order #{booking._id.slice(-8).toUpperCase()}</p>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Hotel</p>
                                <p className="text-lg font-bold text-gray-800">{booking.hotel?.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Status</p>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">PAID</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Check-In</p>
                                <p className="text-sm font-medium text-gray-700">{new Date(booking.checkInDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Check-Out</p>
                                <p className="text-sm font-medium text-gray-700">{new Date(booking.checkOutDate).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-gray-500 text-sm">{booking.room?.roomType} x {Math.ceil((new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24))} nights</p>
                                <p className="text-gray-800 font-medium">${booking.totalPrice}</p>
                            </div>
                            <div className="flex justify-between items-center py-4 border-t border-dashed border-gray-200 mt-4">
                                <p className="text-lg font-bold text-gray-800">Total Amount</p>
                                <p className="text-2xl font-bold text-indigo-600">${booking.totalPrice}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-xs text-gray-600">Payment successfully processed via {booking.paymentMethod || 'Stripe'}</p>
                    </div>

                    <button 
                        onClick={onClose}
                        className="w-full bg-gray-800 text-white py-4 rounded-2xl font-bold hover:bg-gray-900 transition-all shadow-lg active:scale-[0.98]"
                    >
                        Done
                    </button>
                    
                    <p className="text-center text-xs text-gray-400">Thank you for choosing QuickStay!</p>
                </div>
            </div>
        </div>
    );
};

export default BillModal;
