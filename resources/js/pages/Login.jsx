import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await login(email, password);
            if (res.user && res.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-rustic-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rustic-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rustic-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl relative z-10 border border-rustic-100"
            >
                <div>
                    <h2 className="mt-2 text-center text-4xl font-heading font-extrabold text-rustic-900">
                        Welcome Back
                    </h2>
                    <p className="mt-4 text-center text-sm text-rustic-600">
                        Or{' '}
                        <Link to="/register" className="font-medium text-rustic-700 hover:text-rustic-500 transition-colors">
                            create a new account
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-rustic-700">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-rustic-300 placeholder-rustic-400 text-rustic-900 rounded-md focus:outline-none focus:ring-rustic-500 focus:border-rustic-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-rustic-600 focus:ring-rustic-500 border-rustic-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-rustic-700">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-rustic-700 hover:text-rustic-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rustic-800 hover:bg-rustic-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rustic-500 disabled:opacity-70 transition-colors"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
