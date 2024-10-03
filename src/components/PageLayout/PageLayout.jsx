import { UnauthenticatedTemplate, AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import Navigation from './Navigation.jsx';
import { useEffect, useState } from 'react';

export const PageLayout = (props) => {
   const { instance } = useMsal();

   const [roles, setRoles] = useState('');
   const activeAccount = instance.getActiveAccount();

   useEffect(() => {
      if (activeAccount && activeAccount.idTokenClaims) {
         // Check if roles claim exists
         const rolesClaim = activeAccount.idTokenClaims.roles;
         if (rolesClaim) {
            setRoles(rolesClaim.join(', '));
         } else {
            setRoles('No roles found');
         }
      }
   }, [activeAccount]); // Update when activeAccount changes

   return (
      <>
         <AuthenticatedTemplate>
            <Navigation />
            {<p className="text-center font-bold p-5 text-lg">
            Your Roles Are: {roles}
            </p>}
            {props.children}
         </AuthenticatedTemplate>
         <UnauthenticatedTemplate>{props.children}</UnauthenticatedTemplate>
      </>
   );
};
