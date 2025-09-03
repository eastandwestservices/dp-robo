import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StripeBackground from "./components/StripeBackground";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

// Import pages
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import TemplateDetail from "./pages/TemplateDetail";
import Blog from "./pages/Blog";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";

function AppContent() {
  const { darkMode } = useTheme();
  
  return (
    <Router>
      {/* Animated background behind all content */}
      <StripeBackground />
      
      {/* Header stays on top */}
      <Header />

      {/* Main content */}
      <div className={`container-custom py-8 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:id" element={<TemplateDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
