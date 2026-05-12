import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="bg-rustic-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-2xl shadow-xl border border-rustic-200">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-rustic-900 mb-6 text-center border-b border-rustic-200 pb-6">Our Story</h1>
                    <div className="text-rustic-700 mx-auto font-sans space-y-6 text-lg leading-relaxed">
                        <p>
                            Welcome to The Rustic Table. Our journey began with a simple belief: the best memories are made around the dinner table.
                        </p>
                        <p>
                            We wanted to create a platform where home cooks could share their beloved family recipes, passed down through generations. From slow-cooked stews to freshly baked sourdough, we celebrate the art of cooking from scratch.
                        </p>
                        <div className="my-10 relative h-80 rounded-xl overflow-hidden shadow-md">
                            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1600" alt="Cooking together" className="w-full h-full object-cover" />
                        </div>
                        <p>
                            Today, The Rustic Table is a vibrant community of food lovers. Whether you are a seasoned chef or a beginner looking for weeknight inspiration, there's a seat for you at our table.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
