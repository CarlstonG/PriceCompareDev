import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const onSignIn = async () => {
    try {
      // Initiate login
      await instance.loginPopup();
      navigate('/tabledata', { replace: true });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="SignIn">
      <h2>Please Sign In</h2>
      <button onClick={onSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
