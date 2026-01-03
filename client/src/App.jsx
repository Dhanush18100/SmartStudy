import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import ResourceFeed from './pages/ResourceFeed';
import UploadResource from './pages/UploadResource';
import DiscussionBoard from './pages/DiscussionBoard';
import AskQuestion from './pages/AskQuestion';
import QuestionDetail from './pages/QuestionDetail';
import Profile from './pages/Profile';

/* ---------------- Protected Route ---------------- */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/" />;
};

/* ---------------- Redirect if Logged In ---------------- */
const RedirectIfLoggedIn = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/feed');
    }
  }, [navigate]);

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Router>
        <RedirectIfLoggedIn>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ResourceFeed mode="feed" />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/resources"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ResourceFeed mode="grid" />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/saved"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ResourceFeed mode="saved" />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/resources/create"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UploadResource />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/discussions"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DiscussionBoard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/discussions/ask"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AskQuestion />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/discussions/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <QuestionDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />

          </Routes>
        </RedirectIfLoggedIn>
      </Router>
    </AuthProvider>
  );
}

export default App;
