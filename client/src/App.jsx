import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';

// Protected Route Component (Simple Version)
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { Navigate } from 'react-router-dom';

import ResourceFeed from './pages/ResourceFeed';
import UploadResource from './pages/UploadResource';

import DiscussionBoard from './pages/DiscussionBoard';
import AskQuestion from './pages/AskQuestion';
import QuestionDetail from './pages/QuestionDetail';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Routes */}
          <Route path="/resources" element={
            <ProtectedRoute>
              <Layout>
                <ResourceFeed mode="grid" />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/feed" element={
            <ProtectedRoute>
              <Layout>
                <ResourceFeed mode="feed" />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/saved" element={
            <ProtectedRoute>
              <Layout>
                <ResourceFeed mode="saved" />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Placeholders for future routes */}
          <Route path="/resources" element={
            <ProtectedRoute>
              <Layout>
                <ResourceFeed mode="grid" />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/resources/create" element={
            <ProtectedRoute>
              <Layout>
                <UploadResource />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/discussions" element={
            <ProtectedRoute>
              <Layout>
                <DiscussionBoard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/discussions/ask" element={
            <ProtectedRoute>
              <Layout>
                <AskQuestion />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/discussions/:id" element={
            <ProtectedRoute>
              <Layout>
                <QuestionDetail />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
