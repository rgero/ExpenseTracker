import axios from "axios";

const authenticate = async (mode, email, password) => {
  const targetURL = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=` + process.env.EXPO_PUBLIC_FIREBASE_KEY;
  const response = await axios.post(targetURL, {
    email: email,
    password: password,
    returnSecureToken: true
  })

  const token = response.data.idToken;
  return token;
}

export const createUser = async (email, password) => {
  return await authenticate("signUp", email, password)
}


export const loginUser = async (email, password) => {
  return await authenticate("signInWithPassword", email, password);
}