import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';
import axios from '../utils/axios';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await axios.post('/newsletter', { email });
            setStatus({ type: 'success', message: res.data.message });
            setEmail('');
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Subscription failed.' });
        } finally {
            setIsLoading(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        }
    };
    return (
        <footer className="bg-rustic-900 text-rustic-100 border-t-8 border-rustic-700 mt-20">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="text-3xl font-heading font-bold text-rustic-100">The Rustic Table</span>
                        </Link>
                        <p className="text-rustic-300 text-base">
                            Discover the art of slow cooking, vintage recipes, and hearty meals shared around the table.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-rustic-400 hover:text-white transition-colors">
                                <span className="sr-only">Instagram</span>
                                <FiInstagram size={24} />
                            </a>
                            <a href="#" className="text-rustic-400 hover:text-white transition-colors">
                                <span className="sr-only">Twitter</span>
                                <FiTwitter size={24} />
                            </a>
                            <a href="#" className="text-rustic-400 hover:text-white transition-colors">
                                <span className="sr-only">Facebook</span>
                                <FiFacebook size={24} />
                            </a>
                            <a href="#" className="text-rustic-400 hover:text-white transition-colors">
                                <span className="sr-only">YouTube</span>
                                <FiYoutube size={24} />
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-rustic-400 tracking-wider uppercase">Cuisines</h3>
                                <ul className="mt-4 space-y-4">
                                    <li><Link to="/categories?type=Italian" className="text-base text-rustic-300 hover:text-white transition-colors">Italian Classic</Link></li>
                                    <li><Link to="/categories?type=Indian" className="text-base text-rustic-300 hover:text-white transition-colors">Rustic Indian</Link></li>
                                    <li><Link to="/categories?type=French" className="text-base text-rustic-300 hover:text-white transition-colors">French Country</Link></li>
                                    <li><Link to="/categories?type=Desserts" className="text-base text-rustic-300 hover:text-white transition-colors">Vintage Desserts</Link></li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-rustic-400 tracking-wider uppercase">Company</h3>
                                <ul className="mt-4 space-y-4">
                                    <li><Link to="/about" className="text-base text-rustic-300 hover:text-white transition-colors">Our Story</Link></li>
                                    <li><Link to="/blog" className="text-base text-rustic-300 hover:text-white transition-colors">Journal</Link></li>
                                    <li><Link to="/contact" className="text-base text-rustic-300 hover:text-white transition-colors">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1">
                            <div>
                                <h3 className="text-sm font-semibold text-rustic-400 tracking-wider uppercase">Join our Newsletter</h3>
                                <p className="mt-4 text-base text-rustic-300">The latest recipes, articles, and resources, sent to your inbox weekly.</p>
                                <form onSubmit={handleSubscribe} className="mt-4 sm:flex sm:max-w-md">
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input 
                                        type="email" 
                                        name="email-address" 
                                        id="email-address" 
                                        autoComplete="email" 
                                        required 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none min-w-0 w-full bg-rustic-800 border border-rustic-700 rounded-md shadow-sm py-2 px-4 text-base text-rustic-100 placeholder-rustic-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-rustic-900 focus:ring-rustic-500" 
                                        placeholder="Enter your email" 
                                    />
                                    <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                                        <button type="submit" disabled={isLoading} className="w-full bg-rustic-600 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-rustic-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-rustic-900 focus:ring-rustic-500 transition-colors disabled:opacity-70">
                                            {isLoading ? 'Subscribing...' : 'Subscribe'}
                                        </button>
                                    </div>
                                </form>
                                {status.message && (
                                    <p className={`mt-2 text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                        {status.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-rustic-800 pt-8">
                    <p className="text-base text-rustic-400 xl:text-center">&copy; 2026 The Rustic Table, Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
