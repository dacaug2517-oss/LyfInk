import axios from 'axios';

// Microservice URLs
const AUTH_SERVICE_URL = 'http://localhost:8080';  // User authentication service
const HB_SERVICE_URL = 'http://localhost:8081';    // Hospital/Blood Bank service
const DONOR_SERVICE_URL = 'http://localhost:8082'; // Donor service

// Helper function to create axios instance with JWT interceptors
const createAxiosInstance = (baseURL, includeAuth = true) => {
    const instance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Only add auth interceptor if includeAuth is true
    if (includeAuth) {
        // Request interceptor to add JWT token
        instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor to handle 401 errors
        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    // Token expired or invalid - redirect to login
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    return instance;
};

// Create instances for each microservice (WITH authentication)
export const authServiceAxios = createAxiosInstance(AUTH_SERVICE_URL, true);
export const hbServiceAxios = createAxiosInstance(HB_SERVICE_URL, true);
export const donorServiceAxios = createAxiosInstance(DONOR_SERVICE_URL, true);

// Create public instances (WITHOUT authentication) for public endpoints
// Used for: login, register, states, cities, roles, blood components
export const publicAuthAxios = createAxiosInstance(AUTH_SERVICE_URL, false);
export const publicHbAxios = createAxiosInstance(HB_SERVICE_URL, false);
export const publicDonorAxios = createAxiosInstance(DONOR_SERVICE_URL, false);

// Default export for backward compatibility (uses auth service with auth)
export default authServiceAxios;
