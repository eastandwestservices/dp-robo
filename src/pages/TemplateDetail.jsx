import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaEye, FaDownload, FaCheck } from 'react-icons/fa';

function TemplateDetail() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample template data - in a real app, this would come from an API or database
  const templates = [
    {
      id: 1,
      name: "E-Commerce Pro",
      description: "Modern e-commerce template with cart functionality",
      fullDescription: "A comprehensive e-commerce solution with product listings, cart functionality, checkout process, and user account management. Built with React and styled with Tailwind CSS for a modern, responsive design.",
      price: 49.99,
      image: "/assets/img/ecommerce-template.png",
      featured: true,
      features: [
        "Responsive design for all devices",
        "Product filtering and search",
        "Shopping cart and checkout",
        "User authentication",
        "Admin dashboard",
        "Payment gateway integration"
      ],
      techStack: ["React", "Tailwind CSS", "Firebase", "Stripe"],
      demoUrl: "https://example.com/demo",
      category: "E-commerce"
    },
    {
      id: 2,
      name: "Portfolio Plus",
      description: "Showcase your work with this elegant portfolio",
      fullDescription: "An elegant portfolio template designed for creatives to showcase their work. Features a clean, minimal design with smooth animations and transitions for an engaging user experience.",
      price: 39.99,
      image: "/assets/img/portfolio-template.png",
      featured: false,
      features: [
        "Project showcase with filtering",
        "About me section",
        "Skills and experience display",
        "Contact form",
        "Blog integration",
        "Social media links"
      ],
      techStack: ["React", "Tailwind CSS", "Framer Motion", "Netlify Forms"],
      demoUrl: "https://example.com/demo",
      category: "Portfolio"
    },
    {
      id: 3,
      name: "Business Elite",
      description: "Professional template for corporate websites",
      fullDescription: "A professional template designed for corporate websites. Features a clean, modern design with sections for services, team members, testimonials, and contact information.",
      price: 59.99,
      image: "/assets/img/ecommerce-template.png",
      featured: false,
      features: [
        "Service showcase",
        "Team member profiles",
        "Testimonial carousel",
        "Contact form with validation",
        "Newsletter signup",
        "Google Maps integration"
      ],
      techStack: ["React", "Tailwind CSS", "EmailJS", "Google Maps API"],
      demoUrl: "https://example.com/demo",
      category: "Business"
    },
    {
      id: 4,
      name: "Blog Master",
      description: "Perfect template for bloggers and content creators",
      fullDescription: "A feature-rich blog template designed for content creators. Includes categories, tags, search functionality, and a clean reading experience.",
      price: 29.99,
      image: "/assets/img/portfolio-template.png",
      featured: true,
      features: [
        "Category and tag filtering",
        "Search functionality",
        "Related posts",
        "Comment system",
        "Social sharing",
        "Reading time estimation"
      ],
      techStack: ["React", "Tailwind CSS", "Markdown", "Firebase"],
      demoUrl: "https://example.com/demo",
      category: "Blog"
    },
    {
      id: 5,
      name: "Restaurant Deluxe",
      description: "Showcase your menu and take reservations",
      fullDescription: "A specialized template for restaurants and cafes. Features menu display, reservation system, and location information.",
      price: 49.99,
      image: "/assets/img/ecommerce-template.png",
      featured: false,
      features: [
        "Menu display with categories",
        "Reservation system",
        "Location with map",
        "Opening hours",
        "Photo gallery",
        "Customer testimonials"
      ],
      techStack: ["React", "Tailwind CSS", "Google Maps API", "Calendar API"],
      demoUrl: "https://example.com/demo",
      category: "Restaurant"
    },
    {
      id: 6,
      name: "Agency Pro",
      description: "Highlight your services and team members",
      fullDescription: "A professional template for agencies to showcase their services, team members, and past work. Includes case studies and client testimonials.",
      price: 54.99,
      image: "/assets/img/portfolio-template.png",
      featured: false,
      features: [
        "Service showcase",
        "Team member profiles",
        "Case studies",
        "Client testimonials",
        "Contact form",
        "Blog section"
      ],
      techStack: ["React", "Tailwind CSS", "Framer Motion", "EmailJS"],
      demoUrl: "https://example.com/demo",
      category: "Agency"
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch template details
    setLoading(true);
    setTimeout(() => {
      const foundTemplate = templates.find(t => t.id === parseInt(id));
      setTemplate(foundTemplate);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Template Not Found</h2>
        <p className="mb-6">The template you're looking for doesn't exist or has been removed.</p>
        <Link to="/templates" className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
          <FaArrowLeft className="mr-2" /> Back to Templates
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/templates" className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
          <FaArrowLeft className="mr-2" /> Back to Templates
        </Link>
      </div>

      {/* Template Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/2">
          <div className="bg-white dark:bg-dark-700 rounded-lg overflow-hidden shadow-md">
            <img 
              src={template.image} 
              alt={template.name} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-md h-full">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">{template.name}</h1>
            
            {template.featured && (
              <div className="inline-block bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded mb-4">
                Featured
              </div>
            )}
            
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Category: {template.category}
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">{template.fullDescription}</p>
            
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">${template.price}</span>
              <a 
                href={template.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                <FaEye className="mr-2" /> Live Preview
              </a>
            </div>
            
            <div className="space-y-4">
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center">
                <FaShoppingCart className="mr-2" /> Add to Cart
              </button>
              
              <button className="w-full border border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 py-3 px-4 rounded-md transition-colors flex items-center justify-center">
                <FaDownload className="mr-2" /> Download Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-dark-700 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex border-b border-gray-200 dark:border-dark-600">
          <button 
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'features' ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'tech' ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('tech')}
          >
            Tech Stack
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Template Overview</h3>
              <p className="text-gray-700 dark:text-gray-300">{template.fullDescription}</p>
            </div>
          )}
          
          {activeTab === 'features' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Key Features</h3>
              <ul className="space-y-2">
                {template.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === 'tech' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {template.techStack.map((tech, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 dark:bg-dark-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Templates */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Related Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates
            .filter(t => t.category === template.category && t.id !== template.id)
            .slice(0, 3)
            .map(relatedTemplate => (
              <div key={relatedTemplate.id} className="bg-white dark:bg-dark-700 rounded-lg overflow-hidden shadow-md">
                <img 
                  src={relatedTemplate.image} 
                  alt={relatedTemplate.name} 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{relatedTemplate.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{relatedTemplate.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary-600 dark:text-primary-400">${relatedTemplate.price}</span>
                    <Link 
                      to={`/templates/${relatedTemplate.id}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TemplateDetail;