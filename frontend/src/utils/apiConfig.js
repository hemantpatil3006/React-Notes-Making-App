let baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Remove trailing slash if it exists
if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
}

const API_URL = baseUrl;
export default API_URL;
