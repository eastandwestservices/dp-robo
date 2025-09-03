import React from "react";
import { Link } from "react-router-dom";

function TemplateCard({ template }) {
  return (
    <div className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600">
      <div className="relative overflow-hidden">
        <img 
          src={template.image} 
          alt={template.name} 
          className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {template.featured && (
          <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-dark-800 dark:text-white">{template.name}</h3>
        <p className="text-sm text-dark-500 dark:text-dark-300 mb-3">{template.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-primary-600 dark:text-primary-400">${template.price}</span>
          <Link 
            to={`/templates/${template.id}`}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TemplateCard;
