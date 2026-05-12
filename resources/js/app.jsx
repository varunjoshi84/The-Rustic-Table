import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import GuestRoute from './components/GuestRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RecipeDetails from './pages/RecipeDetails';
import RecipeForm from './pages/RecipeForm';
import AllRecipes from './pages/AllRecipes';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col font-sans selection:bg-rustic-300 selection:text-rustic-900">
                    <ScrollToTop />
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/recipes" element={<AllRecipes />} />
                            <Route path="/categories" element={<AllRecipes />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/dashboard/upload" element={<RecipeForm />} />
                            <Route path="/dashboard/edit/:id" element={<RecipeForm />} />
                            <Route path="/recipes/:id" element={<RecipeDetails />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                        </Routes>
                    </main>
                    <Footer />
                    <BackToTopButton />
                </div>
            </Router>
        </AuthProvider>
    );
}

const rootElement = document.getElementById('app');

if (!window.__reactRoot) {
    window.__reactRoot = ReactDOM.createRoot(rootElement);
}

window.__reactRoot.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);