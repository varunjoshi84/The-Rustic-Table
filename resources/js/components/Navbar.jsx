import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiSearch, FiLogOut, FiHeart, FiBookmark, FiPlusCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-rustic-50/90 backdrop-blur-md sticky top-0 z-50 border-b border-rustic-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                            <svg className="w-9 h-9 text-rustic-800 group-hover:text-rustic-600 transition-colors" viewBox="0 0 100 100" fill="currentColor">
                                <circle cx="50" cy="50" r="45" fill="currentColor"/>
                                <text x="50" y="65" fontFamily="Georgia, serif" fontSize="45" fill="#faf7f2" textAnchor="middle" fontWeight="bold" fontStyle="italic">R</text>
                            </svg>
                            <span className="text-3xl font-heading font-bold text-rustic-800 group-hover:text-rustic-600 transition-colors">The Rustic Table</span>
                        </Link>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                        <Link to="/" className="text-rustic-800 hover:text-rustic-500 font-medium transition-colors">Home</Link>
                        <Link to="/recipes" className="text-rustic-800 hover:text-rustic-500 font-medium transition-colors">Recipes</Link>
                        {/* <Link to="/categories" className="text-rustic-800 hover:text-rustic-500 font-medium transition-colors">Categories</Link> */}
                        
                        {user ? (
                            <div className="relative ml-3">
                                <div>
                                    <button 
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="flex text-sm border-2 border-rustic-300 rounded-full focus:outline-none focus:border-rustic-500 transition-colors"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-rustic-200 flex items-center justify-center text-rustic-700">
                                            {user.avatar_path ? (
                                                <img className="h-10 w-10 rounded-full object-cover" src={`/storage/${user.avatar_path}`} alt={user.name} />
                                            ) : (
                                                <FiUser size={20} />
                                            )}
                                        </div>
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {showDropdown && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                            </div>
                                            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setShowDropdown(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-rustic-50 hover:text-rustic-800">
                                                <FiUser className="mr-2" /> Dashboard
                                            </Link>
                                            <Link to="/dashboard/upload" onClick={() => setShowDropdown(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-rustic-50 hover:text-rustic-800">
                                                <FiPlusCircle className="mr-2" /> Upload Recipe
                                            </Link>
                                            <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                <FiLogOut className="mr-2" /> Sign out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Link to="/login" className="text-rustic-800 hover:text-rustic-600 font-medium py-2 px-4 transition-colors">Log in</Link>
                                <Link to="/register" className="bg-rustic-800 hover:bg-rustic-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors">Sign up</Link>
                            </div>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-rustic-700 hover:text-rustic-900 hover:bg-rustic-100 focus:outline-none focus:bg-rustic-100 focus:text-rustic-900 transition-colors">
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="sm:hidden bg-rustic-50 border-b border-rustic-200 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-rustic-900 hover:bg-rustic-100">Home</Link>
                            <Link to="/recipes" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-rustic-900 hover:bg-rustic-100">Recipes</Link>
                            <Link to="/categories" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-rustic-900 hover:bg-rustic-100">Categories</Link>
                        </div>
                        {user ? (
                            <div className="pt-4 pb-3 border-t border-rustic-200">
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-rustic-200 flex items-center justify-center text-rustic-700">
                                            <FiUser size={20} />
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-rustic-800">{user.name}</div>
                                        <div className="text-sm font-medium text-rustic-600">{user.email}</div>
                                    </div>
                                </div>
                                <div className="mt-3 px-2 space-y-1">
                                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-rustic-800 hover:bg-rustic-100">Dashboard</Link>
                                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Sign out</button>
                                </div>
                            </div>
                        ) : (
                            <div className="pt-4 pb-3 border-t border-rustic-200 px-4 space-y-2">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center w-full bg-white border border-rustic-300 text-rustic-800 font-medium py-2 px-4 rounded-md shadow-sm">Log in</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center w-full bg-rustic-800 text-white font-medium py-2 px-4 rounded-md shadow-sm">Sign up</Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
