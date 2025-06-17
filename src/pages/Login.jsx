import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginFun } from '@/redux/userSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import loginScreenPic from '/login.png'
import logo from '../../public/logo2.png'
import playStore from '/p.png'
import microsoftStore from '/m.png'
import { Loader2 } from 'lucide-react'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.user)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await dispatch(loginFun(formData))
        if (res.meta.requestStatus === 'fulfilled') {
            navigate('/')
            setFormData({
                email: '',
                password: '',
            })
        }
    }

    return (
        <div className="flex items-center justify-center mt-8">

            <div className=' flex justify-end  '>
                <img src={loginScreenPic} alt="loginScreenPic" className='w-96 h-2xl md:block lg:block hidden ' />
            </div>
            <div className=' flex flex-col gap-4 p-4 pt-6 '>
                <div className='border-2 px-10 w-80 py-10 flex flex-col items-center'>
                    <img src={logo} alt="logo" className='w-40 h-11' />
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 w-56 h-52 items-center justify-center"
                    >
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button type="submit" className="w-full bg-blue-700">
                            {loading ? (<Loader2 className='animate-spin' />) : ("Login")}
                        </Button>

                    </form>
                </div>
                <div className='border-2 px-10 py-4 w-80 flex flex-col items-center'>
                    <p className="text-sm text-center text-gray-600">
                        Don't have an account?{' '}
                        <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => navigate('/register')}>
                            Register
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-4 w-80 items-center justify-center'>
                    <p className='text-sm'>Get the app.</p>
                    <div className='flex gap-1'>
                        <div className='flex items-center gap-2 border-black border-1 rounded p-1'>
                            <img src={playStore} alt="playStore" className='w-8 h-8' />
                            <div className='flex flex-col gap-0 '>
                                <p className='text-[8px] font-semibold'>GET IT ON</p>
                                <p className='text-[15px] font-bold'>Google Play</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 border-black border-1 rounded p-1'>
                            <img src={microsoftStore} alt="playStore" className='w-8 h-8' />
                            <div className='flex flex-col gap-0 '>
                                <p className='text-[8px] font-semibold'>Get it from</p>
                                <p className='text-[15px] font-bold'>Microsoft</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>


    )
}

export default Login
