import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, MessageSquare, PlusCircle, LogOut, User, Bookmark } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
    const { logout, user } = useContext(AuthContext);
    const location = useLocation();
    
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/feed', icon: Home, label: 'Feed' },
        { path: '/resources', icon: BookOpen, label: 'Resources' },
        { path: '/saved', icon: Bookmark, label: 'Saved Resources' },
        { path: '/discussions', icon: MessageSquare, label: 'Discussions' },
        { path: '/resources/create', icon: PlusCircle, label: 'Upload' },
    ];
    const navigate=useNavigate();
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 md:hidden"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar Container */}
            <div onClick={onClose} className={`h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col z-30 transition-transform duration-300 transform 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0`}>

                <div className="p-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <BookOpen  className="w-8 h-8" />
                        SmartStudy
                    </h1>
                    {/* Close Button for Mobile */}
                    <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                                ? 'bg-blue-50 text-primary font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            onClick={() => onClose && onClose()} // Close sidebar on nav click (mobile)
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">
                            {user ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {user ? user.name : 'Guest'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {user ? user.major || 'Student' : 'View Profile'}
                            </p>
                        </div>
                    </Link>
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
