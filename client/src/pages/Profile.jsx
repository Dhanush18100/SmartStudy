import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Mail, Book, AlignLeft, Save, Edit2 } from 'lucide-react';

const Profile = () => {
    const { user, loadUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        major: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || '',
                major: user.major || ''
            });
        }
    }, [user]);

    const { name, email, bio, major } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.put(`${import.meta.env.VITE_BACKENDURL}/api/auth/profile`, { name, bio, major }, config);

            // Reload user data to update context
            loadUser;

            toast.success('Profile updated successfully');
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            const errMsg = err.response?.data?.msg || 'Failed to update profile';
            toast.error(errMsg);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="p-1 bg-white rounded-full">
                            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-primary text-3xl font-bold border-4 border-white">
                                {name ? name.charAt(0).toUpperCase() : <User />}
                            </div>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isEditing
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'btn-primary'
                                }`}
                        >
                            {isEditing ? 'Cancel' : (
                                <>
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </>
                            )}
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={onChange}
                                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (Cannot be changed)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            disabled
                                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Major / Field of Study</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Book className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="major"
                                            value={major}
                                            onChange={onChange}
                                            placeholder="e.g. Computer Science"
                                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none">
                                            <AlignLeft className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <textarea
                                            name="bio"
                                            value={bio}
                                            onChange={onChange}
                                            rows="4"
                                            placeholder="Tell us about yourself..."
                                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="flex items-center gap-2 btn-primary">
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                                    <p className="mt-1 text-lg text-gray-900">{name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                    <p className="mt-1 text-lg text-gray-900">{email}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Major</h3>
                                    <p className="mt-1 text-lg text-gray-900">{major || 'Not specified'}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{bio || 'No bio yet.'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
