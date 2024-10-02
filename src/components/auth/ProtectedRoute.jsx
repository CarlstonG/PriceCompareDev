import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  return (
    <AuthenticatedTemplate>
      {children}
    </AuthenticatedTemplate>
  );
};

export const SignInRoute = ({ children }) => {
  return (
    <UnauthenticatedTemplate>
      {children}
    </UnauthenticatedTemplate>
  );
};

// Modified ProtectedRoute to check authentication and redirect if necessary
export const ProtectedRouteWithRedirect = ({ children }) => {
  return (
    <><AuthenticatedTemplate>
          {children}
      </AuthenticatedTemplate><UnauthenticatedTemplate>
              <Navigate to="/signin" />
      </UnauthenticatedTemplate></>
  );
};
