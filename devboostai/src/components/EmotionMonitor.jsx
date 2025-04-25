import React, { useState, useEffect, useRef } from 'react';
import { useEmotion } from '../services/EmotionContext';
import { 
  FaceSmileIcon, 
  FaceFrownIcon, 
  QuestionMarkCircleIcon,
  FireIcon,
  ClockIcon,
  HeartIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

// This component provides a visual emotion monitor that can:
// 1. Display current detected emotion
// 2. Allow manual emotion input for demo purposes
// 3. Show emotion history
// 4. In a real app, this would also include webcam-based facial recognition

const EmotionMonitor = ({ demoMode = false, placement = 'bottom-right' }) => {
  const [expanded, setExpanded] = useState(false);
  const [demoInput, setDemoInput] = useState('');
  const [webcamActive, setWebcamActive] = useState(false);
  const { 
    currentEmotion, 
    emotionIntensity, 
    emotionTriggers, 
    processUserInput,
    emotionHistory
  } = useEmotion();
  
  const monitorRef = useRef(null);
  
  // Close monitor when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monitorRef.current && !monitorRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle manual emotion input for demo purposes
  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (demoInput.trim()) {
      processUserInput(demoInput);
      setDemoInput('');
    }
  };
  
  // Get emotion icon based on current emotion
  const getEmotionIcon = (emotion, size = 'h-6 w-6') => {
    switch (emotion) {
      case 'excited':
        return <FireIcon className={`${size} text-orange-500`} />;
      case 'frustrated':
        return <FaceFrownIcon className={`${size} text-red-500`} />;
      case 'confused':
        return <QuestionMarkCircleIcon className={`${size} text-purple-500`} />;
      case 'bored':
        return <ClockIcon className={`${size} text-gray-500`} />;
      case 'anxious':
        return <ExclamationCircleIcon className={`${size} text-yellow-500`} />;
      case 'interested':
        return <HeartIcon className={`${size} text-blue-500`} />;
      default: // neutral
        return <FaceSmileIcon className={`${size} text-green-500`} />;
    }
  };
  
  // Get emotion label and color for display
  const getEmotionDisplay = (emotion) => {
    const config = {
      excited: { label: 'Excited', color: 'text-orange-500', bg: 'bg-orange-100', border: 'border-orange-200' },
      frustrated: { label: 'Frustrated', color: 'text-red-500', bg: 'bg-red-100', border: 'border-red-200' },
      confused: { label: 'Confused', color: 'text-purple-500', bg: 'bg-purple-100', border: 'border-purple-200' },
      bored: { label: 'Disengaged', color: 'text-gray-500', bg: 'bg-gray-100', border: 'border-gray-200' },
      anxious: { label: 'Anxious', color: 'text-yellow-500', bg: 'bg-yellow-100', border: 'border-yellow-200' },
      interested: { label: 'Interested', color: 'text-blue-500', bg: 'bg-blue-100', border: 'border-blue-200' },
      neutral: { label: 'Neutral', color: 'text-green-500', bg: 'bg-green-100', border: 'border-green-200' },
    };
    
    return config[emotion] || config.neutral;
  };
  
  // Format emotion timestamp
  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get position classes based on placement
  const getPositionClasses = () => {
    switch (placement) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
      default:
        return 'bottom-4 right-4';
    }
  };
  
  const positionClasses = getPositionClasses();
  const emotionDisplay = getEmotionDisplay(currentEmotion);
  
  return (
    <div 
      ref={monitorRef}
      className={`fixed ${positionClasses} z-50 transition-all duration-300`}
    >
      {/* Collapsed view - Floating button */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow flex items-center"
        >
          <div className="mr-2">
            {getEmotionIcon(currentEmotion)}
          </div>
          <div className={`${emotionDisplay.color} font-medium text-sm`}>
            {emotionDisplay.label}
          </div>
        </button>
      )}
      
      {/* Expanded view - Full monitor */}
      {expanded && (
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-80 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex justify-between items-center">
            <h3 className="font-medium">Emotion Monitor</h3>
            <div className="flex items-center">
              {demoMode && (
                <span className="text-xs bg-yellow-400 text-yellow-800 px-2 py-0.5 rounded-full mr-2">
                  Demo
                </span>
              )}
              <button
                onClick={() => setExpanded(false)}
                className="text-white hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Current emotion display */}
          <div className={`p-4 ${emotionDisplay.bg} border-b ${emotionDisplay.border}`}>
            <div className="flex items-center">
              <div className="mr-3">
                {getEmotionIcon(currentEmotion, 'h-8 w-8')}
              </div>
              <div>
                <div className={`font-medium ${emotionDisplay.color}`}>
                  {emotionDisplay.label}
                </div>
                <div className="text-xs text-gray-500">
                  Intensity: {Math.round(emotionIntensity * 100)}%
                </div>
                {emotionTriggers.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Detected: {emotionTriggers.slice(0, 3).join(', ')}
                    {emotionTriggers.length > 3 && '...'}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Webcam toggle - In a real implementation, this would activate facial recognition */}
          {demoMode && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Webcam Recognition</span>
                <button
                  onClick={() => setWebcamActive(!webcamActive)}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                    webcamActive ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`${
                      webcamActive ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  />
                </button>
              </div>
              {webcamActive && (
                <div className="mt-2 p-2 bg-gray-100 rounded-md border border-gray-200 text-xs text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>In demo mode, webcam data is simulated.</span>
                </div>
              )}
            </div>
          )}
          
          {/* Demo input - For testing emotions without a webcam */}
          {demoMode && (
            <div className="p-4 border-b border-gray-200">
              <form onSubmit={handleDemoSubmit}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Emotion Detection
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    placeholder="Type to detect emotion..."
                    className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Test
                  </button>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Try words like "confused", "excited", "frustrated"
                </div>
              </form>
            </div>
          )}
          
          {/* Recent emotion history */}
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Emotions</h4>
            <div className="max-h-32 overflow-y-auto">
              {emotionHistory.length > 0 ? (
                <div className="space-y-2">
                  {emotionHistory.slice(-5).reverse().map((item, i) => {
                    const display = getEmotionDisplay(item.emotion);
                    return (
                      <div 
                        key={i}
                        className={`text-xs p-2 rounded-md ${display.bg} border ${display.border} flex items-start`}
                      >
                        <div className="mr-2 mt-0.5">
                          {getEmotionIcon(item.emotion, 'h-4 w-4')}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${display.color}`}>
                            {display.label} 
                            <span className="font-normal ml-1 text-gray-500">
                              ({Math.round(item.intensity * 100)}%)
                            </span>
                          </div>
                          <div className="text-gray-600 mt-0.5 break-all">
                            "{item.text.length > 30 ? item.text.substring(0, 30) + '...' : item.text}"
                          </div>
                          <div className="text-gray-500 mt-0.5">
                            {formatTimestamp(item.timestamp)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-2 text-xs text-gray-500">
                  No emotion history yet
                </div>
              )}
            </div>
          </div>
          
          <div className="p-2 bg-gray-50 border-t border-gray-200 text-xs text-center text-gray-500">
            <p>Adaptive content is enabled based on your emotional state</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionMonitor;