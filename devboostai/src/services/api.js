// API Client for DevBoostAI
const API_URL = 'http://localhost:5000/api';

/**
 * API client for interacting with the DevBoostAI backend
 */
class ApiService {
  /**
   * Make a request to the API
   * @param {string} endpoint - The API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<any>} Response data
   */
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // User related endpoints
  
  /**
   * Get all users
   * @returns {Promise<Array>} List of users
   */
  async getUsers() {
    return this.request('/users');
  }

  /**
   * Get user by ID
   * @param {string|number} userId - The user ID
   * @returns {Promise<Object>} User data
   */
  async getUserById(userId) {
    return this.request(`/users/${userId}`);
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  /**
   * Update a user
   * @param {string|number} userId - The user ID
   * @param {Object} userData - User data to update
   * @returns {Promise<Object>} Updated user
   */
  async updateUser(userId, userData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  // Onboarding related endpoints
  
  /**
   * Get onboarding timeline for a user
   * @param {string|number} userId - The user ID
   * @returns {Promise<Object>} Timeline data
   */
  async getOnboardingTimeline(userId) {
    return this.request(`/onboarding/timeline/${userId}`);
  }

  /**
   * Get first month experience data for a user
   * @param {string|number} userId - The user ID
   * @returns {Promise<Object>} First month experience data
   */
  async getFirstMonthData(userId) {
    return this.request(`/onboarding/first-month/${userId}`);
  }

  /**
   * Update onboarding task status
   * @param {string|number} taskId - The task ID
   * @param {boolean} completed - Whether the task is completed
   * @returns {Promise<Object>} Updated task data
   */
  async updateTaskStatus(taskId, completed) {
    return this.request(`/onboarding/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed })
    });
  }

  /**
   * Get manager dashboard data
   * @param {string|number} managerId - The manager ID
   * @returns {Promise<Object>} Manager dashboard data
   */
  async getManagerDashboard(managerId) {
    return this.request(`/onboarding/manager/${managerId}`);
  }
}

// Export a singleton instance of the API service
export default new ApiService();