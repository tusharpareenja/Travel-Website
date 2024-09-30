import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAxiosInstance } from './hooks';
import axios from 'axios';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCHyfEhJ7449jY4bX-lyXXJuf5h5zuB1Mk",
  authDomain: "travelwebsite-22879.firebaseapp.com",
  projectId: "travelwebsite-22879",
  storageBucket: "travelwebsite-22879.appspot.com",
  messagingSenderId: "1094696849263",
  appId: "1:1094696849263:web:9b13eb093a851632cd229a",
  measurementId: "G-S9NCWDPLF1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const bucket = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    return token;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};
export const logout = async () => {
  try {
    console.log("Making request");
    
    const response = await axios.post('http://localhost:8080/auth/logout',{
      id : sessionStorage.getItem('id')
    });
    await signOut(auth);
    sessionStorage.removeItem('id')
    console.log('User signed out successfully.');
    console.log(response.data);
  } catch (error) {
    console.error('API request failed:', error);
  }
};

export const getUser = () => {
  const user = auth
  console.log(user)
  if(user.currentUser){
    return {
      id : user.currentUser.uid,
      email : user.currentUser.email,
      name : user.currentUser.displayName,
      image : user.currentUser.photoURL
    }
  } else if (sessionStorage.getItem('id') && sessionStorage.getItem('email') && sessionStorage.getItem('name') && sessionStorage.getItem('image')) {
    return {
      id : sessionStorage.getItem('id'),
      email : sessionStorage.getItem('email'),
      name : sessionStorage.getItem('name'),
      image : sessionStorage.getItem('image')
    }
  } else {
    return null
  }
}