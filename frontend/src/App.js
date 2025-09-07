import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BlogPost from "./pages/BlogPost";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Header />
                <HomePage />
                <Footer />
              </>
            } />
            <Route path="/post/:slug" element={
              <>
                <Header />
                <BlogPost />
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Header />
                <AboutPage />
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Header />
                <ContactPage />
                <Footer />
              </>
            } />
            
            {/* Login Route */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Admin Route */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <Header />
                <AdminPage />
                <Footer />
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;