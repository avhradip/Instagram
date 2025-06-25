import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Button } from './ui/button'
import logo from "/logo2.png"
import { followOrUnfollow, getSuggestedUsers, getUserFun } from '@/redux/userSlice'
import { Loader2 } from 'lucide-react'
import HoverCardUi from './HoverCardUi'
import InstagramLoader from './InstagramLoader'



function RightSidebar({ user }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selected, setSelocted] = useState(null)
    const { suggestedUsers, loading } = useSelector((state) => state.user)


    const logOut = () => {
        localStorage.removeItem("userToken")
        dispatch(getUserFun())
        navigate('/')
    }

    const followUnfollow = async (id) => {
        setSelocted(id)
        const res = await dispatch(followOrUnfollow(id))
        if (res?.meta?.requestStatus === "fulfilled") {
            dispatch(getSuggestedUsers())
            setSelocted(null)
        }
    }


    return (
        <div className='w-[550px] space-y-5 xl:block hidden mx-4'>
            <div className='flex items-center justify-between cursor-pointer' >
                <div className='flex items-center gap-3'>
                    <div className='cursor-pointer' onClick={() => navigate(`/profile/${user._id}`)}>
                        <Avatar>
                            <AvatarImage
                                className='w-11 h-11 rounded-full object-cover'
                                src={user?.profilePicture}
                            />
                            <AvatarFallback className='bg-gray-400 w-8 h-8 p-2 rounded-full'>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <p className='font-bold text-[12px]'>{user?.userName}</p>
                        <p className='text-[12px] font-semibold text-gray-500'>{user?.name}</p>
                    </div>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <span className="text-sm text-blue-600 cursor-pointer">Switch</span>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm text-center">
                        <DialogHeader>
                            <DialogTitle className="flex justify-center">
                                <img src={logo} alt="logo" width={100} height={30} />
                            </DialogTitle>
                            <DialogDescription className="text-base text-black font-medium py-4 flex justify-center">
                                Are you sure you want to log out?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex mx-auto items-center h-fit justify-center">
                            <Button
                                onClick={() => logOut()}
                                className="bg-blue-700"
                            >
                                Log Out
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3 text-gray-500 text-[14px] font-semibold'>
                    <p>Suggested for you</p>
                </div>
                <button className=' text-[12px] hover:text-gray-400 font-semibold cursor-pointer' onClick={() => navigate('/people')}>See All</button>
            </div>
            <div className='flex flex-col items-center gap-4'>
                {loading ? <InstagramLoader /> :
                    suggestedUsers?.map(item => (
                        <div className='flex items-center justify-between w-full cursor-pointer' key={item._id}>
                            <div className='flex items-center gap-2' onClick={() => navigate(`/profile/${item._id}`)}>
                                <div>
                                    <HoverCardUi item={item} />
                                </div>
                                <div>
                                    <p className='font-medium text-[14px]'>{item.userName}</p>
                                    <p className='font-light text-[14px] text-gray-400'>{item?.name || "abcd"}</p>
                                </div>
                            </div>
                            {/* <p>{item._id}</p> */}
                            {selected === item._id ? (
                                <Loader2 className='animate-spin text-blue-500 w-4 h-4' />
                            ) :
                                item?.followers.includes(user?._id) ?
                                    (<span className='text-sm text-[12px] text-gray-800 font-semibold cursor-pointer' onClick={() => followUnfollow(item._id)}>
                                        Following
                                    </span>)
                                    :
                                    (<span className='text-sm text-[12px] text-blue-600 font-semibold cursor-pointer' onClick={() => followUnfollow(item._id)}>
                                        Follow
                                    </span>)
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RightSidebar