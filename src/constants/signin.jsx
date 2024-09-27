export const signin = (setIsAuth) => {
    // Simulate the sign-in process
    setTimeout(() => {
      console.log('User signed in');
      setIsAuth(true);  // This will simulate the user being authenticated
    }, 1000); // Simulating delay of signing in
  };