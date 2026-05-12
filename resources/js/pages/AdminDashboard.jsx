import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiTrash2, FiBookOpen, FiMessageCircle } from 'react-icons/fi';
import axios from '../utils/axios';

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== 'admin') {
                navigate('/login');
            } else {
                fetchUsers();
            }
        }
    }, [user, loading, navigate]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/admin/users');
            setUsers(res.data);
        } catch (error) {
            console.error('Error fetching admin data', error);
        } finally {
            setFetching(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (confirm('Are you sure you want to delete this user and all their data?')) {
            try {
                await axios.delete(`/admin/users/${id}`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user', error);
            }
        }
    };

    if (loading || fetching) return <div className="min-h-screen flex items-center justify-center">Loading Admin...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-heading font-bold text-rustic-900 mb-8 border-b border-rustic-200 pb-4">
                Admin Dashboard
            </h1>

            <div className="bg-white rounded-2xl shadow-sm border border-rustic-200 overflow-hidden">
                <div className="p-6 border-b border-rustic-200 bg-rustic-50 flex items-center gap-3">
                    <FiUsers className="text-rustic-700 text-xl" />
                    <h2 className="text-xl font-bold text-rustic-900">Manage Users</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-rustic-200">
                        <thead className="bg-rustic-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-rustic-700 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-rustic-700 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-rustic-700 uppercase tracking-wider">Recipes</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-rustic-700 uppercase tracking-wider">Comments</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-rustic-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-rustic-200">
                            {users.map(u => (
                                <tr key={u.id} className="hover:bg-rustic-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-rustic-200 flex items-center justify-center font-bold text-rustic-700 overflow-hidden">
                                                {u.avatar_path ? (
                                                    <img src={`/storage/${u.avatar_path}`} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    u.name.charAt(0)
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-rustic-900">{u.name}</div>
                                                <div className="text-sm text-rustic-500">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-rustic-700">
                                        <div className="flex items-center gap-1">
                                            <FiBookOpen className="text-rustic-400" /> {u.recipes_count || 0}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-rustic-700">
                                        <div className="flex items-center gap-1">
                                            <FiMessageCircle className="text-rustic-400" /> {u.comments_count || 0}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {u.id !== user.id && (
                                            <button 
                                                onClick={() => handleDeleteUser(u.id)}
                                                className="text-red-600 hover:text-red-900 flex items-center gap-1 bg-red-50 px-3 py-1 rounded-md transition-colors"
                                            >
                                                <FiTrash2 /> Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
