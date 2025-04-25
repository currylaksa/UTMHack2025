import React, { useState, useRef, useEffect } from 'react';
import { 
  VideoCameraIcon, 
  XMarkIcon,
  FaceSmileIcon,
  PlayIcon,
  ClockIcon,
  FilmIcon
} from '@heroicons/react/24/outline';

const EmotionDetector = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isBoredDetected, setIsBoredDetected] = useState(false);
  const [showBoredomModal, setShowBoredomModal] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  // Toggle camera on/off
  const toggleCamera = async () => {
    if (isCameraOpen) {
      // Turn off camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      // Clear the timer if it exists
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      
      setIsCameraOpen(false);
      setIsBoredDetected(false);
    } else {
      try {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user" }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        streamRef.current = stream;
        setIsCameraOpen(true);
        
        // Start fake emotion detection after camera is opened
        timerRef.current = setTimeout(() => {
          console.log("Setting boredom detected to true");
          setIsBoredDetected(true);
        }, 5000);
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access your camera. Please check permissions and try again.");
      }
    }
  };

  // Handle boredom icon click
  const handleBoredomIconClick = () => {
    setShowBoredomModal(true);
    setIsBoredDetected(false); // Hide the boredom icon when modal is shown
  };

  // Handle engagement option selection
  const handleEngagementOption = (option) => {
    // In a real implementation, these would navigate to games/videos or set timers
    console.log(`Selected option: ${option}`);
    setShowBoredomModal(false);
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // For demo purposes, make sure boredom detection happens regardless of camera state
  useEffect(() => {
    if (isCameraOpen) {
      timerRef.current = setTimeout(() => {
        console.log("Setting boredom detected to true (from useEffect)");
        setIsBoredDetected(true);
      }, 5000);
      
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [isCameraOpen]);

  return (
    <div className="relative">
      {/* Camera Toggle Button */}
      <div className="fixed bottom-6 left-6 z-20">
        <button
          onClick={toggleCamera}
          className={`rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-200 ${
            isCameraOpen ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'
          }`}
        >
          {isCameraOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <VideoCameraIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Camera Preview */}
      {isCameraOpen && (
        <div className="fixed bottom-20 left-6 z-10 rounded-lg overflow-hidden shadow-lg border-2 border-blue-500">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-48 h-36 object-cover"
          />
          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            Emotion Sensing Active
          </div>
        </div>
      )}

      {/* Boredom Detected Icon */}
      {isBoredDetected && (
        <div 
          className="fixed bottom-20 right-6 z-20 cursor-pointer animate-pulse"
          onClick={handleBoredomIconClick}
        >
          <div className="bg-yellow-500 rounded-full p-3 shadow-lg flex items-center justify-center">
            <FaceSmileIcon className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-black/70 text-white px-2 py-1 rounded whitespace-nowrap">
            Boredom Detected
          </span>
        </div>
      )}

      {/* Engagement Modal */}
      {showBoredomModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
          <div className="bg-white rounded-xl shadow-xl w-80 p-5 transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Feeling Bored?</h3>
              <button 
                onClick={() => setShowBoredomModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              We've detected you might need a quick break or an engagement boost. What would you like to do?
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => handleEngagementOption('game')}
                className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 py-3 px-4 rounded-lg flex items-center transition-colors"
              >
                <PlayIcon className="w-5 h-5 mr-3" />
                <span>Play a Quick Game</span>
              </button>
              <button 
                onClick={() => handleEngagementOption('break')}
                className="w-full bg-green-100 hover:bg-green-200 text-green-800 py-3 px-4 rounded-lg flex items-center transition-colors"
              >
                <ClockIcon className="w-5 h-5 mr-3" />
                <span>Take a 5-minute Break</span>
              </button>
              <button 
                onClick={() => handleEngagementOption('video')}
                className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-3 px-4 rounded-lg flex items-center transition-colors"
              >
                <FilmIcon className="w-5 h-5 mr-3" />
                <span>Watch a Funny Video</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionDetector;