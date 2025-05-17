import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import WelcomeScreen from './components/WelcomeSreen';

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  
  // Get from local storage if user has seen the welcome screen before
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenSQLWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);
  
  const handleWelcomeClose = () => {
    setShowWelcome(false);
    // Save to local storage so we don't show welcome again
    localStorage.setItem('hasSeenSQLWelcome', 'true');
  };
  
  return (
    <div className="App">
      {showWelcome ? (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <WelcomeScreen onClose={handleWelcomeClose} />
        </div>
      ) : (
        <ChatInterface />
      )}
    </div>
  );
};

export default App;