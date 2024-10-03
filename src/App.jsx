
import 'devextreme/dist/css/dx.light.css';
import 'tailwindcss/tailwind.css';
import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import { PageLayout } from './components/PageLayout/PageLayout';
import { loginRequest } from './authConfig';
import React from 'react';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import 'whatwg-fetch';
import axios from 'axios';
import './styles/App.css';
import 'devextreme/dist/css/dx.light.css';
import config from 'devextreme/core/config';
import { licenseKey } from './devextreme-license';
import DataGridComponent from './components/Pages/DataGridComponent';

import AdminLogin from './components/Pages/AdminLogin'
import Dashboard from './components/Pages/Dashboard';


/**
 * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
 * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
 * only render their children if a user is authenticated or unauthenticated, respectively. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */

console.log(licenseKey);

config({ licenseKey });

const MainContent = () => {
   const { instance } = useMsal();

   const activeAccount = instance.getActiveAccount();

   const handleLoginRedirect = () => {
      instance.loginRedirect(loginRequest).catch((error) => console.log(error));
   };

   function isNotEmpty(value) {
      return value !== undefined && value !== null && value !== '';
   }

   const store = new CustomStore({
      key: 'ezCode',
      async load(loadOptions) {
         const paramNames = ['skip', 'take', 'requireTotalCount', 'requireGroupCount', 'sort', 'filter', 'totalSummary', 'group', 'groupSummary'];

         const textObj = {};

         paramNames
            .filter((paramName) => isNotEmpty(loadOptions[paramName]))
            .forEach((param) => {
               textObj[param] = loadOptions[param];
            });

         try {
            const paramRequest = {
               searchQuery: '7001875',
               advanceSearchEnabled: false,
               skip: textObj.skip,
               size: textObj.take,
            };

            const tokenRequest = {
               account: activeAccount,
               scopes: ['api://4bdc6b82-01c9-4ef9-858b-8badb622ad9c/api.scope'], // Replace with your IDGAPI scope
            };

            const responsex = await instance.acquireTokenSilent(tokenRequest);
            const accessToken = responsex.accessToken;

            const response = await axios.post(
               `https://gateway.officebrands.com.au/v1/idg/product/productsearchcurrentpricesbyothercodes`,
               paramRequest,
               {
                  headers: {
                     Authorization: `Bearer ${accessToken}`,
                     'Content-Type': 'application/json',
                  },
               }
            );

            return {
               data: response.data.itemCollection,
               totalCount: response.data.totalCount,
            };
         } catch (err) {
            throw new Error('Data Loading Error');
         }
      },
   });
   const allowedPageSizes = [8, 12, 20];

   return (
      <div className="App">
         <AuthenticatedTemplate>
            {/* <DataGridComponent/> */}
            <Dashboard/>
         </AuthenticatedTemplate>
         <UnauthenticatedTemplate>
           
          <AdminLogin handleLoginRedirect={handleLoginRedirect} />

         </UnauthenticatedTemplate>
      </div>
   );
};

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const App = ({ instance }) => {
   return (
      <MsalProvider instance={instance}>
         <PageLayout>
            <MainContent />
         </PageLayout>
      </MsalProvider>
   );
};

export default App;
