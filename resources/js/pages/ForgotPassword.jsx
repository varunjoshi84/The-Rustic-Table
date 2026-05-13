import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await axios.post('/forgot-password/send', { email });
            setStatus({ type: 'success', message: res.data.message });
            setStep(2);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || error.response?.data?.errors?.email?.[0] || 'Failed to send OTP.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await axios.post('/forgot-password/verify', { email, otp });
            setStatus({ type: 'success', message: res.data.message });
            setStep(3);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Invalid OTP.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await axios.post('/forgot-password/reset', { 
                email, 
                otp, 
                password, 
                password_confirmation: passwordConfirmation 
            });
            setStatus({ type: 'success', message: res.data.message });
            setTimeout(() => navigate('/login'), 2500);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || error.response?.data?.errors?.password?.[0] || 'Failed to reset password.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-rustic-50 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full bg-rustic-200/50 blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 rounded-full bg-rustic-300/30 blur-3xl"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-rustic-100 relative z-10"
            >
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-heading font-extrabold text-rustic-900">Reset Password</h2>
                    <p className="mt-3 text-sm text-rustic-600">
                        {step === 1 && "Enter your email to receive a 6-digit verification code."}
                        {step === 2 && "Enter the 6-digit code sent to your email."}
                        {step === 3 && "Create a new, secure password."}
                    </p>
                </div>

                {status.message && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl text-sm font-medium border ${status.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}
                    >
                        {status.message}
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {/* STEP 1: REQUEST OTP */}
                    {step === 1 && (
                        <motion.form 
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="mt-8 space-y-6" 
                            onSubmit={handleSendOtp}
                        >
                            <div>
                                <label htmlFor="email-address" className="block text-sm font-medium text-rustic-700 mb-1">Email address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none relative block w-full px-4 py-3 border border-rustic-300 placeholder-rustic-400 text-rustic-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rustic-500 focus:border-rustic-500 focus:z-10 sm:text-sm transition-colors bg-white/50"
                                    placeholder="chef@therustictable.com"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-rustic-800 hover:bg-rustic-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rustic-500 shadow-md transition-all disabled:opacity-70"
                            >
                                {isLoading ? 'Sending...' : 'Send Verification Code'}
                            </button>
                        </motion.form>
                    )}

                    {/* STEP 2: VERIFY OTP */}
                    {step === 2 && (
                        <motion.form 
                            key="step2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="mt-8 space-y-6" 
                            onSubmit={handleVerifyOtp}
                        >
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-rustic-700 mb-1">6-Digit Code</label>
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    required
                                    maxLength="6"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    className="appearance-none relative block w-full px-4 py-3 border border-rustic-300 placeholder-rustic-400 text-rustic-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rustic-500 focus:border-rustic-500 focus:z-10 sm:text-lg text-center tracking-[0.5em] transition-colors bg-white/50 font-mono"
                                    placeholder="------"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading || otp.length !== 6}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-rustic-800 hover:bg-rustic-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rustic-500 shadow-md transition-all disabled:opacity-70"
                            >
                                {isLoading ? 'Verifying...' : 'Verify Code'}
                            </button>
                            <div className="text-center">
                                <button type="button" onClick={() => setStep(1)} className="text-sm text-rustic-600 hover:text-rustic-800 transition-colors">
                                    Change Email Address
                                </button>
                            </div>
                        </motion.form>
                    )}

                    {/* STEP 3: RESET PASSWORD */}
                    {step === 3 && (
                        <motion.form 
                            key="step3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="mt-8 space-y-6" 
                            onSubmit={handleResetPassword}
                        >
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="new-password" className="block text-sm font-medium text-rustic-700 mb-1">New Password</label>
                                    <input
                                        id="new-password"
                                        name="password"
                                        type="password"
                                        required
                                        minLength="8"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none relative block w-full px-4 py-3 border border-rustic-300 placeholder-rustic-400 text-rustic-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rustic-500 focus:border-rustic-500 focus:z-10 sm:text-sm transition-colors bg-white/50"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-rustic-700 mb-1">Confirm Password</label>
                                    <input
                                        id="confirm-password"
                                        name="password_confirmation"
                                        type="password"
                                        required
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        className="appearance-none relative block w-full px-4 py-3 border border-rustic-300 placeholder-rustic-400 text-rustic-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rustic-500 focus:border-rustic-500 focus:z-10 sm:text-sm transition-colors bg-white/50"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading || password !== passwordConfirmation || password.length < 8}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-rustic-800 hover:bg-rustic-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rustic-500 shadow-md transition-all disabled:opacity-70"
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="mt-6 text-center">
                    <p className="text-sm text-rustic-600">
                        Remember your password?{' '}
                        <Link to="/login" className="font-medium text-rustic-800 hover:text-rustic-500 transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
