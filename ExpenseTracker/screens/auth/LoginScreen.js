import { useContext, useState } from 'react';

import { Alert } from 'react-native';
import AuthContent from '../../components/auth/AuthContent';
import { AuthContext } from '../../store/AuthContext';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { loginUser } from '../../utils/auth';

function LoginScreen() {
  const [isLoading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const loginHandler = async ({email, password}) => {
    setLoading(true);
    try{
      const token = await loginUser(email, password);
      authContext.authenticate(token);
    } catch (err)
    {
      console.log(err);
      Alert.alert("Authentication Failed", "Could not log you in.")
      setLoading(false);
    }
    
  }

  if (isLoading) return <LoadingOverlay message="Logging in..."/>

  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
