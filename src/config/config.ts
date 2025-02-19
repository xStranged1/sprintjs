const {
    VITE_API_URL = 'http://localhost',
    VITE_API_PORT = '3000',
    VITE_ENVIRONMENT = 'develop'
} = import.meta.env;

const PORT = VITE_ENVIRONMENT == 'develop' ? `:${VITE_API_PORT}` : ''
export const API_URL = `${VITE_API_URL}${PORT}`