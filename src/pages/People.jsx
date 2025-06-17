import PeopleNavbar from '../components/PeopleNavbar'
import { followOrUnfollow, getSuggestedUsers } from '@/redux/userSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from 'lucide-react'


function People() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { suggestedUsers, user, loading } = useSelector((state) => state.user)
    const [selected, setSelocted] = useState(null)

    const followUnfollow = async (id) => {
        setSelocted(id)
        const res = await dispatch(followOrUnfollow(id))
        if (res?.meta?.requestStatus === "fulfilled") {
            dispatch(getSuggestedUsers())
            setSelocted(null)
        }
    }

    return (
        <div className='flex flex-col items-center  justify-center w-full md:mt-[8%]'>
            <div className='md:w-120 w-full '>
                <div className="fixed top-0 md:w-120 w-full lg:hidden">
                    <PeopleNavbar />
                </div>
                <div className=' md:w-150 w-full flex justify-center overflow-y-hidden'>
                    <div className='md:w-150 w-full h-screen'>
                        <div className='h-1/2 space-y-2 w-full p-1 pt-2'>
                            <p className='font-medium text-sm'>Suggested</p>
                            <div className='flex flex-col items-center gap-2 justify-between p-1'>
                                {
                                    suggestedUsers?.map(item => (
                                        <div className='flex items-center justify-between w-full cursor-pointer' key={item._id} >
                                            <div className='flex items-center gap-2' onClick={() => navigate(`/profile/${item._id}`)}>
                                                <div>
                                                    <Avatar>
                                                        <AvatarImage className='w-11 h-11 rounded-full' src={item.profilePicture} />
                                                        <AvatarFallback className='bg-gray-400 w-10 h-10 p-2 rounded-full'>CN</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div>
                                                    <p className='font-medium text-[14px]'>{item.userName}</p>
                                                    <p className='font-light text-[14px] text-gray-400'>{item?.name || "abcd"}</p>
                                                </div>
                                            </div>
                                            <div>
                                                {item.followers.includes(user._id) ?
                                                    (<>
                                                        <Dialog>
                                                            <DialogTrigger>
                                                                <button className='text-[14px] text-gray-800 bg-gray-100 w-32 py-1.5 rounded-[10px] font-semibold cursor-pointer' >
                                                                    {loading ? <Loader2 className='animate-spin w-full mx-auto' /> : "Following"}
                                                                </button>
                                                            </DialogTrigger>
                                                            <DialogContent className="w-fit">
                                                                <div className='flex w-70 h-50 items-center justify-center'>
                                                                    <DialogHeader>
                                                                        <DialogTitle>
                                                                            <Avatar>
                                                                                <AvatarImage className='w-30 h-30 rounded-full mx-auto' src={item?.profilePicture} />
                                                                                <AvatarFallback className='bg-gray-400 w-10 h-10 p-2 rounded-full'>CN</AvatarFallback>
                                                                            </Avatar>
                                                                        </DialogTitle>
                                                                        <DialogDescription>
                                                                            Unfollow {item.userName}?
                                                                        </DialogDescription>
                                                                        <DialogTrigger className='flex flex-col w-full'>
                                                                            <button className='text-red-500' onClick={() => followUnfollow(item._id)}>Unfollow</button>
                                                                            <button>Cancel</button>
                                                                        </DialogTrigger>
                                                                    </DialogHeader>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </>
                                                    )
                                                    :
                                                    (<button className='text-[14px] text-white bg-blue-500 w-32 py-1.5 rounded-[10px] font-semibold cursor-pointer' onClick={() => followUnfollow(item._id)}>
                                                        {selected === item._id &&
                                                            loading ? <Loader2 className='animate-spin w-full mx-auto' /> : "Follow"
                                                        }
                                                    </button>)
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default People