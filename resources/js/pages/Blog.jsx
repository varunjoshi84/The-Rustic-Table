import React from 'react';
import { motion } from 'framer-motion';

const posts = [
    { title: "The Secret to Perfect Sourdough", date: "May 10, 2026", excerpt: "Mastering the art of sourdough takes patience, but the results are worth it.", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800" },
    { title: "A Guide to Cast Iron Care", date: "April 28, 2026", excerpt: "Your grandmother's cast iron skillet can last forever if treated properly.", image: "https://images.unsplash.com/photo-1590209257250-95b77ee04fc0?auto=format&fit=crop&q=80&w=800" },
    { title: "Summer Harvest: What to Cook", date: "April 15, 2026", excerpt: "Make the most of fresh summer vegetables with these simple rustic dishes.", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800" },
];

export default function Blog() {
    return (
        <div className="bg-rustic-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-rustic-900 mb-4">The Journal</h1>
                    <p className="text-xl text-rustic-600 font-sans italic max-w-2xl mx-auto">
                        Stories, guides, and inspiration from our kitchen to yours.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {posts.map((post, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-rustic-200 group cursor-pointer flex flex-col">
                            <div className="h-56 overflow-hidden flex-shrink-0">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <p className="text-sm font-bold text-rustic-500 uppercase tracking-widest mb-2">{post.date}</p>
                                <h2 className="text-2xl font-heading font-bold text-rustic-900 mb-3 group-hover:text-rustic-600 transition-colors">{post.title}</h2>
                                <p className="text-rustic-600 flex-grow">{post.excerpt}</p>
                                <div className="mt-6 pt-4 border-t border-rustic-100 font-medium text-rustic-800 flex items-center">
                                    Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
