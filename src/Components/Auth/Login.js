import { useNavigate, useParams } from 'react-router-dom';
import GoogleLoginBtn from '../SocialAuth/GoogleLoginBtn';
import { addSession } from "../../Helpers/Sessions";

const Login = ({ isMobileSize, haveSearch, isStream, isAuth }) => {
  
  const navigate = useNavigate();
  const { id, type } = useParams();

  const handleGoogleLoginSuccess = (googleUser) => {
    // Handle successful Google sign-in
    addSession('user', JSON.stringify(googleUser.credential));
    isAuth(true);
    if (isStream) {
      if (type == "drama") {
        navigate(`/${type}/stream_dashboard?mediaId=${type}/${id}`);
      } else {
        navigate(`/${type}/stream_dashboard?mediaId=${id}`);
      }
    }
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle failed Google sign-in
    console.error('Google Sign-In Failed:', error);
  };

  return (
      <GoogleLoginBtn
        isMobileSize={isMobileSize}
        haveSearch={haveSearch}
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
      />
  );
}

export default Login;