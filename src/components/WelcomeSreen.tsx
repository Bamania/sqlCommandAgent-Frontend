import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Sparkles, Database, ChevronRight, Search, BarChart3, 
  Users, Package, TrendingUp, Copy, Check, ExternalLink, Info
} from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
// import { a } from "react-router-dom";

type WelcomeScreenProps = {
  onClose: () => void;
  onExampleSelect?: (example: string) => void;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onClose, onExampleSelect }) => {
  const [activeSection, setActiveSection] = useState<string>("basic");
  const [copiedExample, setCopiedExample] = useState<string | null>(null);
  const [showDbInfo, setShowDbInfo] = useState(false);
  
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
    if (onExampleSelect) {
      onExampleSelect(example);
    }
    onClose();
  };

  const handleCopyExample = (example: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(example);
    setCopiedExample(example);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 p-8 relative overflow-hidden">
        <div className="flex items-center space-x-4 relative z-10">
          <div className="h-14 w-14 rounded-xl bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-lg shadow-lg transform hover:rotate-12 transition-transform">
            <Database className="h-7 w-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-white">SQL Command Agent</h1>
              <Badge className="bg-white/20 text-white hover:bg-white/30">AI-Powered</Badge>
            </div>
            <p className="text-indigo-100 mt-1">Convert your natural language questions into powerful SQL queries instantly</p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-purple-400 rounded-full opacity-10 translate-y-1/2"></div>
        <div className="absolute -bottom-10 right-20 w-48 h-48 bg-indigo-400 rounded-full opacity-10"></div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
            This AI assistant helps you interact with your database using plain English. Simply ask a question about your data, 
            and the agent will generate and execute the appropriate SQL commands, presenting you with the results.
          </p>
          
          <Button
            variant="outline"
            className="flex items-center gap-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950"
            onClick={() => setShowDbInfo(!showDbInfo)}
          >
            <Info className="h-4 w-4" />
            <span>Database Info</span>
          </Button>
        </div>

        {/* Database Info Section - Collapsible */}
        {showDbInfo && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mb-6 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl p-6 border border-indigo-100 dark:border-indigo-900"
          >
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Database Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-5 w-5 text-indigo-500" />
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Customers Table</h4>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Customer profiles with names and emails</li>
                  <li>• Regional segmentation data</li>
                  <li>• Membership status tracking</li>
                  <li>• Join dates and activity flags</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="h-5 w-5 text-indigo-500" />
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Products Table</h4>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Product details with categories</li>
                  <li>• Cost and retail pricing</li>
                  <li>• Current stock levels</li>
                  <li>• Product availability status</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-indigo-500" />
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Transactions Table</h4>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Order details with timestamps</li>
                  <li>• Customer relationship links</li>
                  <li>• Transaction status tracking</li>
                  <li>• Payment method information</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Example Questions Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <span>Example Questions You Can Ask:</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-2 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-60">Click an example to use it, or click the copy icon to copy to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h2>
          
          {/* Category Tabs */}
          <div className="flex overflow-x-auto space-x-2 pb-2 mb-4 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                  activeSection === section.id 
                    ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 shadow-sm" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {section.icon}
                <span>{section.title}</span>
              </button>
            ))}
          </div>
          
          {/* Example List */}
          <motion.div 
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-800/50 dark:to-indigo-900/20 rounded-xl p-5 border border-indigo-100/50 dark:border-indigo-800/30"
          >
            <ul className="space-y-2.5">
              {sections.find(s => s.id === activeSection)?.examples.map((example, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleExampleClick(example)}
                    className="w-full text-left px-4 py-3 rounded-lg bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 group transition-all border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 shadow-sm hover:shadow flex items-center justify-between"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{example}</span>
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={(e) => handleCopyExample(example, e)}
                              className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                            >
                              {copiedExample === example ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{copiedExample === example ? "Copied!" : "Copy to clipboard"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <ChevronRight size={16} className="text-indigo-400 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* How It Works Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { number: "1", text: "Type your business question in the input field" },
              { number: "2", text: "Our AI translates your question into SQL commands" },
              { number: "3", text: "The system executes the query against the database" },
              { number: "4", text: "Results are displayed in an easy-to-understand format" }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start space-x-3 shadow-sm hover:shadow-md transition-shadow hover:border-indigo-200 dark:hover:border-indigo-800"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-md">
                  {step.number}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <a href="https://www.tldraw.com/f/_X8wcBHm5FFPLDAeYYzWa?d=v-492.-360.3255.1963.CVf-uE6Vebj_hY4UfncgB" className="inline-flex items-center gap-2 px-5 py-2.5 border border-indigo-200 dark:border-indigo-800 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors">
            <ExternalLink className="h-4 w-4" />
            <span>See the Data Flow</span>
          </a>
          
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 hover:from-indigo-600 hover:via-purple-600 hover:to-violet-600 text-white px-8 py-2.5 rounded-lg shadow-md flex items-center gap-2"
          >
            <span>Okay, Let's Start</span>
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;