import NotificationNavbar from '@/components/NotificationNavbar'
import { followOrUnfollow, getSuggestedUsers } from '@/redux/userSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { IoIosHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Notification() {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const { suggestedUsers, user } = useSelector((state) => state.user)
  const [selected, setSelocted] = useState(null)
  console.log(selected);

  const followUnfollow = async (id) => {
    setSelocted(id)
    const res = await dispatch(followOrUnfollow(id))
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getSuggestedUsers())
      setSelocted(null)
    }
  }

  return (
    <div className='flex flex-col'>
      <div className="fixed top-0 w-full lg:hidden">
        <NotificationNavbar />
      </div>
      <div className='min-h-[70vh] flex justify-center overflow-y-hidden'>
        <div className='md:w-96 w-full h-screen'>
          <div className='flex flex-col items-center text-center justify-center h-1/2 w-full'>
            <IoIosHeartEmpty size={"100px"} />
            <p>Activity on your posts</p>
            <p>When someone likes or comments on one of your posts, you'll see it here.</p>
          </div>
          <div className='h-1/2 space-y-2 w-full px-2'>
            <p className='font-medium text-[15px] pb-2'>Suggested for you</p>
            <div className='flex flex-col items-center gap-4'>
              {
                suggestedUsers.map(item => (
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
        </div>
      </div>
      <div className='w-full text-center text-blue-600 hover:text-gray-700 text-sm pb-10' onClick={() => navigate('/people')}>
        <p>See all suggestions</p>
      </div>
    </div >
  )
}

export default Notification