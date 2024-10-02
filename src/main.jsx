// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import Button from "devextreme-react/button";
// import App from './App.jsx';
// import './index.css';
// export { Button };

// import DataGrid, {
//   Column as GridColumn,
//   Editing as GridEditing,
//   Paging as GridPaging,
//   Lookup as GridLookup,
// } from "devextreme-react/data-grid";
// export {
//   DataGrid,
//   GridColumn,
//   GridEditing,
//   GridPaging,
//   GridLookup,
// };

// import { PublicClientApplication, EventType } from '@azure/msal-browser';
// import { MsalProvider } from '@azure/msal-react';


// import config from 'devextreme/core/config'; 
// import { licenseKey } from './devextreme-license.js'; 
 
// config({ licenseKey });   

// // MSAL configuration
// const msalConfig = {
//   auth: {
//     clientId: 'f252e02d-60c4-457f-ae15-e45c1a1b83b1',  // Replace with your Azure AD client ID
//     authority: 'https://login.microsoftonline.com/bd394f47-48ea-439b-9e9c-aad183cfa4ac',  // Replace with your Azure AD tenant ID
//     redirectUri: window.location.origin,  // Redirect to the current domain after login
//     postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
//     navigateToLoginRequestUrl: false, //
//   },
// };

// // Create an instance of MSAL
// const msalInstance = new PublicClientApplication(msalConfig);

// // Render the app with MsalProvider
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <MsalProvider instance={msalInstance}>
//       <App />
//     </MsalProvider>
//   </StrictMode>
// );
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

import config from 'devextreme/core/config'; 
import { licenseKey } from './devextreme-license.js'; 
 
config({ licenseKey });   


/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getActiveAccount()[0]);
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        const account = event.payload.account;
        msalInstance.setActiveAccount(account);
    }
});

const root = createRoot(document.getElementById('root'));
root.render(
    <App instance={msalInstance}/>
);