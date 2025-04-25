import React, { useState } from 'react';
import { 
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

// AI Chat predefined scenarios
const preDefined = {
  docker: {
    response: "I see you need help with Docker setup! I found these resources for you:\n\n1. The Docker Desktop installation guide in the Resources panel (95% match to your needs)\n2. A 8-minute video walkthrough by Bob who set up the same environment\n3. Common Docker troubleshooting steps\n\nWould you like me to walk you through the installation steps? Or connect you with Bob who's an expert on our Docker setup?",
    suggestedResources: ['fmr1', 'fmr6'],
    suggestedConnection: 'Bob Buddy'
  },
  codebase: {
    response: "Great question about our codebase structure! The frontend uses React with a component-based architecture. Here's what will help you get oriented:\n\n1. I've highlighted the 'Project Architecture Overview' in your Resources panel\n2. Check the 'Frontend Component Library' doc for our UI components\n3. The main application flow starts in App.jsx\n\nCharlie from your team is the frontend expert - would you like me to schedule a 15-min walkthrough with them?",
    suggestedResources: ['fmr1', 'fmr5'],
    suggestedConnection: 'Charlie Teammate'
  },
  apiDocs: {
    response: "You're looking for our API documentation - perfect timing! I've prioritized these resources for you:\n\n1. Complete API Documentation (just updated last week)\n2. A guide to authentication and endpoints\n\nAlso, I noticed you're working on frontend integration. There's a template for API calls in src/services/api.js that shows the correct pattern to use.",
    suggestedResources: ['fmr4', 'fmr1'],
    suggestedConnection: null
  },
  workflow: {
    response: "Understanding our team's workflow is crucial! I've highlighted these resources for you:\n\n1. 'Intro to Team Workflow' video that explains our process\n2. Git workflow tutorial showing our branching strategy\n\nAlso, Alice scheduled the team's workflow overview meeting for April 25th - I've marked it as important in your calendar.",
    suggestedResources: ['fmr3', 'fmr6'],
    suggestedConnection: 'Alice Manager'
  }
};

const initialMessages = [
  {
    id: 'm1',
    sender: 'ai',
    message: "Welcome to the team! I'm DevBoost AI, your onboarding assistant. How can I help you get started?",
    timestamp: '9:32 AM'
  }
];

const EmotionMonitor = ({ onResourceHighlight, onTeamMemberSelect }) => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  // Handle chat input submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: `m${messages.length + 1}`,
      sender: 'user',
      message: chatInput,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages([...messages, newUserMessage]);
    setChatInput('');
    
    // Check if message matches any of our pre-defined scenarios
    const lowerCaseInput = chatInput.toLowerCase();
    
    setTimeout(() => {
      let aiResponse;
      let highlightResources = [];
      let suggestedTeamMember = null;
      
      // Check which pre-defined scenario the message matches
      if (lowerCaseInput.includes('docker') || lowerCaseInput.includes('container') || lowerCaseInput.includes('environment setup')) {
        aiResponse = preDefined.docker.response;
        highlightResources = preDefined.docker.suggestedResources;
        suggestedTeamMember = preDefined.docker.suggestedConnection;
      } 
      else if (lowerCaseInput.includes('codebase') || lowerCaseInput.includes('architecture') || lowerCaseInput.includes('code structure')) {
        aiResponse = preDefined.codebase.response;
        highlightResources = preDefined.codebase.suggestedResources;
        suggestedTeamMember = preDefined.codebase.suggestedConnection;
      }
      else if (lowerCaseInput.includes('api') || lowerCaseInput.includes('documentation') || lowerCaseInput.includes('backend')) {
        aiResponse = preDefined.apiDocs.response;
        highlightResources = preDefined.apiDocs.suggestedResources;
      }
      else if (lowerCaseInput.includes('workflow') || lowerCaseInput.includes('process')) {
        aiResponse = preDefined.workflow.response;
        highlightResources = preDefined.workflow.suggestedResources;
        suggestedTeamMember = preDefined.workflow.suggestedConnection;
      }
      
      // Send AI response
      const responseMessage = {
        id: `m${messages.length + 2}`,
        sender: 'ai',
        message: aiResponse || "I'll help you with that! Let me check our resources for the most relevant information.",
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setMessages(prev => [...prev, responseMessage]);
      
      // If we have resources to highlight, update the UI to show them
      if (highlightResources.length > 0 && onResourceHighlight) {
        onResourceHighlight(highlightResources);
      }
      
      // If we have a team member to suggest, update the UI
      if (suggestedTeamMember && onTeamMemberSelect) {
        onTeamMemberSelect(suggestedTeamMember);
      }
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center">
          <ChatBubbleLeftEllipsisIcon className="w-6 h-6 mr-2" />
          <h2 className="text-lg font-semibold">DevBoost AI Assistant</h2>
        </div>
        <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
          Available 24/7
        </div>
      </div>
      
      <div className="flex flex-col h-80">
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] p-3 rounded-lg shadow-sm 
                  ${msg.sender === 'user' 
                    ? 'bg-blue-50 text-gray-800 rounded-br-none' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-bl-none'
                  }
                `}
              >
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs opacity-70 text-right mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        
        <form 
          onSubmit={handleSendMessage}
          className="border-t border-gray-200 p-3 bg-gray-50 flex"
        >
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask anything about your onboarding..."
            className="flex-grow rounded-l-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            style={{ paddingLeft: '16px', paddingRight: '12px', boxSizing: 'border-box' }}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center"
          >
            <PaperAirplaneIcon className="w-4 h-4 mr-1" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmotionMonitor;