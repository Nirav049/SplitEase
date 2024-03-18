import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './context/globalContext';
import { GlobalStyle } from './styles/GlobalStyle';
import reportWebVitals from './reportWebVitals'
import { GoogleOAuthProvider } from '@react-oauth/google';  


const clerkPubKey = process.env.VITE_CLERK_PUBLISHABLE_KEY

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="169611125122-gsvjd44n6q9rrv3qegnt5h9t3tbcim3j.apps.googleusercontent.com">
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
    
    <App />
  
    </GlobalProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

reportWebVitals()

