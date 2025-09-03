import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun, FaSearch, FaShoppingCart, FaEnvelope, FaCode, FaDesktop, FaPalette, FaLaptopCode, FaTools, FaChartBar, FaBars, FaTimes, FaUser } from "react-icons/fa";
import Logo from "../assets/img/logo.svg"; // SVG logo
import Globe from "../assets/img/globe.png"; // PNG globe
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import "./Header.css";


const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { currentUser, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleLanguage = () => setLanguageOpen(!languageOpen);
  
  // Close menus when clicking outside
  useEffect(() => {
    const closeMenus = (e) => {
      if (!e.target.closest('.mega-menu') && !e.target.closest('.menu-item.dropdown')) {
        setServicesOpen(false);
        setTemplatesOpen(false);
      }
      if (!e.target.closest('.language-dropdown')) {
        setLanguageOpen(false);
      }
      if (!e.target.closest('.search-container')) {
        setSearchOpen(false);
      }
    };
    
    document.addEventListener('click', closeMenus);
    return () => document.removeEventListener('click', closeMenus);
  }, []);
  
  // Close menus when route changes
  useEffect(() => {
    setServicesOpen(false);
    setTemplatesOpen(false);
    setLanguageOpen(false);
    setSearchOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-toggle')) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${darkMode ? "dark" : ""}`}>
      {/* Mobile Menu Toggle */}
      <div className="mobile-menu-toggle md:hidden">
        <button 
          onClick={toggleMobileMenu} 
          className="p-2 text-gray-600 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Top Icons */}
      <div className="top-icons hidden md:flex">
        <div className={`search-container ${searchOpen ? "open" : ""}`}>
          <FaSearch onClick={toggleSearch} className="icon search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>

        <div className="language-dropdown">
          <img src={Globe} alt="Globe" className="globe-icon" />
          <span onClick={toggleLanguage} className="lang-label">
            Language ▾
          </span>
          {languageOpen && (
            <ul className="language-menu dark:bg-dark-800 dark:text-white">
              <li className="dark:hover:bg-dark-700">Dutch</li>
              <li className="dark:hover:bg-dark-700">Spanish</li>
              <li className="dark:hover:bg-dark-700">English</li>
              <li className="dark:hover:bg-dark-700">French</li>
              <li className="dark:hover:bg-dark-700">Chinese</li>
              <li className="dark:hover:bg-dark-700">Arabic</li>
            </ul>
          )}
        </div>

        <div className="dark-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
        </div>

        <a href="mailto:info@dprobo.com" className="icon-link">
          <FaEnvelope className="icon hover:text-primary-600 transition-colors" />
        </a>
        <Link to="/cart" className="icon-link">
          <FaShoppingCart className="icon hover:text-primary-600 transition-colors" />
        </Link>
      </div>

      {/* Lower Menu */}
      <div className="lower-header relative">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Dprobo Logo" />
          </Link>
        </div>

        <nav className="main-menu hidden md:block">
          <ul>
            <li className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link to="/">Home</Link>
            </li>
            <li 
              className={`menu-item dropdown ${servicesOpen ? 'open' : ''}`}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <span>Services</span>
              {servicesOpen && (
                <div className="mega-menu dark:bg-dark-800 dark:text-white">
                  <div className="mega-menu-grid">
                    <div className="mega-menu-section">
                      <h3 className="mega-menu-title dark:text-primary-400">Web Development</h3>
                      <ul className="mega-menu-list">
                        <li>
                          <Link to="/services/frontend" className="mega-menu-item">
                            <FaDesktop className="mega-menu-icon text-primary-600 dark:text-primary-400" />
                            <div>
                              <h4 className="dark:text-white">Frontend Development</h4>
                              <p className="dark:text-dark-300">Modern, responsive UI/UX design</p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/backend" className="mega-menu-item">
                            <FaCode className="mega-menu-icon text-primary-600 dark:text-primary-400" />
                            <div>
                              <h4 className="dark:text-white">Backend Development</h4>
                              <p className="dark:text-dark-300">Scalable server-side solutions</p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/fullstack" className="mega-menu-item">
                            <FaLaptopCode className="mega-menu-icon text-primary-600 dark:text-primary-400" />
                            <div>
                              <h4 className="dark:text-white">Full Stack Development</h4>
                              <p className="dark:text-dark-300">End-to-end web applications</p>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mega-menu-section">
                      <h3 className="mega-menu-title dark:text-primary-400">Design Services</h3>
                      <ul className="mega-menu-list">
                        <li>
                          <Link to="/services/ui-design" className="mega-menu-item">
                            <FaPalette className="mega-menu-icon text-primary-600 dark:text-primary-400" />
                            <div>
                              <h4 className="dark:text-white">UI/UX Design</h4>
                              <p className="dark:text-dark-300">User-centered interface design</p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/branding" className="mega-menu-item">
                            <FaTools className="mega-menu-icon text-primary-600 dark:text-primary-400" />
                            <div>
                              <h4 className="dark:text-white">Branding</h4>
                              <p className="dark:text-dark-300">Logo design and brand identity</p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/analytics" className="mega-menu-item">
                            <FaChartBar className="mega-menu-icon text-primary-600 dark:text-primary-400" />
                            <div>
                              <h4 className="dark:text-white">Analytics</h4>
                              <p className="dark:text-dark-300">Data-driven insights</p>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li 
              className={`menu-item dropdown ${templatesOpen ? 'open' : ''}`}
              onMouseEnter={() => setTemplatesOpen(true)}
              onMouseLeave={() => setTemplatesOpen(false)}
            >
              <span>Templates</span>
              {templatesOpen && (
                <div className="mega-menu dark:bg-dark-800 dark:text-white">
                  <div className="mega-menu-grid">
                    <div className="mega-menu-section">
                      <h3 className="mega-menu-title dark:text-primary-400">Website Templates</h3>
                      <ul className="mega-menu-list">
                        <li>
                          <Link to="/templates" className="mega-menu-item">
                            <FaDesktop className="mega-menu-icon text-primary-600 dark:text-primary-400" />
                            <div>
                              <h4 className="dark:text-white">Portfolio Templates</h4>
                              <p className="dark:text-dark-300">Showcase your work professionally</p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/templates" className="mega-menu-item">
                            <FaLaptopCode className="mega-menu-icon text-primary-600 dark:text-primary-400" />
                            <div>
                              <h4 className="dark:text-white">E-commerce Templates</h4>
                              <p className="dark:text-dark-300">Start selling online quickly</p>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mega-menu-section">
                      <h3 className="mega-menu-title dark:text-primary-400">Design Templates</h3>
                      <ul className="mega-menu-list">
                        <li>
                          <Link to="/templates" className="mega-menu-item">
                            <FaPalette className="mega-menu-icon text-primary-600 dark:text-primary-400" />
                            <div>
                              <h4 className="dark:text-white">UI Kits</h4>
                              <p className="dark:text-dark-300">Pre-designed interface components</p>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/templates" className="mega-menu-item">
                            <FaTools className="mega-menu-icon text-primary-600 dark:text-primary-400" />
                            <div>
                              <h4 className="dark:text-white">Graphic Templates</h4>
                              <p className="dark:text-dark-300">Social media and print designs</p>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className={`menu-item ${location.pathname === '/about' ? 'active' : ''}`}>
              <Link to="/about">About</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/contact' ? 'active' : ''}`}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="lower-actions hidden md:flex">
          <Link to="/custom-design" className="custom-btn bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors">
            Custom Design
          </Link>
          {currentUser ? (
            <Link to="/profile" className="signin-btn flex items-center bg-transparent border border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-2 rounded-md transition-colors">
              <FaUser className="mr-2" />
              Profile
            </Link>
          ) : (
            <Link to="/signin" className="signin-btn bg-transparent border border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-2 rounded-md transition-colors">
              Sign In
            </Link>
          )}
          <Link to="/blog" className="blog-btn bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 text-gray-800 dark:text-white px-4 py-2 rounded-md transition-colors">
            Blog
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="mobile-menu fixed inset-0 z-50 bg-white dark:bg-dark-900 pt-20 px-6 overflow-y-auto"
        >
          <div className="mobile-search mb-6">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full p-3 border border-gray-300 dark:border-dark-700 rounded-md bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
            />
          </div>

          <nav className="mobile-nav">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={`block p-3 rounded-md ${location.pathname === '/' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-dark-800'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="border-b border-gray-200 dark:border-dark-700 pb-2">
                <div className="p-3 font-medium">Services</div>
                <ul className="pl-6 space-y-3 mt-2">
                  <li>
                    <Link 
                      to="/services/frontend" 
                      className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Frontend Development
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/backend" 
                      className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Backend Development
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/fullstack" 
                      className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Full Stack Development
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/ui-design" 
                      className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      UI/UX Design
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/branding" 
                      className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Branding
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/analytics" 
                      className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Analytics
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="border-b border-gray-200 dark:border-dark-700 pb-2">
                <div className="p-3 font-medium">Templates</div>
                <ul className="pl-6 space-y-3 mt-2">
                  <li>
                    <Link 
                      to="/templates" 
                      className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Portfolio Templates
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/templates" 
                      className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      E-commerce Templates
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/templates" 
                      className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      UI Kits
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/templates" 
                      className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Graphic Templates
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`block p-3 rounded-md ${location.pathname === '/about' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-dark-800'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`block p-3 rounded-md ${location.pathname === '/contact' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-dark-800'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className={`block p-3 rounded-md ${location.pathname === '/blog' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-dark-800'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mobile-actions mt-8 space-y-4">
            <Link 
              to="/custom-design" 
              className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Custom Design
            </Link>
            {currentUser ? (
              <Link 
                to="/profile" 
                className="block w-full text-center border border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 p-3 rounded-md transition-colors flex items-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUser className="mr-2" />
                Profile
              </Link>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/signin" 
                  className="block w-full text-center border border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 p-3 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="mobile-footer mt-8 flex justify-between items-center border-t border-gray-200 dark:border-dark-700 pt-4">
            <div className="flex space-x-4">
              <a href="mailto:info@dprobo.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                <FaEnvelope size={20} />
              </a>
              <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                <FaShoppingCart size={20} />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">Theme:</div>
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full bg-gray-100 dark:bg-dark-800"
              >
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
