import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Send, User, Bot, Sparkles, Moon, Sun, RefreshCw, Loader2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

// Types
type Message = {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
};

const ChatInterface: React.FC = () => {
  // Use environment variable for API URL with fallback
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Focus input on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handlers
  const handleSendMessage = async() => {
    if (!inputMessage.trim() || isLoading) return;
    
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      timestamp: new Date(),
      isUser: true
    };
    
    setMessages([...messages, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);    
    try {
      // First API call
      const aiResponse = await axios.post(`${API_URL}/query`, { userQuery: inputMessage });
      
      // Second API call using the result from the first
      const finalOutput = await axios.post(`${API_URL}/parser`, { 
        "userQuery": inputMessage,
        "generatedData": aiResponse.data.result
      });
      
      // Create AI message
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: finalOutput.data.result.finalResponse,
        timestamp: new Date(),
        isUser: false
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Sorry, I couldn't process your request. I can only answer questions related to the demo database .",
        timestamp: new Date(),
        isUser: false
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col w-full h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="py-3 px-4 border-b border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-gray-900 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">SQL Agent</h1>
            <Badge variant="outline" className="ml-2 px-2 py-0 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-xs font-medium">
              Beta
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={clearChat} 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <RefreshCw size={18} className="text-gray-600 dark:text-gray-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={() => setDarkMode(!darkMode)} 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {darkMode ? (
                      <Sun size={18} className="text-gray-600 dark:text-gray-300" />
                    ) : (
                      <Moon size={18} className="text-gray-600 dark:text-gray-300" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{darkMode ? "Light mode" : "Dark mode"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <MoreHorizontal size={18} className="text-gray-600 dark:text-gray-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={clearChat}>Clear chat history</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? "Switch to light mode" : "Switch to dark mode"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-lg animate-pulse"></div>
                <div className="relative h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-4 shadow-xl">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white mt-6">Welcome to Sql agent</h2>
              <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">Start a conversation by typing a message below. I'm here to help with any questions you might have.</p>
              
              <div className="grid grid-cols-2 gap-2 mt-8 w-full max-w-md">
                <Button 
                  variant="outline" 
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-left h-auto flex items-start hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-sm"
                  onClick={() => setInputMessage("Tell me about yourself")}
                >
                  <div>
                    <div className="font-medium mb-1">Introduce yourself</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">What can you help me with?</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-left h-auto flex items-start hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-sm"
                  onClick={() => setInputMessage("What can you do?")}
                >
                  <div>
                    <div className="font-medium mb-1">Capabilities</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">What features do you have?</div>
                  </div>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-6">
              <AnimatePresence>
                {messages.map(message => (
                  <motion.div 
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[85%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'} items-start group`}>
                      <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center shadow-md ${
                        message.isUser ? 
                          'ml-2 bg-gradient-to-br from-indigo-500 to-purple-600' : 
                          'mr-2 bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900'
                      }`}>
                        {message.isUser ? 
                          <User size={16} className="text-white" /> : 
                          <Bot size={16} className="text-white" />
                        }
                      </div>
                      <div 
                        className={`rounded-2xl px-4 py-3 shadow-sm ${
                          message.isUser ? 
                            'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-none' : 
                            'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex flex-col">
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className={`text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                            message.isUser ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex max-w-[85%] items-start">
                    <div className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center mr-2 bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900 shadow-md">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="rounded-2xl px-4 py-3 bg-white dark:bg-gray-800 rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex space-x-2">
                        <Loader2 size={16} className="animate-spin text-indigo-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>
      
      {/* Input Area */}
      <footer className="border-t border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-gray-900 p-4 sticky bottom-0 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center bg-white dark:bg-gray-800 rounded-xl px-4 py-2 shadow-md border border-gray-200 dark:border-gray-700"
          >
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              disabled={isLoading}
            />
            <Button 
              type="submit"
              className={`rounded-lg p-2 ml-2 transition-all ${
                inputMessage.trim() && !isLoading ?
                'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md' :
                'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
              disabled={!inputMessage.trim() || isLoading}
            >
              <Send size={18} className={isLoading ? 'animate-pulse' : ''} />
            </Button>
          </form>
          <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
            Powered by NexusChat AI • Send feedback
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatInterface;