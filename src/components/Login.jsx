import React, { useState } from 'react';
import Image from '../assets/Images/login.jpg'; // Import the image
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { logout, signInWithGoogle } from '../lib/firebase';
import axios from 'axios';
import { toast } from 'sonner';
import { useAxiosInstance } from '../lib/hooks';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {axios : axiosInstance} = useAxiosInstance()
    const handleLogin = async (e) => {
        try {
            const res  = await axios.post("http://localhost:8080/auth/login", {
                email,
                password
            })
            console.log(res.data);
            if (res.data.success){
                sessionStorage.setItem('id', res.data.user.id);
                toast.success('Login Successful');
                navigate('/home');
            }
        } catch (error) {
            if (error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error(`Login failed: ${error.message}`);
            }
        }
    };
    const handleGoogleSignIn = async () => {
        try {
          const idToken = await signInWithGoogle();
          console.log('ID token:', idToken);
          
          const response = await axios.post('http://localhost:8080/auth/signin-with-google', {
            idToken
          });
    
          const data = await response.data;
          if (data) {
            console.log(data);
            sessionStorage.setItem('id', data.id);
            console.log('User signed in successfully:', data);
            navigate('/home');
          } else {
            console.error('Error signing in:', data.error);
          }
        } catch (error) {
          console.error('Google sign-in failed:', error);
        }
      };

    return (
        <div  className='flex justify-center items-center'
            style={{
                backgroundImage: `url(${Image})`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                height: '100vh', 
                width: '100vw', 
            }}
        >
            <div className="bg-slate-600 bg-opacity-75 flex flex-col items-center justify-center text-white h-96 w-96 rounded-xl">
            <div className="text-3xl font-semibold mb-8">LOGIN</div>
             <form className="w-3/4 max-w-sm flex flex-col">
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-2 mb-4 border border-gray-300 rounded-md text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="relative mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="p-2 w-full border border-gray-300 rounded-md text-black pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-2 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </button>
                    </div>
                    <section className='flex flex-col gap-2'>
                        <button
                            type='button'
                            onClick={handleLogin}
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </button>
                        <button
                            type='button'
                            onClick={handleGoogleSignIn}
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Google/> Login with google
                        </button>
                        <button
                            type='button'
                            onClick={async()=>{
                                await logout()
                                sessionStorage.removeItem('id')
                            }}
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Logout
                        </button>
                    </section>
                </form>
                <div className='mt-4'>
                        <Link to='/register' className='text-blue-500 hover:underline'>
                            Register
                        </Link>
                    </div>
            </div>

        </div>
    );
};

export default Login;
