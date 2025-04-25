import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context for emotion data
const EmotionContext = createContext();

// Emotion detection settings
const EMOTION_DECAY_INTERVAL = 30000; // 30 seconds
const EMOTION_DECAY_RATE = 0.1; // Decay by 10% each interval

export const EmotionProvider = ({ children }) => {
  // State for current emotional data
  const [currentEmotion, setCurrentEmotion] = useState('neutral'); // neutral, excited, frustrated, confused, bored, interested, anxious
  const [emotionIntensity, setEmotionIntensity] = useState(0.5); // 0.0 to 1.0
  const [emotionTriggers, setEmotionTriggers] = useState([]);
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  // Function to detect emotion from user input
  const detectEmotionFromText = (text) => {
    // For demo, we'll use keyword matching, but in a real app this would be ML-based
    const keywords = {
      frustrated: ['difficult', 'hard', 'stuck', 'confused', 'struggling', 'frustrating', 'annoying', 'problem', 'issue', 'error', 'doesn\'t work', 'not working', 'can\'t figure'],
      excited: ['amazing', 'cool', 'awesome', 'great', 'love', 'excellent', 'exciting', 'interesting', 'wow', 'fun', 'enjoy'],
      confused: ['confused', 'what', 'how do', 'don\'t understand', 'unclear', 'confusing', 'makes no sense', 'lost', 'help me understand'],
      bored: ['boring', 'bored', 'dull', 'repetitive', 'slow', 'faster', 'already know', 'skip', 'next'],
      anxious: ['worried', 'stress', 'nervous', 'anxious', 'afraid', 'fear', 'uncertain', 'deadline', 'overwhelmed', 'too much'],
      interested: ['tell me more', 'interested', 'curious', 'fascinating', 'learn more', 'details', 'explain', 'want to know']
    };

    // Convert to lowercase for case-insensitive matching
    const lowercaseText = text.toLowerCase();
    
    // Find matches for each emotion
    const matches = Object.entries(keywords).map(([emotion, words]) => {
      const count = words.filter(word => lowercaseText.includes(word)).length;
      return { emotion, count };
    }).filter(match => match.count > 0);
    
    // If no matches, return neutral with medium intensity
    if (matches.length === 0) {
      return { emotion: 'neutral', intensity: 0.5, triggers: [] };
    }
    
    // Get the emotion with the most keyword matches
    matches.sort((a, b) => b.count - a.count);
    const dominantEmotion = matches[0].emotion;
    
    // Calculate intensity based on number of matches and text length
    const wordCount = text.split(/\s+/).length;
    const matchCount = matches[0].count;
    const intensity = Math.min(0.4 + (matchCount / wordCount) * 0.6, 1.0);
    
    // Get triggers (the actual keywords matched)
    const triggers = keywords[dominantEmotion].filter(word => 
      lowercaseText.includes(word)
    );
    
    return { emotion: dominantEmotion, intensity, triggers };
  };

  // Process user input and update emotion
  const processUserInput = (text) => {
    const { emotion, intensity, triggers } = detectEmotionFromText(text);
    
    // Update emotion if intensity is significant
    if (intensity > 0.3) {
      setCurrentEmotion(emotion);
      setEmotionIntensity(intensity);
      setEmotionTriggers(triggers);
      
      // Add to history
      const timestamp = new Date().toISOString();
      setEmotionHistory(prev => [...prev, { emotion, intensity, triggers, timestamp, text }]);
    }
    
    // Reset interaction time
    setLastInteractionTime(Date.now());
  };

  // Process UI interactions (e.g., clicks, hovers)
  const processUIInteraction = (interactionType, element) => {
    // Simplified for demo - in reality would analyze interaction patterns
    // Examples: rapid clicking might indicate frustration
    //           slow hover might indicate confusion
    
    // Update last interaction time
    setLastInteractionTime(Date.now());
  };

  // Get content adaptation recommendations based on current emotion
  const getContentAdaptation = () => {
    const adaptations = {
      neutral: {
        pacing: 'normal',
        complexity: 'medium',
        interactivity: 'medium',
        suggestions: [
          "Here's a clear explanation of how this works.",
          "Let me walk you through this process step by step.",
          "What specific aspect would you like to explore first?"
        ]
      },
      frustrated: {
        pacing: 'slower',
        complexity: 'lower',
        interactivity: 'higher',
        suggestions: [
          "Let's break this down into simple steps.",
          "I'll explain this in a different way to make it clearer.",
          "Let's focus on just one part at a time.",
          "Many people find this challenging at first - you're doing great."
        ]
      },
      confused: {
        pacing: 'slower',
        complexity: 'lower',
        interactivity: 'higher',
        suggestions: [
          "Let me explain this more simply.",
          "Here's a visual way to understand this concept.",
          "Let's approach this from a different angle.",
          "I'll break this down step by step."
        ]
      },
      excited: {
        pacing: 'faster',
        complexity: 'higher',
        interactivity: 'higher',
        suggestions: [
          "Since you're enjoying this, here's a more advanced concept.",
          "I can see you're engaged - let's explore this in more depth.",
          "Great enthusiasm! Here's an additional challenge you might enjoy.",
          "You're progressing quickly - here's some advanced material."
        ]
      },
      bored: {
        pacing: 'faster',
        complexity: 'varies',
        interactivity: 'higher',
        suggestions: [
          "Let's skip ahead to something more challenging.",
          "Here's a more interactive approach to this topic.",
          "Let me show you a real-world application of this concept.",
          "Let's try a different format that might be more engaging."
        ]
      },
      anxious: {
        pacing: 'steady',
        complexity: 'medium',
        interactivity: 'medium',
        suggestions: [
          "Take your time - there's no rush to get through this.",
          "Many new hires feel this way at first - it's completely normal.",
          "Let's focus on what's most important first.",
          "We can break this into smaller, manageable steps."
        ]
      },
      interested: {
        pacing: 'normal',
        complexity: 'higher',
        interactivity: 'higher',
        suggestions: [
          "Since you're interested, here's a deeper explanation.",
          "I can provide more context about why this is important.",
          "Would you like to explore the technical details behind this?",
          "Here's some additional information that builds on this concept."
        ]
      }
    };
    
    return adaptations[currentEmotion] || adaptations.neutral;
  };

  // Get emotion trends over time for analytics
  const getEmotionTrends = () => {
    if (emotionHistory.length === 0) {
      return { dominant: 'neutral', trend: 'stable' };
    }
    
    // Get emotions from last 10 interactions
    const recentEmotions = emotionHistory.slice(-10).map(item => item.emotion);
    
    // Count occurrences of each emotion
    const counts = recentEmotions.reduce((acc, emotion) => {
      acc[emotion] = (acc[emotion] || 0) + 1;
      return acc;
    }, {});
    
    // Find dominant emotion
    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    
    // Determine trend (simplified)
    const firstHalf = recentEmotions.slice(0, Math.floor(recentEmotions.length / 2));
    const secondHalf = recentEmotions.slice(Math.floor(recentEmotions.length / 2));
    
    const positiveEmotions = ['excited', 'interested'];
    const negativeEmotions = ['frustrated', 'confused', 'anxious', 'bored'];
    
    const firstHalfPositive = firstHalf.filter(e => positiveEmotions.includes(e)).length;
    const secondHalfPositive = secondHalf.filter(e => positiveEmotions.includes(e)).length;
    
    const firstHalfNegative = firstHalf.filter(e => negativeEmotions.includes(e)).length;
    const secondHalfNegative = secondHalf.filter(e => negativeEmotions.includes(e)).length;
    
    let trend = 'stable';
    if (secondHalfPositive > firstHalfPositive && secondHalfNegative < firstHalfNegative) {
      trend = 'improving';
    } else if (secondHalfPositive < firstHalfPositive && secondHalfNegative > firstHalfNegative) {
      trend = 'declining';
    }
    
    return { dominant, trend };
  };

  // Gradually decay emotion intensity over time
  useEffect(() => {
    const decayInterval = setInterval(() => {
      const now = Date.now();
      
      // If it's been a while since the last interaction, decay the emotion
      if (now - lastInteractionTime > EMOTION_DECAY_INTERVAL) {
        setEmotionIntensity(prev => {
          const newIntensity = Math.max(0.3, prev - EMOTION_DECAY_RATE);
          
          // If intensity gets low enough, return to neutral
          if (newIntensity <= 0.3 && currentEmotion !== 'neutral') {
            setCurrentEmotion('neutral');
          }
          
          return newIntensity;
        });
      }
    }, EMOTION_DECAY_INTERVAL);
    
    return () => clearInterval(decayInterval);
  }, [lastInteractionTime, currentEmotion]);

  // Context value
  const contextValue = {
    currentEmotion,
    emotionIntensity,
    emotionTriggers,
    emotionHistory,
    processUserInput,
    processUIInteraction,
    getContentAdaptation,
    getEmotionTrends
  };

  return (
    <EmotionContext.Provider value={contextValue}>
      {children}
    </EmotionContext.Provider>
  );
};

// Custom hook for using emotion context
export const useEmotion = () => {
  const context = useContext(EmotionContext);
  if (!context) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  return context;
};

export default EmotionContext;