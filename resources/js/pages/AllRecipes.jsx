import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiClock, FiStar, FiFilter } from 'react-icons/fi';
import axios from '../utils/axios';
import { motion } from 'framer-motion';

export default function AllRecipes() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('type') || '';
    const initialSearch = queryParams.get('search') || '';

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        search: initialSearch,
        cuisine_type: initialCategory,
        difficulty: ''
    });

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.search) params.append('search', filters.search);
            if (filters.cuisine_type) params.append('cuisine_type', filters.cuisine_type);
            if (filters.difficulty) params.append('difficulty', filters.difficulty);
            params.append('page', page);

            const res = await axios.get(`/recipes?${params.toString()}`);
            setRecipes(res.data.data);
            setTotalPages(res.data.last_page);
        } catch (error) {
            console.error('Error fetching recipes', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [filters, page]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1); // Reset to first page on filter change
    };

    return (
        <div className="bg-rustic-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-rustic-900 mb-4">Discover Recipes</h1>
                    <p className="text-xl text-rustic-600 font-sans italic max-w-2xl mx-auto">
                        Find the perfect dish for your next rustic gathering.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-rustic-200 p-6 mb-12">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-rustic-400" />
                            </div>
                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                className="block w-full pl-11 pr-4 py-3 rounded-xl border border-rustic-300 focus:ring-rustic-500 focus:border-rustic-500 bg-rustic-50"
                                placeholder="Search by title or ingredient..."
                            />
                        </div>
                        <div className="w-full md:w-48">
                            <select
                                name="cuisine_type"
                                value={filters.cuisine_type}
                                onChange={handleFilterChange}
                                className="block w-full py-3 px-4 rounded-xl border border-rustic-300 focus:ring-rustic-500 focus:border-rustic-500 bg-rustic-50"
                            >
                                <option value="">All Cuisines</option>
                                <option value="Italian">Italian</option>
                                <option value="Indian">Indian</option>
                                <option value="Chinese">Chinese</option>
                                <option value="French">French</option>
                                <option value="Desserts">Desserts</option>
                                <option value="Street Food">Street Food</option>
                                <option value="Fast Food">Fast Food</option>
                            </select>
                        </div>
                        <div className="w-full md:w-48">
                            <select
                                name="difficulty"
                                value={filters.difficulty}
                                onChange={handleFilterChange}
                                className="block w-full py-3 px-4 rounded-xl border border-rustic-300 focus:ring-rustic-500 focus:border-rustic-500 bg-rustic-50"
                            >
                                <option value="">All Difficulties</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="animate-pulse bg-white rounded-2xl h-96 shadow-md border border-rustic-200"></div>
                        ))}
                    </div>
                ) : recipes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {recipes.map(recipe => (
                                <motion.div 
                                    key={recipe.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-rustic-200 group flex flex-col"
                                >
                                    <div className="relative h-56 overflow-hidden flex-shrink-0">
                                        <img 
                                            src={recipe.thumbnail_path ? `/storage/${recipe.thumbnail_path}` : 'https://images.unsplash.com/photo-1495195134817-a1a28078aca9?auto=format&fit=crop&q=80&w=800'} 
                                            alt={recipe.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-rustic-800 shadow-sm">
                                            {recipe.difficulty}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold uppercase tracking-wider text-rustic-500">{recipe.cuisine_type}</span>
                                            <div className="flex items-center text-sm text-rustic-500 space-x-3">
                                                <span className="flex items-center"><FiClock className="mr-1" /> {recipe.cooking_time}m</span>
                                                <span className="flex items-center"><FiStar className="mr-1 text-yellow-500" /> {recipe.likes_count || 0}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-heading font-bold text-rustic-900 mb-2 line-clamp-2">
                                            <Link to={`/recipes/${recipe.id}`} className="hover:text-rustic-600 transition-colors">
                                                {recipe.title}
                                            </Link>
                                        </h3>
                                        <p className="text-rustic-600 line-clamp-2 mb-4 font-sans text-sm flex-grow">
                                            {recipe.description}
                                        </p>
                                        <div className="flex items-center mt-auto pt-4 border-t border-rustic-100">
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

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-16 flex justify-center space-x-2">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${page === i + 1 ? 'bg-rustic-800 text-white shadow-md' : 'bg-white text-rustic-700 border border-rustic-300 hover:bg-rustic-50'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-rustic-200 shadow-sm">
                        <FiFilter className="mx-auto h-16 w-16 text-rustic-300 mb-4" />
                        <h3 className="text-2xl font-heading font-bold text-rustic-900 mb-2">No recipes found</h3>
                        <p className="text-rustic-500">Try adjusting your filters or search query.</p>
                        <button 
                            onClick={() => { setFilters({ search: '', cuisine_type: '', difficulty: '' }); setPage(1); }}
                            className="mt-6 inline-block bg-rustic-800 text-white font-medium py-2 px-6 rounded-lg shadow-sm hover:bg-rustic-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
