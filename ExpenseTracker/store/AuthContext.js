import { createContext, useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {}
})

const AuthContextProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token == null)
      {
        setAuthToken(token);
      }
    }
    getToken();
  }, [])

  const authenticate = (token) => {
    setAuthToken(token);
    AsyncStorage.setItem('TOKEN', token)
  }

  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem('TOKEN')
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider