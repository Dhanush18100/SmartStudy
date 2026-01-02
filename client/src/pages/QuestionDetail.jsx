import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { User } from 'lucide-react';

const QuestionDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [discussion, setDiscussion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answerText, setAnswerText] = useState('');

    useEffect(() => {
        const fetchDiscussion = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/discussions/${id}`);
                setDiscussion(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchDiscussion();
    }, [id]);

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/discussions/answer/${id}`, {
                text: answerText
            });
            // Update local state by adding the new answer (returned from backend as updated array)
            setDiscussion({ ...discussion, answers: res.data });
            setAnswerText('');
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!discussion) return <div className="text-center py-10">Question not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-lg">
                        {discussion.author && discussion.author.name ? discussion.author.name.charAt(0).toUpperCase() : <User />}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{discussion.title}</h1>
                        <p className="text-sm text-gray-500">
                            Asked by <span className="font-medium text-gray-900">{discussion.author ? discussion.author.name : 'Unknown'}</span> on {new Date(discussion.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="prose max-w-none text-gray-800 mb-6">
                    <p>{discussion.content}</p>
                </div>

                <div className="flex gap-2">
                    {discussion.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{discussion.answers.length} Answers</h3>

                <div className="space-y-6">
                    {discussion.answers.map((answer, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold shrink-0">
                                    {answer.author && answer.author.name ? answer.author.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium text-gray-900">
                                            {answer.author && answer.author.name ? answer.author.name : (answer.name || 'User')}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(answer.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{answer.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Answer</h3>
                <form onSubmit={handleAnswerSubmit}>
                    <textarea
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-4"
                        placeholder="Write your answer here..."
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" className="btn-primary">
                        Post Answer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuestionDetail;
