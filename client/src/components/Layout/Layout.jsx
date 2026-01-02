import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col min-h-screen md:pl-64 transition-all duration-300">
                {/* Mobile Header */}
                <div className="md:hidden bg-white shadow-sm p-4 flex items-center sticky top-0 z-10">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-primary">
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="ml-4 font-bold text-lg text-primary">SmartStudy</span>
                </div>

                <main className="p-4 md:p-8">
                    <div className="max-w-5xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
