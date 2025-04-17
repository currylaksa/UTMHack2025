# DevBoost AI - GenAI-Powered Engineer Onboarding Platform

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.x-319795?logo=chakra-ui)](https://chakra-ui.com/)

## 🚀 Project Overview

DevBoost AI is a generative AI-powered onboarding platform specifically designed for software engineers, created for the UTM Hackathon 2025. The platform transforms the traditional onboarding process into a personalized, seamless, and engaging journey that accelerates productivity while ensuring proper integration into company culture and processes.

This repository contains the frontend prototype developed for the UTM Hackathon preliminary round, focused on creating an intuitive and visually compelling demonstration of how AI can enhance the onboarding experience.

## 🔗 Project Links

* **Proposal:** [Click Here](https://docs.google.com/document/d/1QoBZJ26CvayosYuX8hdKs15RLFReUwN_9j6miNflpmc/edit?usp=sharing)
* **Poster:** [Click Here]() Will be update soon
* **Demo Video:** [Click Here]() Will be update soon

## 🎯 Problem Statement

New software engineering hires face three significant challenges:

1. **Overwhelming Information Overload**: Engineers must quickly learn company processes, technical practices, and team dynamics while becoming productive.
2. **Inconsistent Support**: Managers struggle to provide consistent, personalized guidance when handling multiple new hires.
3. **Productivity Gap**: Companies need engineers to become productive quickly, but traditional onboarding often creates delays and frustration.

The cost of ineffective onboarding is substantial - studies show that poor onboarding leads to higher turnover rates, reduced productivity, and diminished team cohesion. For software engineering roles specifically, this translates to delayed project timelines and increased technical debt.

## ✨ Solution

DevBoost AI serves as an intelligent onboarding companion for software engineers that delivers personalized guidance and support throughout their first year at the company. The solution leverages generative AI to transform the onboarding experience through four key interfaces:

### 1. Landing Page
A visually appealing introduction to the platform that features:
- Hero Section with compelling headline: "DevBoost AI: Accelerating Engineer Onboarding with AI" 
- Value proposition: "30% faster productivity, 25% less manager overhead"
- User Selection Panel with prominent buttons for "New Hire View" and "Manager View"
- Animated Illustration showing a simplified onboarding journey with an AI assistant icon

### 2. New Hire Timeline View
An interactive visualization of the 12-month onboarding journey that provides:
- Horizontal Timeline with visual representation of months 1-12
- Current Month Panel showing progress and task checklist
- Quick AI Tip providing non-intrusive, contextual suggestions

### 3. First Month Experience
A detailed view of the critical initial onboarding period featuring:
- Setup Guide for technical environment configuration
- AI Assistant Panel with example conversations and support
- Resources Section with card-based layout of key documentation

### 4. Manager Dashboard
A powerful oversight tool providing:
- Team Overview Statistics showing completion rates and required actions
- Team Members Table with visual progress indicators and status tags
- AI Insights Panel highlighting actionable recommendations

## 🛠️ Technical Implementation

### Frontend Technology Stack
- **Framework:** React with TypeScript for robust component development
- **Styling:** Tailwind CSS with custom color variables:
  - Primary: blue-600 (professional, trustworthy)
  - Secondary: teal-500 (growth, progress)
  - Accent: indigo-400 (innovation, technology)
- **UI Components:** Chakra UI for accessible, pre-built components
- **State Management:** Context API for streamlined state management
- **Data Persistence:** Local Storage for prototype data persistence
- **AI Simulation:** Mock API Layer for simulating AI interactions

For the preliminary round, we will focus exclusively on frontend development to create a visually impressive, interactive prototype that effectively demonstrates the concept.

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
devboostai/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── manager/
│   │   │   └── ManagerDashboard.jsx
│   │   └── newhires/
│   │       ├── FirstMonthView.jsx
│   │       ├── NewHireLayout.jsx
│   │       └── TimelineView.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── images/
│   │   ├── JY1.png
│   │   ├── JY2.jpg
│   │   ├── QY1.png
│   │   └── QY2.jpg
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
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

## 💪 Competitive Advantages

DevBoost AI stands out from traditional onboarding solutions through:

- **Personalization at Scale**: The AI engine adapts content and recommendations based on role, experience level, and progress.
- **Proactive Support**: Rather than waiting for questions, the system anticipates needs based on the onboarding timeline.
- **Dual-Focused Value**: The solution simultaneously benefits new hires and managers, creating alignment between both stakeholder groups.
- **Visual Journey Mapping**: The interactive timeline creates clarity and motivation throughout the entire first year.

## 🔮 Future Expansion

While the current prototype focuses on frontend implementation, the concept is designed for future expansion:

- **Full Backend Integration**: API-driven architecture with real database
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

- Chong Kai Zhi - UI/UX Designer
- Chan Qing Yee - Frontend Developer
- Tham Ren Sheng - Business Analyst
- Ong Jia Yu - AI Implementation Specialist

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
