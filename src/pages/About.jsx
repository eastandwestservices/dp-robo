import React from 'react';

function About() {
  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">About DP Robo</h1>
        <p className="text-lg text-dark-500 dark:text-dark-300 max-w-2xl mx-auto">
          We create premium website templates and custom web solutions for businesses of all sizes
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-dark-700 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4 text-dark-600 dark:text-dark-300">
              At DP Robo, we believe that every business deserves a professional online presence. Our mission is to provide high-quality website templates and custom web solutions that help businesses succeed in the digital world.
            </p>
            <p className="text-dark-600 dark:text-dark-300">
              We combine modern design principles with cutting-edge technology to create websites that not only look great but also perform exceptionally well.
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-700 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="mb-4 text-dark-600 dark:text-dark-300">
              Our team consists of passionate designers, developers, and digital marketers who are dedicated to helping our clients achieve their goals. With years of experience in the industry, we have the expertise to deliver solutions that meet the unique needs of each client.
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-700 rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
            <ul className="space-y-2 text-dark-600 dark:text-dark-300">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Premium quality templates with modern design</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Responsive designs that work on all devices</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Clean, well-documented code</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Regular updates and improvements</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Dedicated customer support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;