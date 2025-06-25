import React from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { followOrUnfollow, getSuggestedUsers } from '@/redux/userSlice'
import { IoPersonAddOutline } from 'react-icons/io5'
import Camera from '../../public/camra.png'
import { useDispatch } from 'react-redux'

function HoverCardUi({ item }) {
    const dispatch = useDispatch()
    
    const followUnfollow = async (id) => {
        const res = await dispatch(followOrUnfollow(id))
        if (res?.meta?.requestStatus === "fulfilled") {
            dispatch(getSuggestedUsers())
        }
    }
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Avatar>
                    <AvatarImage className='w-11 h-11 rounded-full' src={item.profilePicture} />
                    <AvatarFallback className='bg-gray-400 w-10 h-10 rounded-full'>CN</AvatarFallback>
                </Avatar>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="cursor-pointer">
                    <div className='flex items-center gap-4'>
                        <Avatar>
                            <AvatarImage className='w-11 h-11 rounded-full' src={item?.profilePicture} />
                            <AvatarFallback className='bg-gray-400 w-10 h-10 rounded-full'>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className='font-medium text-[14px]' >{item?.userName}</p>
                            <p className='font-light text-[14px] text-gray-400' >{item?.name}</p>
                        </div>
                    </div>
                    <div className='flex justify-between mt-8' >
                        <div className='flex flex-col items-center text-sm' >
                            {item?.posts?.length}
                            <p className='' >posts</p>
                        </div>
                        <div className='flex flex-col items-center text-sm' >
                            {item?.followers?.length}
                            <p className='' >followers</p>
                        </div>
                        <div className='flex flex-col items-center text-sm' >
                            {item?.following?.length}
                            <p className='' >followers</p>
                        </div>

                    </div>
                    <hr className='' />
                    <div className='mt-1 flex flex-row gap-1'>
                        {item?.posts?.length < 1 ?
                            <div className="flex flex-col w-full items-center justify-center">
                                {/* Gradient border wrapper */}
                                <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] rounded-full">
                                    {/* Inner white background circle */}
                                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center">
                                        <img src={Camera} alt="Camera" />
                                    </div>
                                </div>

                                <p className="w-full h-20 flex items-center justify-center text-sm text-gray-400">
                                    no post yet!
                                </p>
                            </div>
                            :
                            item?.posts?.slice()?.reverse()?.map((post) => (
                                <div key={post?._id}>
                                    <img
                                        src={post?.image}
                                        alt="user post"
                                        className='w-20 h-20 object-cover border aspect-square'
                                    />
                                </div>
                            ))}
                    </div>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        followUnfollow(item?._id)
                    }} className='w-full bg-blue-600 text-white flex items-center justify-center gap-1 py-2 rounded-[10px] my-3'><IoPersonAddOutline />Follow</button>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default HoverCardUi