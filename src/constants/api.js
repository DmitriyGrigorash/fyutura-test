let API_ROOT = '';

if (process.env.NODE_ENV === 'production') {
    API_ROOT = '';
} else {
    API_ROOT = 'http://localhost:8000';
}

export default API_ROOT;
