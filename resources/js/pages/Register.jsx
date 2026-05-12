import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.password_confirmation) {
            return setError('Passwords do not match.');
        }

        setIsLoading(true);

        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-rustic-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-rustic-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-rustic-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl relative z-10 border border-rustic-100"
            >
                <div>
                    <h2 className="mt-2 text-center text-4xl font-heading font-extrabold text-rustic-900">
                        Join The Table
                    </h2>
                    <p className="mt-4 text-center text-sm text-rustic-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-rustic-700 hover:text-rustic-500 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-rustic-700">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-rustic-300 placeholder-rustic-400 text-rustic-900 rounded-md focus:outline-none focus:ring-rustic-500 focus:border-rustic-500 focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-rustic-700">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-rustic-300 placeholder-rustic-400 text-rustic-900 rounded-md focus:outline-none focus:ring-rustic-500 focus:border-rustic-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-rustic-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-rustic-300 placeholder-rustic-400 text-rustic-900 rounded-md focus:outline-none focus:ring-rustic-500 focus:border-rustic-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-rustic-700">Confirm Password</label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                required
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-rustic-300 placeholder-rustic-400 text-rustic-900 rounded-md focus:outline-none focus:ring-rustic-500 focus:border-rustic-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rustic-800 hover:bg-rustic-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rustic-500 disabled:opacity-70 transition-colors"
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
