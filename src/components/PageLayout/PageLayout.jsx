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
            {<p>Your Roles Are: {roles}</p>}
            {props.children}
            <footer>
               <center>
                  How did we do?
                  <a
                     href="https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR_ivMYEeUKlEq8CxnMPgdNZUNDlUTTk2NVNYQkZSSjdaTk5KT1o4V1VVNS4u"
                     rel="noopener noreferrer"
                     target="_blank">
                     {' '}
                     Share your experience!
                  </a>
               </center>
            </footer>
         </AuthenticatedTemplate>
         <UnauthenticatedTemplate>{props.children}</UnauthenticatedTemplate>
      </>
   );
};
