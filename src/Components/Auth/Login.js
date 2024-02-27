import { useNavigate, useParams } from 'react-router-dom';
import GoogleLoginBtn from '../SocialAuth/GoogleLoginBtn';
import { addSession } from "../../Helpers/Sessions";

import { updateVideoResolutions } from "../Player/Player";

const Login = ({ isMobileSize, haveSearch, isStream, isAuth }) => {
  
  const navigate = useNavigate();
  const { id, type } = useParams();

  const handleGoogleLoginSuccess = (googleUser) => {
    // Handle successful Google sign-in
    addSession('user', JSON.stringify(googleUser.credential));
    isAuth(true);
    if (isStream && type !== undefined && id !== undefined) {
      // if (type == "anime") {
      //   navigate(`/${type}/stream_dashboard?mediaId=${id}`);
      // } else {
      //   navigate(`/${type}/stream_dashboard?mediaId=${type}/${id}`);
      // }
      // try {
      //   updateVideoResolutions();
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle failed Google sign-in
    console.error('Google Sign-In Failed:', error);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '6.5vh', justifyContent: 'right' }}>
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