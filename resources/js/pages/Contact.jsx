import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from '../utils/axios';

export default function Contact() {
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        const formData = {
            name: name,
            email: email,
            message: message
        };

        try {
            const res = await axios.post('/contact', formData);
            setStatus({ type: 'success', message: res.data.message });
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Something went wrong. Please try again later.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-rustic-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-2xl shadow-xl border border-rustic-200">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-rustic-900 mb-4 text-center">Contact Us</h1>
                    <p className="text-center text-rustic-600 mb-10 italic text-lg">Have a question or want to share a recipe? We'd love to hear from you.</p>

                    {status.message && (
                        <div className={`p-4 rounded-xl mb-8 border text-center font-medium shadow-sm ${status.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-rustic-700 mb-1">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-rustic-300 rounded-xl p-3 bg-rustic-50 focus:ring-rustic-500 focus:border-rustic-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-rustic-700 mb-1">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-rustic-300 rounded-xl p-3 bg-rustic-50 focus:ring-rustic-500 focus:border-rustic-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-rustic-700 mb-1">Message</label>
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows="5" className="w-full border border-rustic-300 rounded-xl p-3 bg-rustic-50 focus:ring-rustic-500 focus:border-rustic-500 resize-none transition-colors"></textarea>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-rustic-800 text-white font-bold py-4 rounded-xl hover:bg-rustic-700 transition-colors shadow-md text-lg disabled:opacity-70">
                            {isLoading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
