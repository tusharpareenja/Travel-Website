import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { v4 } from 'uuid';
import { bucket } from './firebase';

const useAuth = () => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        setAuthToken(idToken);
      } else {
        setAuthToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { authToken, loading };
};

const useAxiosInstance = () => {
  const { authToken, loading } = useAuth();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return { axiosInstance, loading };
};

async function uploadImage(file) {
  try {
    console.log("Uploading image")
    const fileName = `${v4()}_${file.name}`;
    
    const storageRef = ref(bucket, `communityimages/${fileName}`);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export { useAuth, useAxiosInstance, uploadImage };