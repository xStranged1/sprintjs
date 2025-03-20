const {
    VITE_API_URL = 'http://localhost',
    VITE_API_PORT = '3000',
    VITE_ENVIRONMENT = 'develop',
    VITE_AUTH0_DOMAIN = '',
    VITE_AUTH0_CLIENT_ID = '',
    VITE_AUDIENCE = '',
    VITE_SCOPE = ''
} = import.meta.env;

const PORT = VITE_ENVIRONMENT == 'develop' ? `:${VITE_API_PORT}` : ''
export const API_URL = `${VITE_API_URL}${PORT}`
export { VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID, VITE_AUDIENCE, VITE_SCOPE }