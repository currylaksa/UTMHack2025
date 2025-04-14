# DevBoost AI - GenAI-Powered Engineer Onboarding Platform

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.x-319795?logo=chakra-ui)](https://chakra-ui.com/)

## 🚀 Project Overview

DevBoost AI is a generative AI-powered onboarding platform specifically designed for software engineers, created for the UTM Hackathon 2025. The platform transforms the traditional onboarding process into a personalized, seamless, and engaging journey that accelerates productivity while ensuring proper integration into company culture and processes.

This repository contains the frontend prototype developed for the UTM Hackathon preliminary round, focused on creating an intuitive and visually compelling demonstration of how AI can enhance the onboarding experience.

![DevBoost AI Overview](https://via.placeholder.com/800x400?text=DevBoost+AI+Overview)

## 🎯 Problem Statement

New software engineering hires face three significant challenges:

1. **Information Overload**: Engineers must quickly learn company processes, technical stacks, and team dynamics while becoming productive.
2. **Inconsistent Support**: Managers struggle to provide consistent, personalized guidance when handling multiple new hires.
3. **Productivity Gap**: Traditional onboarding often delays the time it takes for engineers to become fully productive.

The cost of ineffective onboarding is substantial - leading to higher turnover rates, reduced productivity, and diminished team cohesion. For software engineering roles specifically, this translates to delayed project timelines and increased technical debt.

## ✨ Solution

DevBoost AI serves as an intelligent onboarding companion for software engineers that delivers personalized guidance and support throughout their first year at the company. The solution leverages generative AI to:

- Create customized learning paths based on role and experience
- Answer technical and organizational questions in real-time
- Provide stage-specific resources and recommendations
- Give managers insights to better support their team members
- Track progress and suggest interventions when needed

## 🖼️ Key Interfaces

The prototype focuses on four high-impact interfaces:

### 1. Landing Page
Introduces the solution with a compelling value proposition, animated demonstrations, and clear calls to action for both new hires and managers.

![Landing Page](https://via.placeholder.com/600x300?text=Landing+Page)

### 2. New Hire Timeline View
An interactive visualization of the 12-month onboarding journey that provides clear visibility into:
- Current progress and upcoming milestones
- Stage-specific tasks and resources
- AI-powered recommendations
- Just-in-time assistance

![Timeline View](https://via.placeholder.com/600x300?text=Timeline+View)

### 3. First Month Experience
A detailed view of the critical initial onboarding period featuring:
- Personalized welcome experience
- Technical environment setup guidance
- Team introductions with AI-generated conversation starters
- Initial skill assessment and learning plan
- Administrative task tracking

![First Month](https://via.placeholder.com/600x300?text=First+Month+Experience)

### 4. Manager Dashboard
A powerful oversight tool providing:
- Team-wide onboarding status overview
- AI-generated insights about potential challenges
- Intervention recommendations at critical moments
- Performance prediction based on engagement metrics

![Manager Dashboard](https://via.placeholder.com/600x300?text=Manager+Dashboard)

## 🛠️ Technical Implementation

### Frontend Technology Stack
- **Framework:** React.js with TypeScript
- **Styling:** Tailwind CSS for responsive design
- **UI Components:** Chakra UI for accessible, pre-built components
- **State Management:** Context API for simplified state handling
- **Data Persistence:** Local Storage for demonstration purposes

### AI Simulation
For the prototype, AI functionality is simulated using:
- Structured mock data
- Keyword-triggered responses
- Pre-defined recommendations and insights

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/devboost-ai.git
   cd devboost-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The application should now be running on `http://localhost:3000`

## 📂 Project Structure

```
devboost-ai/
├── public/
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── landing/
│   │   ├── timeline/
│   │   ├── firstMonth/
│   │   └── managerDashboard/
│   ├── context/
│   ├── data/
│   │   └── mockData.ts
│   ├── hooks/
│   ├── pages/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── .eslintrc.js
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## 🔍 Features

### For New Hires
- Interactive timeline showing the entire onboarding journey
- Personalized AI assistant for technical and organizational questions
- Customized resource recommendations based on role and stage
- Progress tracking and achievement recognition
- Technical environment setup assistance
- Team introduction and networking guidance

### For Managers
- Team overview with progress indicators
- AI-generated insights about potential onboarding issues
- Intervention recommendations at critical moments
- Resource allocation suggestions
- Performance prediction based on engagement metrics

## 🔮 Future Expansion

While the current prototype focuses on frontend implementation, the concept is designed for future expansion:

- **Backend Integration**: API-driven architecture with real database
- **Genuine AI Implementation**: Connection to GPT or similar models
- **Analytics Engine**: Advanced metrics and performance tracking
- **Integration Capabilities**: Calendar, documentation, and workflow connections
- **Mobile Experience**: Cross-platform accessibility

## 📊 Expected Impact

Based on research of similar AI-enhanced solutions, DevBoost AI could deliver:

- **30% reduction** in time to full productivity for new software engineers
- **25% decrease** in manager time spent on routine onboarding tasks
- **40% improvement** in new hire satisfaction scores
- **20% reduction** in first-year turnover rates

## 👥 Team

- [Team Member 1] - Role
- [Team Member 2] - Role
- [Team Member 3] - Role
- [Team Member 4] - Role

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
