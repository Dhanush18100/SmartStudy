import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Navbar */}
            <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                            S
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            SmartStudy
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
                            Log In
                        </Link>
                        <Link to="/register" className="btn-primary">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 rounded-bl-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-indigo-50/50 rounded-tr-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Master Your Studies <br />
                        <span className="text-blue-600">Together.</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        Join the ultimate social learning platform. Share resources, discuss complex topics, and track your academic journey with peers from around the world.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/login" className="btn-primary px-8 py-3 text-lg flex items-center gap-2">
                            Start Learning Now
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to excel</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            We provide the tools you need to collaborate, share, and succeed in your academic pursuits.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Resource Sharing</h3>
                            <p className="text-gray-600">
                                Upload and discover high-quality study materials, notes, and PDFs shared by the community.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Community Discussions</h3>
                            <p className="text-gray-600">
                                Ask questions, provide answers, and engage in meaningful discussions with fellow students.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Profile & Portfolio</h3>
                            <p className="text-gray-600">
                                Showcase your academic achievements, bio, and contributions on your personal profile.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                                    S
                                </div>
                                <span className="text-xl font-bold">SmartStudy</span>
                            </div>
                            <p className="text-gray-400 max-w-xs">
                                Empowering students worldwide to achieve their academic goals through collaboration.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Platform</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
                                <li><Link to="/discussions" className="hover:text-white">Discussions</Link></li>
                                <li><Link to="/login" className="hover:text-white">Login</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} SmartStudy. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
