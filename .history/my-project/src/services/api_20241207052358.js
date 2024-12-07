// src/services/api.js
const BASE_URL = ''; // We'll add this when you get the API details

export const api = {
  auth: {
    login: async (credentials) => {
      // Will implement with actual API
      console.log('Login attempt:', credentials);
    },
    register: async (userData) => {
      // Will implement with actual API
      console.log('Register attempt:', userData);
    },
    logout: async () => {
      // Will implement with actual API
      console.log('Logout attempt');
    }
  },
  courses: {
    getAll: async () => {
      // Will implement with actual API
      return [];
    },
    getOne: async (id) => {
      // Will implement with actual API
      return {};
    }
  },
  schedule: {
    get: async () => {
      // Will implement with actual API
      return [];
    },
    update: async (data) => {
      // Will implement with actual API
      console.log('Schedule update:', data);
    }
  },
  chat: {
    getMessages: async () => {
      // Will implement with actual API
      return [];
    },
    sendMessage: async (message) => {
      // Will implement with actual API
      console.log('Send message:', message);
    }
  }
};