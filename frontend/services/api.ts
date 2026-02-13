import axios from 'axios';
import { Platform } from 'react-native';

// Use 10.0.2.2 for Android Emulator, localhost for iOS/Web
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to set Auth Token
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Book Services
export const bookApi = {
  getAll: () => api.get('/books'),
  getAvailable: () => api.get('/books/available'),
  getById: (id: number) => api.get(`/books/${id}`),
  create: (data: any) => api.post('/books', data),
  update: (id: number, data: any) => api.put(`/books/${id}`, data),
  delete: (id: number) => api.delete(`/books/${id}`),
};

// Member Services
export const memberApi = {
  login: (data: any) => api.post('/members/login', data),
  register: (data: any) => api.post('/members', data),
  getAll: () => api.get('/members'),
  getById: (id: number) => api.get(`/members/${id}`),
  update: (id: number, data: any) => api.put(`/members/${id}`, data),
  delete: (id: number) => api.delete(`/members/${id}`),
};

// Borrowing Services
export const borrowingApi = {
  getAll: () => api.get('/borrowings'),
  getActive: () => api.get('/borrowings/active'),
  getHistory: (memberId: number) => api.get(`/borrowings/history/${memberId}`),
  borrow: (data: { memberId: number; bookId: number }) => api.post('/borrowings/borrow', data),
  return: (id: number) => api.post(`/borrowings/return/${id}`),
};

export default api;
