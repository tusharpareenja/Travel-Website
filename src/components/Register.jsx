import React, { useState } from 'react';
import Image from '../assets/Images/login.jpg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useAxiosInstance } from '../lib/hooks';
import { toast } from 'sonner';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { axiosInstance } = useAxiosInstance()

    const handleRegister = async () => {
        if(!password == confirmPassword){
            toast.error('Password does not match');
        }
        try {
            const res = await axios.post("http://localhost:8080/auth/signup", {
                name,
                email,
                password
            })
            if(res.data.success){
                sessionStorage.setItem('id', res.data.user.id);
                sessionStorage.setItem('email', res.data.user.email);
                toast.success('Registration Successful !');
                navigate('/home');
            }
        } catch (error) {
            console.log('Login Failed:', error);
            if (error.response.data.error) {
                toast.error(error.response.data.error);
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
            <div className="bg-slate-600 bg-handleRegisteropacity-75 flex flex-col items-center justify-center  h-96 w-96 rounded-xl">
            <div className="text-3xl font-semibold mb-8 text-white">REGISTER</div>
             <form className="w-3/4 max-w-sm flex flex-col">
                    <input
                        type='text'
                        placeholder='Name'
                        className='p-2 mb-4 border border-gray-300 rounded-md text-black'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                            className="p-2 w-full border border-gray-300 rounded-md text-black pr-10 mb-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                         <input
                                type='password'
                                placeholder='Confirm Password'
                                className='p-2 w-full border border-gray-300 rounded-md text-black pr-10'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
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
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </form>
                <div className='mt-4'>
                        <Link to='/login' className='text-blue-500 hover:underline'>
                            Login
                        </Link>
                    </div>
            </div>

        </div>
    );
};

export default Register;
