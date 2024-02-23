import GoogleLoginBtn from '../SocialAuth/GoogleLoginBtn';
import { addSession } from "../../Helpers/Sessions";

const Login = ({ isMobileSize, isAuth }) => {

  const handleGoogleLoginSuccess = (googleUser) => {
    // Handle successful Google sign-in
    addSession('user', JSON.stringify(googleUser.credential));
    isAuth(true);
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle failed Google sign-in
    console.error('Google Sign-In Failed:', error);
  };

  return (
      <GoogleLoginBtn
        isMobileSize={isMobileSize}
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
      />
  );
}

export default Login;