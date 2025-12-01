import axios from 'axios';

// Use /api for Vercel deployment, or VITE_API_URL for custom backend
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface RegisterData {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    email: string;
    createdAt: string;
  };
}

export interface ApiError {
  message: string;
}

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/user/register', data);
  return response.data;
};
