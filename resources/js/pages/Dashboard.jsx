import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiBookmark, FiPlusCircle, FiList, FiEdit2, FiTrash2 } from 'react-icons/fi';
import axios from '../utils/axios';

export default function Dashboard() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('uploaded');
    const [recipes, setRecipes] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        if (user) {
            fetchRecipes();
        }
    }, [activeTab, user]);

    const fetchRecipes = async () => {
        setFetching(true);
        try {
            const res = await axios.get(`/dashboard/${activeTab}`);
            setRecipes(res.data);
        } catch (error) {
            console.error('Error fetching dashboard data', error);
        } finally {
            setFetching(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-rustic-200 p-6">
                        <div className="flex flex-col items-center text-center pb-6 border-b border-rustic-100">
                            <div className="h-24 w-24 rounded-full bg-rustic-200 flex items-center justify-center text-rustic-700 overflow-hidden mb-4 border-4 border-rustic-50">
                                {user.avatar_path ? (
                                    <img src={`/storage/${user.avatar_path}`} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl font-bold font-heading">{user.name.charAt(0)}</span>
                                )}
                            </div>
                            <h2 className="text-xl font-heading font-bold text-rustic-900">{user.name}</h2>
                            <p className="text-sm text-rustic-500">{user.email}</p>
                        </div>
                        <nav className="mt-6 space-y-2">
                            <button
                                onClick={() => setActiveTab('uploaded')}
                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'uploaded' ? 'bg-rustic-800 text-white' : 'text-rustic-700 hover:bg-rustic-50 hover:text-rustic-900'}`}
                            >
                                <FiList className="mr-3" /> My Recipes
                            </button>
                            <button
                                onClick={() => setActiveTab('saved')}
                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'saved' ? 'bg-rustic-800 text-white' : 'text-rustic-700 hover:bg-rustic-50 hover:text-rustic-900'}`}
                            >
                                <FiBookmark className="mr-3" /> Saved Recipes
                            </button>
                            <button
                                onClick={() => setActiveTab('liked')}
                                className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'liked' ? 'bg-rustic-800 text-white' : 'text-rustic-700 hover:bg-rustic-50 hover:text-rustic-900'}`}
                            >
                                <FiHeart className="mr-3" /> Liked Recipes
                            </button>
                        </nav>
                        <div className="mt-6 pt-6 border-t border-rustic-100">
                            <Link to="/dashboard/upload" className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-rustic-900 bg-rustic-200 hover:bg-rustic-300 transition-colors">
                                <FiPlusCircle className="mr-2" /> Upload New Recipe
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-rustic-200 p-8 min-h-[600px]">
                        <h2 className="text-2xl font-heading font-bold text-rustic-900 mb-6 capitalize">{activeTab} Recipes</h2>
                        
                        {fetching ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map(i => <div key={i} className="animate-pulse bg-rustic-100 rounded-xl h-64"></div>)}
                            </div>
                        ) : recipes.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recipes.map(recipe => (
                                    <div key={recipe.id} className="group relative rounded-xl overflow-hidden shadow-sm border border-rustic-200 hover:shadow-md transition-shadow bg-white">
                                        <div className="h-40 overflow-hidden relative">
                                            <img 
                                                src={recipe.thumbnail_path ? `/storage/${recipe.thumbnail_path}` : 'https://images.unsplash.com/photo-1495195134817-a1a28078aca9?auto=format&fit=crop&q=80&w=800'} 
                                                alt={recipe.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {activeTab === 'uploaded' && (
                                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link to={`/dashboard/edit/${recipe.id}`} className="bg-white p-2 rounded-full text-rustic-700 hover:text-rustic-900 shadow-sm">
                                                        <FiEdit2 />
                                                    </Link>
                                                    <button onClick={async () => {
                                                        if(confirm('Delete recipe?')) {
                                                            await axios.delete(`/recipes/${recipe.id}`);
                                                            fetchRecipes();
                                                        }
                                                    }} className="bg-red-50 p-2 rounded-full text-red-600 hover:text-red-800 shadow-sm">
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-heading font-bold text-rustic-900 mb-1 line-clamp-1">
                                                <Link to={`/recipes/${recipe.id}`} className="hover:text-rustic-600">{recipe.title}</Link>
                                            </h3>
                                            <p className="text-sm text-rustic-500 mb-3">{recipe.cuisine_type} • {recipe.difficulty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rustic-100 text-rustic-400 mb-4">
                                    {activeTab === 'uploaded' && <FiList size={32} />}
                                    {activeTab === 'saved' && <FiBookmark size={32} />}
                                    {activeTab === 'liked' && <FiHeart size={32} />}
                                </div>
                                <h3 className="text-xl font-heading font-bold text-rustic-900 mb-2">No recipes found</h3>
                                <p className="text-rustic-500 max-w-sm mx-auto">
                                    You haven't {activeTab} any recipes yet. Explore the community to find inspiration.
                                </p>
                                {activeTab === 'uploaded' && (
                                    <Link to="/dashboard/upload" className="mt-6 inline-block bg-rustic-800 text-white font-medium py-2 px-6 rounded-lg shadow-sm hover:bg-rustic-700 transition-colors">
                                        Upload a Recipe
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
