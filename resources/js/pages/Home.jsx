import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiClock, FiStar, FiChevronRight } from 'react-icons/fi';
import axios from '../utils/axios';

const categories = [
    { name: 'Italian Classic', type: 'Italian', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800' },
    { name: 'Rustic Indian', type: 'Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800' },
    { name: 'French Country', type: 'French', image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=800' },
    { name: 'Vintage Desserts', type: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800' },
];

export default function Home() {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate(`/recipes`);
        }
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get('/recipes');
                setRecipes(res.data.data.slice(0, 6)); // Featured
            } catch (error) {
                console.error("Error fetching recipes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    return (
        <div className="bg-rustic-50">
            {/* Hero Section */}
            <div className="relative bg-rustic-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000" 
                        alt="Vintage Kitchen" 
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rustic-900 to-transparent"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-5xl sm:text-7xl font-heading font-bold text-rustic-50 tracking-tight mb-6 drop-shadow-lg">
                            The Art of Slow Cooking
                        </h1>
                        <p className="text-xl sm:text-2xl text-rustic-200 mb-10 font-sans italic">
                            Discover vintage recipes, heirloom techniques, and hearty meals to share around your table.
                        </p>
                        
                        <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiSearch className="h-6 w-6 text-rustic-500" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-12 pr-4 py-4 rounded-full bg-white/90 backdrop-blur-sm border-2 border-transparent focus:border-rustic-400 focus:ring-0 text-lg shadow-xl text-rustic-900 placeholder-rustic-500 transition-all"
                                placeholder="Search recipes, ingredients..."
                            />
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-heading font-bold text-rustic-900">Explore by Category</h2>
                    <div className="h-1 w-24 bg-rustic-400 mx-auto mt-4 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, index) => (
                        <motion.div 
                            key={index}
                            onClick={() => navigate(`/recipes?type=${encodeURIComponent(cat.type)}`)}
                            whileHover={{ y: -10 }}
                            className="group relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                        >
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-rustic-900/90 via-rustic-900/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="text-2xl font-heading font-bold text-white mb-2">{cat.name}</h3>
                                <p className="text-rustic-200 flex items-center text-sm font-medium">
                                    View Recipes <FiChevronRight className="ml-1" />
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Featured Recipes Section */}
            <div className="bg-rustic-100 py-24 border-y border-rustic-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-rustic-900">Featured Recipes</h2>
                            <p className="text-rustic-600 mt-2 font-medium">Handpicked classics from our community.</p>
                        </div>
                        <Link to="/recipes" className="text-rustic-600 hover:text-rustic-800 font-medium flex items-center transition-colors">
                            View All <FiChevronRight className="ml-1" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse bg-white rounded-2xl h-96 shadow-md"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {recipes.map(recipe => (
                                <motion.div 
                                    key={recipe.id}
                                    whileHover={{ y: -8 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-rustic-200 group"
                                >
                                    <div className="relative h-60 overflow-hidden">
                                        <img 
                                            src={recipe.thumbnail_path ? `/storage/${recipe.thumbnail_path}` : 'https://images.unsplash.com/photo-1495195134817-a1a28078aca9?auto=format&fit=crop&q=80&w=800'} 
                                            alt={recipe.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-rustic-800 shadow-sm">
                                            {recipe.difficulty}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-rustic-500 mb-3 space-x-4">
                                            <span className="flex items-center"><FiClock className="mr-1" /> {recipe.cooking_time} mins</span>
                                            <span className="flex items-center"><FiStar className="mr-1 text-yellow-500" /> {recipe.likes_count || 0}</span>
                                        </div>
                                        <h3 className="text-2xl font-heading font-bold text-rustic-900 mb-2 line-clamp-1">
                                            <Link to={`/recipes/${recipe.id}`} className="hover:text-rustic-600 transition-colors">
                                                {recipe.title}
                                            </Link>
                                        </h3>
                                        <p className="text-rustic-600 line-clamp-2 mb-4 font-sans">
                                            {recipe.description}
                                        </p>
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-rustic-200 flex items-center justify-center text-rustic-700 mr-3 overflow-hidden">
                                                {recipe.user?.avatar_path ? (
                                                    <img src={`/storage/${recipe.user.avatar_path}`} alt="author" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-xs font-bold">{recipe.user?.name?.charAt(0)}</span>
                                                )}
                                            </div>
                                            <span className="text-sm font-medium text-rustic-800">{recipe.user?.name}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            {/* CTA Section */}
            <div className="relative bg-rustic-800 py-20">
                <div className="absolute inset-0 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=2000" alt="Cooking" className="w-full h-full object-cover opacity-20" />
                </div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-heading font-bold text-white mb-6">Share Your Family Recipes</h2>
                    <p className="text-xl text-rustic-200 mb-10 italic">Join our community of home cooks and help preserve culinary traditions.</p>
                    <Link to="/register" className="inline-block bg-white text-rustic-900 font-bold text-lg py-4 px-10 rounded-full shadow-lg hover:bg-rustic-100 hover:scale-105 transition-all">
                        Join The Table
                    </Link>
                </div>
            </div>
        </div>
    );
}
