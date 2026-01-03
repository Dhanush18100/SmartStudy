import React, { useState, useContext } from 'react';
import { ExternalLink, ThumbsUp, User } from 'lucide-react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
console.log("ResourceCard file loaded");



const ResourceCard = ({ resource }) => {
    console.log("originalFileName from DB:", resource.originalFileName);
    const { user } = useContext(AuthContext);
    const [likes, setLikes] = useState(resource.likes || []);


    console.log("Original file name:", resource.originalFileName);




    // Check if saved. user.savedResources might be undefined initially.
    const [isSaved, setIsSaved] = useState(user?.savedResources?.includes(resource._id) || false);

    const isLiked = user && likes.includes(user._id);

    const handleLike = async () => {
        if (!user) return;

        // Optimistic UI update
        let newLikes;
        if (isLiked) {
            newLikes = likes.filter(id => id !== user._id);
        } else {
            newLikes = [...likes, user._id];
        }
        setLikes(newLikes);

        try {
            await axios.put(`${import.meta.env.VITE_BACKENDURL}/api/resources/like/${resource._id}`);
        } catch (err) {
            console.error(err);
            setLikes(resource.likes); // Revert on error
        }
    };



    const handleSave = async () => {
        if (!user) return;

        setIsSaved(!isSaved);
        try {
            await axios.put(`${import.meta.env.VITE_BACKENDURL}/api/auth/save/${resource._id}`);
        } catch (err) {
            console.error(err);
            setIsSaved(!isSaved);
        }
    };


    const downloadFile = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKENDURL}/api/resources/download/${resource._id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      responseType: "blob"
    }
  );

  const url = window.URL.createObjectURL(res.data);
  const a = document.createElement("a");
  a.href = url;
  a.download = resource.originalFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};






    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Post Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {resource.createdBy && resource.createdBy.profilePicture ? (
                            <img src={resource.createdBy.profilePicture} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            resource.createdBy ? resource.createdBy.name.charAt(0).toUpperCase() : <User size={16} />
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 text-sm leading-none">{resource.createdBy ? resource.createdBy.name : 'Unknown User'}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(resource.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    {resource.subject}
                </span>
            </div>

            {/* Post Body */}
            <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed whitespace-pre-wrap">{resource.description}</p>

                {/* File Attachment Box */}
                <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100 flex items-center gap-3 group hover:bg-blue-50 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-500 shadow-sm border border-gray-100">
                        <ExternalLink size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {resource.originalFileName || 'PDF Document'}
                        </p>
                        <p className="text-xs text-blue-600">PDF Document</p>
                    </div>
            <button onClick={downloadFile} className="btn-primary">
  Download PDF
</button>








                </div>
            </div>

            {/* Post Actions */}
            <div className="px-4 py-3 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 transition-colors group ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                    >
                        <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">
                            {likes.length > 0 ? `${likes.length} Likes` : 'Like'}
                        </span>
                    </button>
                </div>

                <button
                    onClick={handleSave}
                    className={`text-gray-600 hover:text-gray-900 transition-colors ${isSaved ? 'text-blue-600' : ''}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ResourceCard;
