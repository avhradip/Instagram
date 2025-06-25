import React, { useState } from 'react';
import logo from '../../public/logo2.png'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../redux/userSlice';
import { Loader2 } from 'lucide-react';

function ResetPasswordPage() {
    const { loading } = useSelector((state) => state.user)
    const { token } = useParams()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()

    const ResetPasswordFun = ({ password: password, confirmPassword: confirmPassword, token: token }) => {
        dispatch(resetPassword({ password: password, confirmPassword: confirmPassword, token: token }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 border bg-white shadow-sm rounded-md">
                <div className="flex justify-center mb-6">
                    <img
                        src={logo}
                        alt="Instagram"
                        className="w-40 h-13"
                    />
                </div>

                <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
                    Reset Your Password
                </h2>

                <form>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400 text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400 text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold text-sm transition"
                        onClick={() => ResetPasswordFun({ password: password, confirmPassword: confirmPassword, token: token })}
                    >
                        {loading ? <Loader2 className='animate-spin mx-auto' /> : "Send Link"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <a href="/" className="text-blue-500 hover:underline">
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
