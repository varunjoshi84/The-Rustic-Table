import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiClock, FiHeart, FiBookmark, FiMessageCircle, FiUser, FiSend, FiTrash2 } from 'react-icons/fi';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Interactions
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const fetchRecipe = async () => {
        try {
            const res = await axios.get(`/recipes/${id}`);
            setRecipe(res.data);
            setLikesCount(res.data.likes_count || 0);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // We fetch user's saved/liked state separately if they are logged in
    const fetchUserInteractions = async () => {
        if (!user) return;
        try {
            const [likedRes, savedRes] = await Promise.all([
                axios.get('/dashboard/liked'),
                axios.get('/dashboard/saved')
            ]);
            setIsLiked(likedRes.data.some(r => r.id === parseInt(id)));
            setIsSaved(savedRes.data.some(r => r.id === parseInt(id)));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    useEffect(() => {
        fetchUserInteractions();
    }, [id, user]);

    const handleLike = async () => {
        if (!user) return navigate('/login');
        try {
            if (isLiked) {
                await axios.delete(`/recipes/${id}/unlike`);
                setLikesCount(prev => prev - 1);
            } else {
                await axios.post(`/recipes/${id}/like`);
                setLikesCount(prev => prev + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        if (!user) return navigate('/login');
        try {
            if (isSaved) {
                await axios.delete(`/recipes/${id}/unsave`);
            } else {
                await axios.post(`/recipes/${id}/save`);
            }
            setIsSaved(!isSaved);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) return navigate('/login');
        if (!commentText.trim()) return;

        try {
            await axios.post('/comments', { recipe_id: id, content: commentText });
            setCommentText('');
            fetchRecipe(); // Refresh comments
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!confirm('Delete comment?')) return;
        try {
            await axios.delete(`/comments/${commentId}`);
            fetchRecipe(); // Refresh comments
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!recipe) return <div className="min-h-screen flex items-center justify-center text-2xl font-heading text-rustic-900">Recipe not found.</div>;

    const youtubeId = getYoutubeId(recipe.youtube_url);

    return (
        <div className="bg-rustic-50 min-h-screen pb-20">
            {/* Header / Hero */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
                <div className="mb-6 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-rustic-200 text-rustic-800 text-xs px-3 py-1 rounded-full uppercase tracking-widest font-semibold">
                                {recipe.cuisine_type}
                            </span>
                            <span className="bg-white border border-rustic-200 text-rustic-600 text-xs px-3 py-1 rounded-full uppercase tracking-widest font-semibold">
                                {recipe.difficulty}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-heading font-bold text-rustic-900 mb-4">{recipe.title}</h1>
                        <p className="text-xl text-rustic-700 font-sans italic">{recipe.description}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between border-y border-rustic-200 py-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-rustic-200 overflow-hidden">
                            {recipe.user?.avatar_path ? (
                                <img src={`/storage/${recipe.user.avatar_path}`} alt="author" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-rustic-700">
                                    <FiUser size={24} />
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-rustic-500 uppercase tracking-widest font-semibold">Recipe By</p>
                            <p className="text-lg font-heading font-bold text-rustic-900">{recipe.user?.name}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <FiClock className="mx-auto text-rustic-500 mb-1" size={24} />
                            <p className="text-sm font-semibold text-rustic-800">{recipe.cooking_time} mins</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleLike} className={`p-3 rounded-full flex items-center justify-center transition-colors ${isLiked ? 'bg-red-50 text-red-500' : 'bg-white border border-rustic-200 text-rustic-500 hover:bg-rustic-100'}`}>
                                <FiHeart size={20} className={isLiked ? "fill-current" : ""} />
                            </button>
                            <button onClick={handleSave} className={`p-3 rounded-full flex items-center justify-center transition-colors ${isSaved ? 'bg-rustic-800 text-white' : 'bg-white border border-rustic-200 text-rustic-500 hover:bg-rustic-100'}`}>
                                <FiBookmark size={20} className={isSaved ? "fill-current" : ""} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Media */}
                <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                    {youtubeId ? (
                        <div className="relative w-full pb-[56.25%] h-0">
                            <iframe 
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${youtubeId}`} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : recipe.thumbnail_path ? (
                        <img src={`/storage/${recipe.thumbnail_path}`} alt={recipe.title} className="w-full h-auto max-h-[600px] object-cover" />
                    ) : (
                        <div className="w-full h-96 bg-rustic-200 flex items-center justify-center text-rustic-500 text-xl font-heading">
                            No Media Available
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Ingredients */}
                    <div className="w-full md:w-1/3">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-rustic-200 sticky top-24">
                            <h2 className="text-2xl font-heading font-bold text-rustic-900 mb-6 border-b border-rustic-100 pb-4">Ingredients</h2>
                            <ul className="space-y-4">
                                {recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="h-2 w-2 rounded-full bg-rustic-400 mt-2 mr-3 flex-shrink-0"></span>
                                        <span className="text-rustic-800">{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="w-full md:w-2/3">
                        <h2 className="text-3xl font-heading font-bold text-rustic-900 mb-8">Instructions</h2>
                        <div className="space-y-8">
                            {recipe.cooking_steps && recipe.cooking_steps.map((step, idx) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    key={idx} 
                                    className="flex"
                                >
                                    <div className="flex-shrink-0 mr-6">
                                        <div className="h-12 w-12 rounded-full bg-rustic-800 text-white flex items-center justify-center font-heading font-bold text-xl shadow-md">
                                            {idx + 1}
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-lg text-rustic-800 leading-relaxed font-sans">{step}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Comments */}
                        <div className="mt-16 pt-12 border-t border-rustic-200">
                            <h2 className="text-2xl font-heading font-bold text-rustic-900 mb-8 flex items-center gap-2">
                                <FiMessageCircle /> Comments ({recipe.comments?.length || 0})
                            </h2>
                            
                            {user ? (
                                <form onSubmit={handleCommentSubmit} className="mb-10 flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-rustic-200 flex items-center justify-center text-rustic-700 overflow-hidden">
                                            {user.avatar_path ? (
                                                <img src={`/storage/${user.avatar_path}`} alt="me" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="font-bold">{user.name.charAt(0)}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <textarea
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder="Leave a comment..."
                                            className="w-full border border-rustic-300 rounded-xl p-4 bg-white focus:outline-none focus:ring-2 focus:ring-rustic-500 focus:border-rustic-500 resize-none h-24 shadow-sm"
                                        ></textarea>
                                        <div className="mt-2 flex justify-end">
                                            <button type="submit" className="bg-rustic-800 text-white px-6 py-2 rounded-full font-medium hover:bg-rustic-700 transition-colors flex items-center gap-2">
                                                <FiSend /> Post Comment
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div className="bg-rustic-100 p-6 rounded-xl text-center mb-10 border border-rustic-200">
                                    <p className="text-rustic-700 mb-4">Please log in to leave a comment.</p>
                                    <Link to="/login" className="inline-block bg-white border border-rustic-300 text-rustic-800 px-6 py-2 rounded-full font-medium hover:bg-rustic-50">Log in</Link>
                                </div>
                            )}

                            <div className="space-y-6">
                                {recipe.comments?.map(comment => (
                                    <div key={comment.id} className="bg-white p-6 rounded-xl shadow-sm border border-rustic-100">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="h-10 w-10 rounded-full bg-rustic-200 flex items-center justify-center text-rustic-700 overflow-hidden">
                                                    {comment.user?.avatar_path ? (
                                                        <img src={`/storage/${comment.user.avatar_path}`} alt="user" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="font-bold text-sm">{comment.user?.name?.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-rustic-900">{comment.user?.name}</h4>
                                                    <p className="text-xs text-rustic-500">{new Date(comment.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            {(user?.id === comment.user_id || user?.role === 'admin') && (
                                                <button onClick={() => handleDeleteComment(comment.id)} className="text-rustic-400 hover:text-red-500 transition-colors">
                                                    <FiTrash2 />
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-rustic-700">{comment.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
