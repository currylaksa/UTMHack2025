// Personalized learning path data
export const learningPath = {
  core: [
    { 
      id: 'skill1', 
      name: 'Development Environment', 
      progress: 60, 
      dependencies: [], 
      estimatedTimeTraditional: '12 hours',
      estimatedTimeWithAI: '4 hours',
      icon: 'desktop-computer', 
      status: 'in-progress',
      type: 'technical'
    },
    { 
      id: 'skill2', 
      name: 'Company Codebase', 
      progress: 20, 
      dependencies: ['skill1'], 
      estimatedTimeTraditional: '30 hours',
      estimatedTimeWithAI: '12 hours',
      icon: 'code', 
      status: 'in-progress',
      type: 'technical'
    },
    { 
      id: 'skill3', 
      name: 'Team Workflow', 
      progress: 35, 
      dependencies: [], 
      estimatedTimeTraditional: '10 hours',
      estimatedTimeWithAI: '5 hours',
      icon: 'user-group', 
      status: 'in-progress',
      type: 'process'
    },
    { 
      id: 'skill4', 
      name: 'CI/CD Pipeline', 
      progress: 0, 
      dependencies: ['skill2'], 
      estimatedTimeTraditional: '15 hours',
      estimatedTimeWithAI: '6 hours',
      icon: 'refresh', 
      status: 'locked',
      type: 'technical'
    },
    { 
      id: 'skill5', 
      name: 'Testing Framework', 
      progress: 0, 
      dependencies: ['skill2'], 
      estimatedTimeTraditional: '18 hours',
      estimatedTimeWithAI: '8 hours',
      icon: 'clipboard-check', 
      status: 'locked',
      type: 'technical'
    }
  ],
  optional: [
    { 
      id: 'skill6', 
      name: 'Advanced Git Workflows', 
      progress: 0, 
      dependencies: ['skill2', 'skill3'], 
      estimatedTimeTraditional: '8 hours',
      estimatedTimeWithAI: '3 hours',
      icon: 'code-branch', 
      status: 'optional',
      type: 'technical'
    },
    { 
      id: 'skill7', 
      name: 'Product Domain Knowledge', 
      progress: 15, 
      dependencies: [], 
      estimatedTimeTraditional: '25 hours',
      estimatedTimeWithAI: '15 hours',
      icon: 'puzzle-piece', 
      status: 'in-progress',
      type: 'business'
    }
  ]
};

// Environment dependency data
export const environmentSetup = {
  detected: {
    os: 'Windows 11',
    nodeVersion: 'v18.17.1',
    gitVersion: '2.42.0',
    editor: 'VS Code',
    browser: 'Chrome',
    terminal: 'Windows Terminal',
  },
  requiredTools: [
    { 
      name: 'Node.js', 
      version: '>=16.0.0', 
      status: 'installed', 
      installed: 'v18.17.1'
    },
    { 
      name: 'npm', 
      version: '>=8.0.0', 
      status: 'installed', 
      installed: 'v9.6.7'
    },
    { 
      name: 'Git', 
      version: '>=2.30.0', 
      status: 'installed', 
      installed: '2.42.0'
    },
    { 
      name: 'Docker', 
      version: '>=20.10.0', 
      status: 'missing', 
      installed: null
    },
    { 
      name: 'MongoDB', 
      version: '>=5.0.0', 
      status: 'outdated', 
      installed: '4.4.6'
    }
  ],
  recommendations: [
    {
      tool: 'Docker Desktop',
      reason: 'Required for local development environment',
      installCommand: 'choco install docker-desktop',
      priority: 'high'
    },
    {
      tool: 'MongoDB',
      reason: 'Update to v5.0+ for compatibility with latest features',
      installCommand: 'choco install mongodb --version=5.0.19',
      priority: 'medium'
    }
  ],
  timeSavings: {
    traditional: '8 hours',
    withDevBoostAI: '2.5 hours',
    savingsPercentage: 69
  }
};