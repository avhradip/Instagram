import React, { useState } from 'react';
import logo from '../../public/logo2.png'
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../redux/userSlice';
import { Loader2 } from 'lucide-react';

function ForgotPassword() {
    const { loading } = useSelector((state) => state.user)
    const [email, setEmail] = useState('');
    const dispatch = useDispatch()
    const send = (email) => {
        dispatch(forgotPassword(email))
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
                
                <img src={logo} alt="logo" className='w-30 h-9 mx-auto' />

                <p className="text-center text-sm text-gray-500 mb-4">
                    Enter your email to reset your password
                </p>

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg  mb-4"
                />

                <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 transition text-[12px] h-10"
                    onClick={() => send(email)}
                >
                    {loading ? <Loader2 className='animate-spin mx-auto' /> : "Send Link"}
                </button>

                <div className="mt-6 text-center">
                    <a href="/" className="text-sm text-blue-500 hover:underline text-[12px]">
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
