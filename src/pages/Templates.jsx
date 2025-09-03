import React from "react";
import TemplateCard from "../components/TemplateCard";

function Templates() {
  // Sample template data
  const templates = [
    {
      id: 1,
      name: "E-Commerce Pro",
      description: "Modern e-commerce template with cart functionality",
      price: 49.99,
      image: "/assets/img/ecommerce-template.png",
      featured: true
    },
    {
      id: 2,
      name: "Portfolio Plus",
      description: "Showcase your work with this elegant portfolio",
      price: 39.99,
      image: "/assets/img/portfolio-template.png",
      featured: false
    },
    {
      id: 3,
      name: "Business Elite",
      description: "Professional template for corporate websites",
      price: 59.99,
      image: "/assets/img/ecommerce-template.png",
      featured: false
    },
    {
      id: 4,
      name: "Blog Master",
      description: "Perfect template for bloggers and content creators",
      price: 29.99,
      image: "/assets/img/portfolio-template.png",
      featured: true
    },
    {
      id: 5,
      name: "Restaurant Deluxe",
      description: "Showcase your menu and take reservations",
      price: 49.99,
      image: "/assets/img/ecommerce-template.png",
      featured: false
    },
    {
      id: 6,
      name: "Agency Pro",
      description: "Highlight your services and team members",
      price: 69.99,
      image: "/assets/img/portfolio-template.png",
      featured: false
    },
  ];

  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Website Templates</h1>
        <p className="text-lg text-dark-500 dark:text-dark-300 max-w-2xl mx-auto">
          Browse our collection of premium website templates for your next project
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}

export default Templates;
