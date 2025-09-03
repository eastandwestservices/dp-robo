import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaPalette, FaCode, FaLaptopCode, FaChartBar, FaShieldAlt } from 'react-icons/fa';

function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 flex flex-col items-center justify-center text-center px-4">
        <div className="mb-8 animate-bounce-slow">
          <img 
            src="/assets/img/logo.darkmood.svg" 
            alt="DP Robo Logo" 
            className="w-48 md:w-64 h-auto mx-auto"
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent leading-tight">
          Modern Web Solutions
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-700 dark:text-gray-300">
          Premium website templates, banners, and custom web solutions for your business
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/templates" className="btn-primary text-center px-8 py-3 text-lg">
            Browse Templates
          </Link>
          <Link to="/contact" className="btn-outline text-center px-8 py-3 text-lg">
            Custom Solutions
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-gray-50 dark:bg-dark-800">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose <span className="text-primary-600 dark:text-primary-400">DP Robo</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary-600 dark:text-primary-400 text-4xl mb-4">
                <FaRocket />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Fast Performance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimized templates that load quickly and provide a smooth user experience.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary-600 dark:text-primary-400 text-4xl mb-4">
                <FaPalette />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Modern Design</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Beautiful, contemporary designs that make your brand stand out from the competition.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary-600 dark:text-primary-400 text-4xl mb-4">
                <FaCode />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Clean Code</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Well-structured, maintainable code that follows best practices and industry standards.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary-600 dark:text-primary-400 text-4xl mb-4">
                <FaLaptopCode />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Responsive</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fully responsive designs that work perfectly on all devices, from mobile to desktop.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary-600 dark:text-primary-400 text-4xl mb-4">
                <FaChartBar />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">SEO Optimized</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built with search engine optimization in mind to help your site rank higher.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-primary-600 dark:text-primary-400 text-4xl mb-4">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Secure</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Security best practices implemented to protect your site and your users' data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-gradient-to-r from-primary-600 to-primary-400 text-white text-center px-4">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Choose from our premium templates or request a custom solution tailored to your needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/templates" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors text-lg">
              View Templates
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md font-medium transition-colors text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
