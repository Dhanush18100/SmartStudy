import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const DiscussionBoard = () => {
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/discussions');
                setDiscussions(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchDiscussions();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading discussions...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Discussion Board</h1>
                    <p className="text-gray-500">Ask questions, share knowledge, and collaborate.</p>
                </div>
                <Link
                    to="/discussions/ask"
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Ask Question
                </Link>
            </div>

            <div className="space-y-4">
                {discussions.map((discussion) => (
                    <Link
                        key={discussion._id}
                        to={`/discussions/${discussion._id}`}
                        className="block bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{discussion.title}</h3>
                                <div className="flex gap-2 mb-3">
                                    {discussion.tags.map((tag, index) => (
                                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span className="font-medium text-gray-700">
                                        {discussion.author ? discussion.author.name : 'Unknown'}
                                    </span>
                                    <span>•</span>
                                    <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-gray-50 px-4 py-2 rounded-lg">
                                <MessageSquare className="w-5 h-5 text-gray-400 mb-1" />
                                <span className="font-bold text-gray-700">{discussion.answers.length}</span>
                                <span className="text-xs text-gray-500">Answers</span>
                            </div>
                        </div>
                    </Link>
                ))}

                {discussions.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500">No discussions yet. Start the conversation!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscussionBoard;
