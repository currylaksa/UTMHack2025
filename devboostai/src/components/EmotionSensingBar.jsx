import React, { useState, useRef, useEffect } from 'react';
import { 
  VideoCameraIcon,
  VideoCameraSlashIcon,
  ClockIcon,
  XMarkIcon,
  PlayIcon,
  BellIcon,
  ArrowPathIcon,
  ChartBarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// Engagement activities when boredom is detected
const engagementActivities = [
  {
    id: 'game',
    title: 'Quick Coding Challenge',
    description: 'Take a 5-minute coding mini-game break to refresh your mind',
    icon: <PlayIcon className="w-6 h-6 text-blue-600"/>
  },
  {
    id: 'break',
    title: '5-Minute Breather',
    description: 'Step away from the screen for a quick mental reset',
    icon: <BellIcon className="w-6 h-6 text-green-600"/>
  },
  {
    id: 'video',
    title: 'Tech Humor Video',
    description: 'Watch a short funny programming video to boost your mood',
    icon: <ArrowPathIcon className="w-6 h-6 text-purple-600"/>
  }
];

// Emotion detection states
const emotionStates = {
  neutral: {
    label: 'Engaged',
    color: 'bg-green-100 text-green-700',
    icon: <SparklesIcon className="w-5 h-5" />
  },
  bored: {
    label: 'Disengaged',
    color: 'bg-amber-100 text-amber-700',
    icon: <ClockIcon className="w-5 h-5" />
  },
  confused: {
    label: 'Confused',
    color: 'bg-purple-100 text-purple-700',
    icon: <ChartBarIcon className="w-5 h-5" />
  }
};

const EmotionSensingBar = () => {
  // Facial detection state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [isBored, setIsBored] = useState(false);
  const [showEngagementOptions, setShowEngagementOptions] = useState(false);
  const [boredDetectionCounter, setBoredDetectionCounter] = useState(0);
  const [emotionHistory, setEmotionHistory] = useState([]);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  
  // Mock emotion detection simulation
  useEffect(() => {
    let emotionInterval;
    
    if (isCameraActive) {
      // For demo purposes, we'll simulate boredom detection after a few seconds
      emotionInterval = setTimeout(() => {
        setCurrentEmotion('bored');
        setIsBored(true);
        setShowEngagementOptions(true); // Auto-show options for demo
        setBoredDetectionCounter(prev => prev + 1);
        
        // Add to emotion history
        setEmotionHistory(prev => [...prev, {
          timestamp: new Date(),
          emotion: 'bored',
          intensity: 0.85
        }]);
        
      }, 5000);
    } else {
      setCurrentEmotion(null);
      setIsBored(false);
      setShowEngagementOptions(false);
    }
    
    return () => {
      clearTimeout(emotionInterval);
    };
  }, [isCameraActive]);
  
  // Handle camera toggle
  const toggleCamera = async () => {
    if (!isCameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        setIsCameraActive(true);
        
        // Add initial emotion to history
        setEmotionHistory([{
          timestamp: new Date(),
          emotion: 'neutral',
          intensity: 0.6
        }]);
        
        // Set initial emotion
        setCurrentEmotion('neutral');
        
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Couldn't access camera. Please check permissions and try again.");
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
      setEmotionHistory([]);
    }
  };

  // Handle showing engagement activities
  const handleEngagementActivity = (activityId) => {
    let responseMessage = "";
    
    switch (activityId) {
      case 'game':
        responseMessage = "Loading coding challenge: Write a function that reverses a string without using the built-in reverse() method.";
        break;
      case 'break':
        responseMessage = "5-minute break timer started. Stand up, stretch, and clear your mind.";
        break;
      case 'video':
        responseMessage = "Opening funny programming video: 'If Programming Languages Were People'";
        break;
      default:
        responseMessage = "Let's find something to re-engage your interest.";
    }
    
    alert(responseMessage);
    setShowEngagementOptions(false);
    setIsBored(false);
    
    // Reset to neutral emotion
    setCurrentEmotion('neutral');
    setEmotionHistory(prev => [...prev, {
      timestamp: new Date(),
      emotion: 'neutral',
      intensity: 0.7
    }]);
  };

  // Close engagement options
  const closeEngagementOptions = () => {
    setShowEngagementOptions(false);
  };

  // Get emotion state details
  const getEmotionState = (emotion) => {
    return emotionStates[emotion] || emotionStates.neutral;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden relative">
      {/* Main Bar - Stylish header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-white/10 p-1.5 rounded-md mr-2">
            <ChartBarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-medium">Emotion-Sensing AI</h3>
            <p className="text-white/70 text-xs">Adaptive content based on engagement</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {currentEmotion && (
            <div className={`px-3 py-1.5 ${getEmotionState(currentEmotion).color} rounded-full flex items-center`}>
              <span className="mr-1.5">
                {getEmotionState(currentEmotion).icon}
              </span>
              <span className="text-xs font-semibold">{getEmotionState(currentEmotion).label}</span>
            </div>
          )}
          
          <button 
            onClick={toggleCamera}
            className={`p-2 rounded-full ${isCameraActive 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-white hover:bg-white/90 text-indigo-700'} transition-all shadow-md`}
            title={isCameraActive ? "Turn off emotion sensing" : "Turn on emotion sensing"}
          >
            {isCameraActive ? 
              <VideoCameraSlashIcon className="w-5 h-5" /> : 
              <VideoCameraIcon className="w-5 h-5" />
            }
          </button>
        </div>
      </div>
      
      {/* Camera feed with improved UI */}
      {isCameraActive && !showEngagementOptions && (
        <div className="flex p-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="flex-grow flex">
            {/* Left: Video feed container */}
            <div className="relative rounded-lg overflow-hidden shadow-md border border-gray-300 w-48 h-36">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="object-cover w-full h-full"
              />
              {currentEmotion === 'bored' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-amber-100 p-2 rounded-full animate-pulse">
                    <ClockIcon className="w-10 h-10 text-amber-600" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Right: Detection information */}
            <div className="ml-4 flex flex-col justify-between flex-grow">
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Emotion Detection</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {currentEmotion 
                    ? `Current state: ${currentEmotion === 'bored' 
                        ? 'User appears disengaged. Preparing adaptive content...'
                        : 'User is engaged with content.'}`
                    : 'Analyzing engagement levels...'}
                </p>
              </div>
              
              {/* Emotion timeline */}
              {emotionHistory.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Engagement timeline:</p>
                  <div className="flex space-x-1 items-center">
                    {emotionHistory.map((entry, index) => {
                      const emotionData = getEmotionState(entry.emotion);
                      return (
                        <div 
                          key={index}
                          className={`h-2 w-${Math.max(2, Math.round(entry.intensity * 10))} rounded-full ${emotionData.color.split(' ')[0]}`}
                          title={`${emotionData.label}: ${new Date(entry.timestamp).toLocaleTimeString()}`}
                        />
                      );
                    })}
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Engagement options popup - enhanced design */}
      {showEngagementOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden transform transition-all animate-fadeIn">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-white rounded-full mr-3">
                  <ClockIcon className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Engagement Alert</h3>
                  <p className="text-white text-opacity-90 text-sm">Our AI detected you might be getting disengaged</p>
                </div>
              </div>
              <button 
                onClick={closeEngagementOptions}
                className="rounded-full p-1 bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6 text-center">
                Would you like to try one of these options to boost your engagement?
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                {engagementActivities.map(activity => (
                  <button
                    key={activity.id}
                    onClick={() => handleEngagementActivity(activity.id)}
                    className="flex flex-col items-center p-5 border border-gray-200 rounded-xl bg-white hover:border-indigo-300 hover:shadow-md transition-all group"
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      activity.id === 'game' ? 'bg-blue-100' :
                      activity.id === 'break' ? 'bg-green-100' : 'bg-purple-100'
                    } group-hover:scale-110 transition-transform`}>
                      {activity.icon}
                    </div>
                    <h4 className="text-base font-medium text-gray-800 mb-2">{activity.title}</h4>
                    <p className="text-sm text-gray-500 text-center">{activity.description}</p>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <button 
                  onClick={closeEngagementOptions}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Continue with current activity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add fade-in animation to index.css
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out forwards;
    }
  </style>
`);

export default EmotionSensingBar;