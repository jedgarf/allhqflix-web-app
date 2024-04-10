import { useParams } from 'react-router-dom';
import GoogleLoginBtn from '../SocialAuth/GoogleLoginBtn';
import { addSession } from "../../Helpers/Sessions";

const Login = ({ isMobileSize, haveSearch, isStream, isAuth }) => {

  const { id, type } = useParams();

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
    <div style={{ display: 'flex', alignItems: 'center', height: '6.5vh', justifyContent: 'center' }}>
      <GoogleLoginBtn
        isMobileSize={isMobileSize}
        haveSearch={haveSearch}
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
      />
    </div>
  );
}

export default Login;