// src/components/dashboard/ScheduleMeetingButton.jsx
import React, { useState } from 'react';
import { CalendarIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

/**
 * A button component that opens a modal for scheduling 1:1 meetings with team members
 */
const ScheduleMeetingButton = ({ teamMember, variant = 'primary', size = 'md', onScheduled }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingDuration, setMeetingDuration] = useState(30);
  const [meetingAgenda, setMeetingAgenda] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Generate available times for the meeting
  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  // Generate suggested meeting agendas based on team member's status
  const suggestedAgendas = {
    'Needs Support': [
      'Technical onboarding challenges',
      'Environment setup issues',
      'Project understanding',
      'Team integration support'
    ],
    'On Track': [
      'Onboarding progress check-in',
      'Growth opportunities discussion',
      'Initial project feedback'
    ],
    'Exceeding': [
      'Recognition & career growth',
      'Additional responsibility opportunities',
      'Advanced training options'
    ],
    'At Risk': [
      'Urgent support requirements',
      'Blockers & challenges',
      'Critical adjustment planning'
    ]
  };

  // Get appropriate agenda suggestions based on team member productivity
  const getAgendaSuggestions = () => {
    const productivity = teamMember?.productivity || 'On Track';
    return suggestedAgendas[productivity] || suggestedAgendas['On Track'];
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      // Reset form after a short delay
      setTimeout(() => {
        setSelectedDate('');
        setSelectedTime('');
        setMeetingDuration(30);
        setMeetingAgenda('');
        setIsSuccess(false);
      }, 300);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for scheduling meeting
    setTimeout(() => {
      console.log('Meeting scheduled:', {
        teamMember: teamMember.name,
        date: selectedDate,
        time: selectedTime,
        duration: meetingDuration,
        agenda: meetingAgenda
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Call the optional onScheduled callback with meeting details
      if (onScheduled) {
        onScheduled({
          teamMemberName: teamMember.name,
          teamMemberId: teamMember.id,
          date: selectedDate,
          time: selectedTime,
          duration: meetingDuration,
          agenda: meetingAgenda
        });
      }
      
      // Close modal after a delay to show success state
      setTimeout(handleCloseModal, 1500);
    }, 800);
  };

  const buttonVariants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700',
    warning: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:from-yellow-600 hover:to-amber-600',
    success: 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600',
    danger: 'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600',
    light: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  const buttonSizes = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3.5 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base'
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 inline-flex items-center ${buttonVariants[variant]} ${buttonSizes[size]}`}
      >
        <CalendarIcon className="w-4 h-4 mr-1.5" />
        Schedule 1:1
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={handleCloseModal}></div>

            {/* Modal Content */}
            <div className="bg-white rounded-xl shadow-xl transform transition-all max-w-lg w-full p-6 relative z-10">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-indigo-600" />
                  Schedule 1:1 with {teamMember.name}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Success State */}
              {isSuccess ? (
                <div className="py-8 flex flex-col items-center justify-center">
                  <div className="mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Meeting Scheduled!</h3>
                  <p className="text-gray-600 text-center mb-1">
                    Your 1:1 with {teamMember.name} has been scheduled for:
                  </p>
                  <p className="text-indigo-600 font-medium">
                    {selectedDate} at {selectedTime}
                  </p>
                  <p className="text-sm text-gray-500 mt-3">
                    A calendar invitation has been sent to both you and {teamMember.name.split(' ')[0]}.
                  </p>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Team member info */}
                  <div className="flex items-center mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="flex-shrink-0">
                      <img
                        src={teamMember.avatar}
                        alt={teamMember.name}
                        className="h-12 w-12 rounded-full object-cover border-2 border-indigo-200"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">{teamMember.name}</h3>
                      <p className="text-sm text-gray-600">{teamMember.role}</p>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          teamMember.productivity === 'Needs Support' ? 'bg-yellow-100 text-yellow-800' :
                          teamMember.productivity === 'At Risk' ? 'bg-red-100 text-red-800' :
                          teamMember.productivity === 'Exceeding' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {teamMember.productivity || 'On Track'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Date and Time Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="meeting-date" className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        id="meeting-date"
                        type="date"
                        required
                        min={today}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="meeting-time" className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <select
                        id="meeting-time"
                        required
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md shadow-sm"
                      >
                        <option value="" disabled>Select a time</option>
                        {availableTimes.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <select
                      id="duration"
                      value={meetingDuration}
                      onChange={(e) => setMeetingDuration(Number(e.target.value))}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md shadow-sm"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>60 minutes</option>
                    </select>
                  </div>

                  {/* Meeting Agenda */}
                  <div>
                    <label htmlFor="agenda" className="block text-sm font-medium text-gray-700 mb-1">
                      Agenda
                    </label>
                    <textarea
                      id="agenda"
                      rows={3}
                      value={meetingAgenda}
                      onChange={(e) => setMeetingAgenda(e.target.value)}
                      placeholder="What would you like to discuss in this meeting?"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md shadow-sm"
                    />
                    
                    {/* Agenda Suggestions */}
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1.5">Suggested topics:</p>
                      <div className="flex flex-wrap gap-2">
                        {getAgendaSuggestions().map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setMeetingAgenda(suggestion)}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Scheduling...
                        </>
                      ) : (
                        'Schedule Meeting'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleMeetingButton;