import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './context/globalContext';
import { GlobalStyle } from './styles/GlobalStyle';
import reportWebVitals from './reportWebVitals'
import { GoogleOAuthProvider } from '@react-oauth/google';  




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="YOUR CLIENTID">
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

