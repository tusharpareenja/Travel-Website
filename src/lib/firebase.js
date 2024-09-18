import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

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
    await signOut(auth);
    console.log('User signed out successfully.');
  } catch (error) {
    console.error('Error during sign-out:', error);
  }
};

