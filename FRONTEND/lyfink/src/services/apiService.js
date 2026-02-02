import { authServiceAxios, hbServiceAxios, donorServiceAxios, publicAuthAxios } from '../utils/axiosInstance';

// API Service for making authenticated requests to microservices
// Port 8080: Auth Service (login/register)
// Port 8081: Hospital/Blood Bank Service
// Port 8082: Donor Service

const apiService = {
    // ============ Blood Components (Public - No Auth Required) ============
    getBloodComponents: () => {
        return publicAuthAxios.get('/api/bloodcomponents');
    },

    getBloodComponentsByCategory: (categoryId) => {
        return publicAuthAxios.get(`/api/bloodcomponents/category/${categoryId}`);
    },

    // ============ States & Cities (Public - No Auth Required) ============
    getAllStates: () => {
        return publicAuthAxios.get('/api/states/all');
    },

    getCitiesByState: (stateId) => {
        return publicAuthAxios.get(`/api/cities/bystate/${stateId}`);
    },

    // ============ User Profile (Auth Service - 8080) ============
    getUserProfile: (userId) => {
        return authServiceAxios.get(`/api/users/${userId}`);
    },

    // ============ Donor (Donor Service - 8082) ============
    getDonorProfile: (userId) => {
        return donorServiceAxios.get(`/api/donor/profile/${userId}`);
    },

    getDonorHistory: (userId) => {
        return donorServiceAxios.get(`/api/donor/history/${userId}`);
    },

    updateDonorProfile: (userId, data) => {
        return donorServiceAxios.put(`/api/donor/profile/${userId}`, data);
    },

    // ============ Blood Stock (HB Service - 8081) ============
    getBloodStock: () => {
        return hbServiceAxios.get('/api/BloodStock'); // Legacy?
    },

    getStockDetails: (hbid) => {
        return hbServiceAxios.get(`/api/request/stock-details/${hbid}`);
    },

    updateBloodStock: (data) => {
        return hbServiceAxios.post('/api/blood-stock/update', data);
    },

    // ============ Blood Requests (HB Service - 8081) ============
    createBloodRequest: (data) => {
        return hbServiceAxios.post('/api/request/saverequest', data);
    },

    getAllBloodRequests: () => {
        return hbServiceAxios.get('/api/request');
    },

    getBloodRequestSummary: () => {
        return hbServiceAxios.get('/api/request/blood');
    },

    getRequestsExcludingUser: (userid) => {
        return hbServiceAxios.get(`/api/request/all-except/${userid}`);
    },

    // ============ Blood Responses (HB Service - 8081) ============
    getRequestsFromOtherHospitals: (userid) => {
        return hbServiceAxios.get(`/api/request/others/${userid}`);
    },

    addResponse: (data) => {
        return hbServiceAxios.post('/api/response/add', data);
    },

    getMyResponses: (userid) => {
        return hbServiceAxios.get(`/api/response/my-requests/${userid}`);
    },

    // ============ Donation Camps (HB Service - 8081) ============
    saveDonationCamp: (data) => {
        return hbServiceAxios.post('/api/donation-camp/save', data);
    },

    getDonationCamps: () => {
        return hbServiceAxios.get('/api/donationcamps'); // Keep if valid, or check docs.
    },

    // ============ Hospital/Blood Bank (HB Service - 8081) ============
    registerHospital: (data) => {
        return hbServiceAxios.post('/api/hb/register', data);
    },

    getHospitalDetails: (hbid) => {
        return hbServiceAxios.get(`/api/hb/${hbid}`);
    },
};

export default apiService;
