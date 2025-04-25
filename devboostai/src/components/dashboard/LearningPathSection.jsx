import React from 'react';
import {
  AcademicCapIcon,
  CodeBracketIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  ArrowLeftIcon,
  ChevronDoubleRightIcon,
  ClockIcon,
  LockClosedIcon,
  SparklesIcon,
  BookOpenIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

// Helper function to calculate time savings for a skill
const calculateTimeSavings = (traditional, withAI) => {
  const traditionalHours = parseInt(traditional.split(' ')[0]);
  const aiHours = parseInt(withAI.split(' ')[0]);
  const savingsPercent = Math.round(((traditionalHours - aiHours) / traditionalHours) * 100);
  return {
    hours: traditionalHours - aiHours,
    percent: savingsPercent
  };
};

// Get skill icon based on name
const getSkillIcon = (iconName) => {
  switch (iconName) {
    case 'desktop-computer': return <CpuChipIcon className="w-5 h-5" />;
    case 'code': return <CodeBracketIcon className="w-5 h-5" />;
    case 'user-group': return <UserGroupIcon className="w-5 h-5" />;
    case 'refresh': return <ArrowLeftIcon className="w-5 h-5 rotate-90" />;
    case 'clipboard-check': return <DocumentCheckIcon className="w-5 h-5" />;
    case 'code-branch': return <CodeBracketIcon className="w-5 h-5" />;
    case 'puzzle-piece': return <BookOpenIcon className="w-5 h-5" />;
    default: return <AcademicCapIcon className="w-5 h-5" />;
  }
};

const LearningPathSection = ({ learningPath, teamConnections, activeSkill, setActiveSkill }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
        <h2 className="text-lg font-semibold flex items-center">
          <AcademicCapIcon className="w-6 h-6 mr-2" />
          Learning Path
        </h2>
        <p className="text-sm text-blue-100 mt-1">Your personalized onboarding skills journey</p>
      </div>
      
      <div className="p-3 sm:p-5">
        {/* Time Savings Summary - Made more responsive */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-3 sm:p-4 mb-5 border border-indigo-100">
          <h3 className="text-sm font-medium text-indigo-700 mb-2 flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            AI-Enhanced Learning Time Savings
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="text-center">
              <div className="text-xs text-gray-500">Traditional</div>
              <div className="text-base sm:text-lg font-bold text-gray-800">118 hrs</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">With DevBoost AI</div>
              <div className="text-base sm:text-lg font-bold text-green-600">53 hrs</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">You Save</div>
              <div className="text-base sm:text-lg font-bold text-indigo-600">65 hrs</div>
              <div className="text-xs font-medium text-indigo-500">(-55%)</div>
            </div>
          </div>
        </div>

        {/* Skill Tree Visualization */}
        <h3 className="font-medium text-gray-700 mb-3">Required Skills</h3>
        <div className="space-y-3 mb-6">
          {learningPath.core.map((skill) => {
            const isLocked = skill.status === 'locked';
            const timeSavings = calculateTimeSavings(
              skill.estimatedTimeTraditional, 
              skill.estimatedTimeWithAI
            );
            
            return (
              <div 
                key={skill.id}
                onClick={() => !isLocked && setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                className={`
                  relative border rounded-lg p-3 sm:p-4 cursor-pointer transition-all 
                  ${isLocked 
                    ? 'bg-gray-50 border-gray-200' 
                    : activeSkill === skill.id
                      ? 'bg-indigo-50 border-indigo-300 shadow-md' 
                      : 'bg-white border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30'
                  }
                `}
              >
                {isLocked && (
                  <div className="absolute inset-0 bg-white/80 rounded-lg backdrop-blur-[1px] flex items-center justify-center z-10">
                    <div className="flex items-center text-gray-500 font-medium text-xs sm:text-sm">
                      <LockClosedIcon className="w-4 h-4 mr-1 text-gray-400" />
                      <span>Complete prerequisites first</span>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap sm:flex-nowrap items-center">
                  <div className={`p-2 rounded-lg mr-3 ${skill.type === 'technical' ? 'bg-blue-100' : 'bg-emerald-100'}`}>
                    {getSkillIcon(skill.icon)}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm sm:text-base">{skill.name}</h4>
                    <div className="flex items-center mt-1">
                      <div className="w-20 sm:w-32 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                        <div 
                          className={`h-full rounded-full ${skill.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'}`}
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{skill.progress}% complete</span>
                    </div>
                  </div>
                  <div className="ml-auto mt-2 sm:mt-0 sm:ml-4 text-right">
                    <div className="text-xs sm:text-sm font-medium text-blue-600 flex items-center justify-end">
                      <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span>Save {timeSavings.hours}h</span>
                    </div>
                    <div className="text-xs text-gray-500">-{timeSavings.percent}% time</div>
                  </div>
                </div>

                {activeSkill === skill.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2 text-xs sm:text-sm">Estimated Completion Time</h5>
                        <div className="flex items-center">
                          <div className="mr-4">
                            <div className="text-xs text-gray-500">Traditional</div>
                            <div className="font-medium text-xs sm:text-sm">{skill.estimatedTimeTraditional}</div>
                          </div>
                          <ChevronDoubleRightIcon className="w-4 h-4 text-indigo-400" />
                          <div className="ml-4">
                            <div className="text-xs text-gray-500">With AI</div>
                            <div className="font-medium text-green-600 text-xs sm:text-sm">{skill.estimatedTimeWithAI}</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2 text-xs sm:text-sm mt-3 sm:mt-0">Team Connections</h5>
                        {teamConnections.find(conn => conn.skill === skill.name) ? (
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
                              {teamConnections.find(conn => conn.skill === skill.name)?.recommendedContact.charAt(0)}
                            </div>
                            <div className="text-xs sm:text-sm">
                              {teamConnections.find(conn => conn.skill === skill.name)?.recommendedContact}
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-500 text-xs sm:text-sm">No specific connection</div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3">
                      <button className="mt-2 px-3 py-1.5 bg-indigo-600 text-xs text-white rounded-md hover:bg-indigo-700 transition-colors">
                        Start Learning Path
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <h3 className="font-medium text-gray-700 mb-3">Optional Skills</h3>
        <div className="space-y-3">
          {learningPath.optional.map((skill) => {
            const timeSavings = calculateTimeSavings(
              skill.estimatedTimeTraditional, 
              skill.estimatedTimeWithAI
            );
            
            return (
              <div 
                key={skill.id}
                onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                className={`
                  border rounded-lg p-3 sm:p-4 cursor-pointer transition-all
                  ${activeSkill === skill.id
                    ? 'bg-indigo-50 border-indigo-300 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30'}
                `}
              >
                <div className="flex flex-wrap sm:flex-nowrap items-center">
                  <div className={`p-2 rounded-lg mr-3 ${skill.type === 'technical' ? 'bg-blue-100' : skill.type === 'business' ? 'bg-amber-100' : 'bg-emerald-100'}`}>
                    {getSkillIcon(skill.icon)}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-wrap sm:flex-nowrap items-center">
                      <h4 className="font-medium text-gray-800 text-sm sm:text-base">{skill.name}</h4>
                      <span className="ml-0 sm:ml-2 mt-1 sm:mt-0 text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">Optional</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="w-20 sm:w-32 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                        <div 
                          className={`h-full rounded-full ${skill.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'}`}
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{skill.progress}% complete</span>
                    </div>
                  </div>
                  <div className="ml-auto mt-2 sm:mt-0 sm:ml-4 text-right">
                    <div className="text-xs sm:text-sm font-medium text-blue-600 flex items-center justify-end">
                      <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span>Save {timeSavings.hours}h</span>
                    </div>
                  </div>
                </div>
                
                {activeSkill === skill.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2 text-xs sm:text-sm">Estimated Completion Time</h5>
                        <div className="flex items-center">
                          <div className="mr-4">
                            <div className="text-xs text-gray-500">Traditional</div>
                            <div className="font-medium text-xs sm:text-sm">{skill.estimatedTimeTraditional}</div>
                          </div>
                          <ChevronDoubleRightIcon className="w-4 h-4 text-indigo-400" />
                          <div className="ml-4">
                            <div className="text-xs text-gray-500">With AI</div>
                            <div className="font-medium text-green-600 text-xs sm:text-sm">{skill.estimatedTimeWithAI}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <button className="mt-2 px-3 py-1.5 bg-indigo-600 text-xs text-white rounded-md hover:bg-indigo-700 transition-colors">
                        Add to Learning Plan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningPathSection;