import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Database, ChevronRight, Search, BarChart3, Users, Package, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

type WelcomeScreenProps = {
  onClose: () => void;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<string>("basic");
  
  const sections = [
    {
      id: "basic",
      title: "Basic Queries",
      icon: <Search className="h-5 w-5" />,
      examples: [
        "Show me all active customers",
        "List products with less than 10 items in stock",
        "What are the top 5 most expensive products?",
        "Show all orders placed in the last month"
      ]
    },
    {
      id: "analytics",
      title: "Analytics & Insights",
      icon: <BarChart3 className="h-5 w-5" />,
      examples: [
        "What's the total revenue from all completed orders?",
        "Which customer segment generates the most revenue?",
        "Show me the average order value by region",
        "What product categories have the highest profit margins?"
      ]
    },
    {
      id: "customers",
      title: "Customer Analysis",
      icon: <Users className="h-5 w-5" />,
      examples: [
        "Who are our most valuable customers based on total purchase amount?",
        "Show me customers who joined in 2023 but haven't placed any orders",
        "List customers who have spent more than $1000",
        "What's the distribution of customers across different regions?"
      ]
    },
    {
      id: "inventory",
      title: "Inventory Management",
      icon: <Package className="h-5 w-5" />,
      examples: [
        "Which products are currently out of stock?",
        "Show me products with high stock levels but low sales",
        "What's the total inventory value at retail price?",
        "List products that need restocking (less than 5 units available)"
      ]
    },
    {
      id: "sales",
      title: "Sales Trends",
      icon: <TrendingUp className="h-5 w-5" />,
      examples: [
        "Compare monthly sales between this year and last year",
        "What day of the week has the highest order volume?",
        "Show the trend of average order value over the past 6 months",
        "Which payment method is most popular among customers?"
      ]
    }
  ];

  const handleExampleClick = (example: string) => {
    // In a real implementation, this could set the input field with the example text
    console.log("Selected example:", example);
    // You could call a function passed in props to set this in the parent component
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 relative overflow-hidden">
        <div className="flex items-center space-x-3 relative z-10">
          <div className="h-12 w-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-lg">
            <Database className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">SQL Command Agent</h1>
            <p className="text-indigo-100 text-sm">Convert your natural language questions into powerful SQL queries instantly</p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-purple-400 rounded-full opacity-10 translate-y-1/2"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This AI assistant helps you interact with your database using plain English. Simply ask a question about your data, 
          and the agent will generate and execute the appropriate SQL commands, presenting you with the results.
        </p>

        {/* Example Questions Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Example Questions You Can Ask:</h2>
          
          {/* Category Tabs */}
          <div className="flex overflow-x-auto space-x-2 pb-2 mb-4 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeSection === section.id 
                    ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {section.icon}
                <span>{section.title}</span>
              </button>
            ))}
          </div>
          
          {/* Example List */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
            <ul className="space-y-2">
              {sections.find(s => s.id === activeSection)?.examples.map((example, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleExampleClick(example)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 group transition-colors flex items-center justify-between"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{example}</span>
                    <ChevronRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { number: "1", text: "Type your business question in the input field" },
              { number: "2", text: "Our AI translates your question into SQL commands" },
              { number: "3", text: "The system executes the query against the database" },
              { number: "4", text: "Results are displayed in an easy-to-understand format" }
            ].map((step, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start space-x-3"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium">
                  {step.number}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-2 rounded-lg shadow-md"
          >
            <span>Okay, Let's Start</span>
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;