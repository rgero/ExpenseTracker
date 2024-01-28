import { useContext, useState } from 'react';

import { Alert } from 'react-native';
import AuthContent from '../../components/auth/AuthContent';
import { AuthContext } from '../../store/AuthContext';
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import { createUser } from '../../utils/auth';

function SignupScreen() {

  const [isLoading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);

  const signUpHandler = async ({email, password}) => {
    setLoading(true);
    try{
      const token = await createUser(email, password);
      authContext.authenticate(token);
    } catch (error)
    {
      console.log(error);
      Alert.alert("Failed to create user", "Please try again later");
      setLoading(false);
    }
  }

  if (isLoading) return <LoadingOverlay message="Creating User..."/>

  return <AuthContent onAuthenticate={signUpHandler}/>;
}

export default SignupScreen;
