import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

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

export { useAuth, useAxiosInstance };