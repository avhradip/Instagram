import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerFun } from '@/redux/userSlice'
import logo from '../../public/logo2.png'
import { Loader2 } from 'lucide-react'

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const { loading, error } = useSelector((state) => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await dispatch(registerFun(formData))
        console.log(res.meta.requestStatus);

        if (res.meta.requestStatus === 'fulfilled') {
            navigate('/')
            setFormData({
                userName: '',
                email: '',
                password: '',
            })
        }


    }

    return (
        <div className='flex flex-col gap-2 items-center justify-center min-h-screen bg-white px-4'>

            <form
                onSubmit={handleSubmit}
                className='w-full max-w-md p-6 space-y-4 flex flex-col items-center justify-center border-2'
            >
                <img src={logo} alt="logo" className='w-40 h-11' />
                <h2 className=" font-semibold text-center">Sign up to see photos and videos from your friends.</h2>


                {loading && <p className="text-sm text-blue-600 text-center">Registering...</p>}
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}


                <Input
                    type="text"
                    name="userName"
                    placeholder="Name"
                    value={formData.userName}
                    onChange={handleChange}
                />
                {/* </div>

                <div>
                    <Label>Email</Label> */}
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {/* </div>

                <div>
                    <Label>Password</Label> */}
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {/* </div> */}

                <div className='flex flex-col text-sm items-center gap-2 mt-4'>
                    <p className='text-[12px]'>People who use our service may have uploaded your contact information to Instagram.<span className='text-blue-700'> Learn more</span></p>
                    <p className='text-[12px]'>By signing up, you agree to our <span className='text-blue-700'>Terms, Privacy Policy </span> and <span className='text-blue-700'>Cookies Policy</span>.<span></span></p>
                    <Button type="submit" className='w-full bg-blue-600'>
                        {loading?(<Loader2 className='animate-spin'/>):("Sign Up")}
                    </Button>
                </div>

            </form>
            <div className='w-full max-w-md p-6 space-y-4 flex flex-col items-center justify-center border-2'>
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Register
