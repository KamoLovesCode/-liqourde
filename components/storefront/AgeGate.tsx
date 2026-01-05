import React, { useState, useEffect } from 'react';

const AgeGate: React.FC<{ onVerify: () => void }> = ({ onVerify }) => {
  const [error, setError] = useState('');

  const handleEnter = () => {
    // Simple check - in real app would check date
    localStorage.setItem('spiritflow_age_verified', 'true');
    onVerify();
  };

  const handleExit = () => {
    setError("You must be of legal drinking age to enter this site.");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl p-8 text-center shadow-2xl">
        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-4">Welcome to SpiritFlow</h1>
        <p className="text-gray-600 mb-8">
            You must be of legal drinking age to enter this site.
            Please verify your age to continue.
        </p>
        
        {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
                {error}
            </div>
        )}

        <div className="space-y-3">
            <button 
                onClick={handleEnter}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
            >
                Yes, I am of legal drinking age
            </button>
            <button 
                onClick={handleExit}
                className="w-full py-4 bg-white text-gray-500 font-medium rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
            >
                No, I am not
            </button>
        </div>
        
        <p className="text-xs text-gray-400 mt-8">
            By entering this site you agree to our Terms of Service and Privacy Policy.
            Please drink responsibly.
        </p>
      </div>
    </div>
  );
};

export default AgeGate;
