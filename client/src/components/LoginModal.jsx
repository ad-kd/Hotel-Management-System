import React, { useState } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-700">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-700">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);

const LoginModal = ({ isOpen, onClose, setOwnerLoggedIn, initialView = 'selection' }) => {
    const { openSignIn } = useClerk();
    const navigate = useNavigate();
    const [view, setView] = useState(initialView); // selection, ownerLogin
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    React.useEffect(() => {
        if (isOpen) {
            setView(initialView);
        }
    }, [isOpen, initialView]);

    if (!isOpen) return null;

    const handleOwnerLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/owner/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            
            if (response.ok) {
                setOwnerLoggedIn(true);
                localStorage.setItem('hotelOwnerToken', data.token); // Store simple token
                onClose();
                navigate('/owner'); // Redirect to dashboard
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                    ✕
                </button>
                
                {view === 'selection' ? (
                    <div className="flex flex-col items-center py-6">
                        <h2 className="text-2xl font-playfair mb-8">Welcome to Madurai Mandabam</h2>
                        <button 
                            onClick={() => { onClose(); openSignIn(); }}
                            className="w-full bg-indigo-600 text-white rounded-lg py-3 mb-4 hover:bg-indigo-700 transition"
                        >
                            Login as Customer
                        </button>
                        <button 
                            onClick={() => setView('ownerLogin')}
                            className="w-full bg-white text-indigo-600 border border-indigo-600 rounded-lg py-3 hover:bg-indigo-50 transition"
                        >
                            Login as Hotel Owner
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col py-2">
                        <div className="flex items-center mb-6">
                            <button onClick={() => setView('selection')} className="text-gray-500 hover:text-black mr-4">
                                ← Back
                            </button>
                            <h2 className="text-2xl font-playfair">Owner Login</h2>
                        </div>
                        
                        <form onSubmit={handleOwnerLogin} className="flex flex-col gap-4">
                            {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>}
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-600 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-600"
                                    required 
                                />
                            </div>
                            <div className="flex flex-col relative">
                                <label className="text-sm text-gray-600 mb-1">Password</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="border border-gray-300 rounded-lg p-2 w-full pr-10 focus:outline-none focus:border-indigo-600"
                                        required 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center"
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg py-3 mt-4 hover:bg-indigo-700 transition">
                                Sign In
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
