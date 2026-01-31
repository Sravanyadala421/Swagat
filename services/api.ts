import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: (credentials: any) => api.post('/auth/login', credentials),
    register: (userData: any) => api.post('/auth/register', userData),
};

export const roomService = {
    getAll: () => api.get('/rooms'),
    create: (roomData: any) => api.post('/rooms', roomData),
    delete: (id: string) => api.delete(`/rooms/${id}`),
};

export const bookingService = {
    create: (bookingData: any) => api.post('/bookings', bookingData),
    getAll: () => api.get('/bookings'),
    updateStatus: (id: string, status: string) => api.patch(`/bookings/${id}/status`, { status }),
};

export default api;
