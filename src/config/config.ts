const {
    VITE_API_URL = 'http://localhost',
    VITE_API_PORT = '3000',
} = import.meta.env;

export const API_URL = `${VITE_API_URL}:${VITE_API_PORT}`
