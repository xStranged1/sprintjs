import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { VITE_AUDIENCE, VITE_AUTH0_CLIENT_ID, VITE_AUTH0_DOMAIN, VITE_SCOPE } from './config/config.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={VITE_AUTH0_DOMAIN}
      clientId={VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/sprintjs`,
        audience: VITE_AUDIENCE,
        scope: VITE_SCOPE,
      }}
    >
      <App />
    </Auth0Provider>,
  </StrictMode>,
)
