import React, { useState } from 'react';
import Image from '../assets/Images/Login.jpg'; // Import the image
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await account.createEmailPasswordSession(email, password);
            alert('Login Successful');
            navigate('/home');
        } catch (error) {
            console.log('Login Failed:', error);
            if (error.code === 401) {
                alert('Invalid credentials. Please try again.');
            } else {
                alert(`Login failed: ${error.message}`);
            }
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
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
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
