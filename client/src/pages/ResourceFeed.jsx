import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ResourceCard from '../components/Resources/ResourceCard';

const ResourceFeed = ({ mode = 'grid' }) => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                let url = `${import.meta.env.VITE_BACKENDURL}/api/resources`;
                if (mode === 'saved') {
                    url = `${import.meta.env.VITE_BACKENDURL}/api/resources/saved`;
                }
                const res = await axios.get(url);
                console.log('Fetched resources:', res.data);
                setResources(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                 setLoading(false);
            }
        };

        fetchResources();
    }, [mode]);

    const isFeedMode = mode === 'feed' || mode === 'saved';

    if (loading) {
        return <div className="text-center py-10">Loading resources...</div>;
    }

    return (
        <div className={isFeedMode ? "max-w-xl mx-auto pb-20" : ""}>
            <div className="flex justify-between items-center mb-6 px-2">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {mode === 'saved' ? 'Saved Resources' : (mode === 'feed' ? 'Feed' : 'Resource Library')}
                    </h1>
                    <p className="text-gray-500">
                        {mode === 'saved' ? 'Your personal collection' : (mode === 'feed' ? 'Latest updates from the community' : 'Browse and search all resources')}
                    </p>
                </div>
                {mode !== 'feed' && mode !== 'saved' && (
                    <Link
                        to="/resources/create"
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="hidden md:inline">Upload</span>
                    </Link>
                )}
            </div>

            <div className={isFeedMode ? "space-y-6" : "grid gap-6 md:grid-cols-2 lg:grid-cols-2"}>
                {resources.map((resource) => (
                    <ResourceCard key={resource._id} resource={resource} />
                ))}
            </div>

            {resources.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">No content found. Be the first to share!</p>
                </div>
            )}
        </div>
    );
};

export default ResourceFeed;
