// Test file to debug 403 errors
// Run this in browser console or create a test component

import { publicAuthAxios } from './utils/axiosInstance';

// Test 1: Simple login request
export const testLogin = async () => {
    console.log('🧪 Testing Login Endpoint...');
    console.log('URL:', 'http://localhost:8080/api/users/login');

    try {
        const response = await publicAuthAxios.post('/api/users/login', {
            email: 'test@example.com',
            password: 'password123'
        });

        console.log('✅ Login Success:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Login Failed');
        console.error('Status:', error.response?.status);
        console.error('Status Text:', error.response?.statusText);
        console.error('Error Message:', error.response?.data);
        console.error('Headers Sent:', error.config?.headers);
        console.error('Full Error:', error);
        return null;
    }
};

// Test 2: Check if backend is reachable
export const testBackendConnection = async () => {
    console.log('🧪 Testing Backend Connection...');

    try {
        const response = await fetch('http://localhost:8080/api/states/all');
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Backend is reachable');
            console.log('Data:', data);
        } else {
            console.error('❌ Backend returned error:', response.status);
        }
    } catch (error) {
        console.error('❌ Cannot reach backend:', error.message);
    }
};

// Test 3: Check CORS headers
export const checkCORS = async () => {
    console.log('🧪 Checking CORS Headers...');

    try {
        const response = await fetch('http://localhost:8080/api/users/login', {
            method: 'OPTIONS',
            headers: {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });

        console.log('OPTIONS Response Status:', response.status);
        console.log('CORS Headers:');
        console.log('  Access-Control-Allow-Origin:', response.headers.get('Access-Control-Allow-Origin'));
        console.log('  Access-Control-Allow-Methods:', response.headers.get('Access-Control-Allow-Methods'));
        console.log('  Access-Control-Allow-Headers:', response.headers.get('Access-Control-Allow-Headers'));

        if (response.headers.get('Access-Control-Allow-Origin')) {
            console.log('✅ CORS is configured');
        } else {
            console.log('❌ CORS is NOT configured');
        }
    } catch (error) {
        console.error('❌ CORS check failed:', error.message);
    }
};

// Test 4: Direct axios test
export const testDirectAxios = async () => {
    console.log('🧪 Testing Direct Axios Call...');

    const axios = require('axios');

    try {
        const response = await axios.post('http://localhost:8080/api/users/login', {
            email: 'test@example.com',
            password: 'password123'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Direct axios success:', response.data);
    } catch (error) {
        console.error('❌ Direct axios failed');
        console.error('Status:', error.response?.status);
        console.error('Data:', error.response?.data);
        console.error('Headers:', error.response?.headers);
    }
};

// Run all tests
export const runAllTests = async () => {
    console.log('🚀 Running All Tests...\n');

    await testBackendConnection();
    console.log('\n---\n');

    await checkCORS();
    console.log('\n---\n');

    await testLogin();
    console.log('\n---\n');

    await testDirectAxios();
    console.log('\n✅ All tests completed');
};

// Export for use in components
export default {
    testLogin,
    testBackendConnection,
    checkCORS,
    testDirectAxios,
    runAllTests
};
