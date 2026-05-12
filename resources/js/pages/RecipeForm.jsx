import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import axios from '../utils/axios';

export default function RecipeForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        cuisine_type: 'Italian',
        difficulty: 'Medium',
        cooking_time: 30,
        youtube_url: '',
    });
    
    const [ingredients, setIngredients] = useState(['']);
    const [cookingSteps, setCookingSteps] = useState(['']);
    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            const fetchRecipe = async () => {
                try {
                    const res = await axios.get(`/recipes/${id}`);
                    const data = res.data;
                    setFormData({
                        title: data.title,
                        description: data.description,
                        cuisine_type: data.cuisine_type,
                        difficulty: data.difficulty,
                        cooking_time: data.cooking_time,
                        youtube_url: data.youtube_url || '',
                    });
                    setIngredients(data.ingredients || ['']);
                    setCookingSteps(data.cooking_steps || ['']);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchRecipe();
        }
    }, [id, isEdit]);

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleStepChange = (index, value) => {
        const newSteps = [...cookingSteps];
        newSteps[index] = value;
        setCookingSteps(newSteps);
    };

    const addIngredient = () => setIngredients([...ingredients, '']);
    const removeIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));

    const addStep = () => setCookingSteps([...cookingSteps, '']);
    const removeStep = (index) => setCookingSteps(cookingSteps.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('ingredients', JSON.stringify(ingredients.filter(i => i.trim() !== '')));
        data.append('cooking_steps', JSON.stringify(cookingSteps.filter(s => s.trim() !== '')));
        
        if (thumbnail) {
            data.append('thumbnail', thumbnail);
        }

        try {
            if (isEdit) {
                // Laravel handles PUT with file upload via POST _method=PUT
                data.append('_method', 'PUT');
                await axios.post(`/recipes/${id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('/recipes', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save recipe.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-xl border border-rustic-200 p-8">
                <h1 className="text-3xl font-heading font-bold text-rustic-900 mb-8 border-b border-rustic-100 pb-4">
                    {isEdit ? 'Edit Recipe' : 'Create New Recipe'}
                </h1>

                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium text-rustic-700 mb-1">Recipe Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                className="w-full border-rustic-300 rounded-xl p-3 bg-rustic-50 focus:ring-rustic-500 focus:border-rustic-500 border"
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium text-rustic-700 mb-1">Description</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                                className="w-full border-rustic-300 rounded-xl p-3 bg-rustic-50 focus:ring-rustic-500 focus:border-rustic-500 border resize-none"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-rustic-700 mb-1">Cuisine Type</label>
                            <select
                                value={formData.cuisine_type}
                                onChange={e => setFormData({...formData, cuisine_type: e.target.value})}
                                className="w-full border-rustic-300 rounded-xl p-3 bg-rustic-50 focus:ring-rustic-500 focus:border-rustic-500 border"
                            >
                                <option value="Italian">Italian</option>
                                <option value="Indian">Indian</option>
                                <option value="Chinese">Chinese</option>
                                <option value="French">French</option>
                                <option value="Desserts">Desserts</option>
                                <option value="Street Food">Street Food</option>
                                <option value="Fast Food">Fast Food</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-rustic-700 mb-1">Difficulty</label>
                            <select
                                value={formData.difficulty}
                                onChange={e => setFormData({...formData, difficulty: e.target.value})}
                                className="w-full border-rustic-300 rounded-xl p-3 bg-rustic-50 focus:ring-rustic-500 focus:border-rustic-500 border"
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-rustic-700 mb-1">Cooking Time (mins)</label>
                            <input
                                type="number"
                                required
                                min="1"
                                value={formData.cooking_time}
                                onChange={e => setFormData({...formData, cooking_time: e.target.value})}
                                className="w-full border-rustic-300 rounded-xl p-3 bg-rustic-50 focus:ring-rustic-500 focus:border-rustic-500 border"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-rustic-700 mb-1">YouTube URL</label>
                            <input
                                type="url"
                                value={formData.youtube_url}
                                onChange={e => setFormData({...formData, youtube_url: e.target.value})}
                                placeholder="https://youtube.com/watch?v=..."
                                className="w-full border-rustic-300 rounded-xl p-3 bg-rustic-50 focus:ring-rustic-500 focus:border-rustic-500 border"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-rustic-700 mb-1">Thumbnail Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setThumbnail(e.target.files[0])}
                                className="w-full border-rustic-300 rounded-xl p-2.5 bg-rustic-50 focus:ring-rustic-500 focus:border-rustic-500 border file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rustic-200 file:text-rustic-700 hover:file:bg-rustic-300"
                            />
                        </div>
                    </div>

                    <div className="border-t border-rustic-100 pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-heading font-bold text-rustic-900">Ingredients</h3>
                            <button type="button" onClick={addIngredient} className="text-sm flex items-center bg-rustic-100 px-3 py-1.5 rounded-full text-rustic-800 hover:bg-rustic-200 transition-colors">
                                <FiPlus className="mr-1" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {ingredients.map((ing, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        required
                                        value={ing}
                                        onChange={e => handleIngredientChange(idx, e.target.value)}
                                        className="flex-1 border-rustic-300 rounded-xl p-3 bg-white focus:ring-rustic-500 focus:border-rustic-500 border shadow-sm"
                                        placeholder="e.g. 2 cups of flour"
                                    />
                                    {ingredients.length > 1 && (
                                        <button type="button" onClick={() => removeIngredient(idx)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                            <FiTrash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-rustic-100 pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-heading font-bold text-rustic-900">Cooking Instructions</h3>
                            <button type="button" onClick={addStep} className="text-sm flex items-center bg-rustic-100 px-3 py-1.5 rounded-full text-rustic-800 hover:bg-rustic-200 transition-colors">
                                <FiPlus className="mr-1" /> Add Step
                            </button>
                        </div>
                        <div className="space-y-4">
                            {cookingSteps.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-rustic-800 text-white flex items-center justify-center font-bold">
                                        {idx + 1}
                                    </div>
                                    <textarea
                                        required
                                        rows={3}
                                        value={step}
                                        onChange={e => handleStepChange(idx, e.target.value)}
                                        className="flex-1 border-rustic-300 rounded-xl p-3 bg-white focus:ring-rustic-500 focus:border-rustic-500 border shadow-sm resize-none"
                                        placeholder="Describe this step..."
                                    />
                                    {cookingSteps.length > 1 && (
                                        <button type="button" onClick={() => removeStep(idx)} className="p-3 mt-1 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                            <FiTrash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-rustic-100 pt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-rustic-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-rustic-700 transition-colors disabled:opacity-70 shadow-md"
                        >
                            {loading ? 'Saving...' : 'Save Recipe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
