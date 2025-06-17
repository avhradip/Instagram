import FollowingNavbar from '../components/FollowingNavbar'
import InstagramLoader from '../components/InstagramLoader'
import { AvatarFallback } from '../components/ui/avatar'
import { followOrUnfollow, getFollowers, getFollowing, removeFollower } from '@/redux/userSlice'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { IoSearchOutline } from 'react-icons/io5'
import { LuDot } from 'react-icons/lu'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function Following({ id }) {
  const dispatch = useDispatch()
  const navigare = useNavigate()
  const [querie, setQuerie] = useState("")
  const [results, setResults] = useState([])
  const [loading2, setLoading2] = useState(false);
  const { followings, user, loading, buttonloading } = useSelector((state) => state?.user)
  const data = querie.length > 0 ? results : followings;


  useEffect(() => {
    if (querie.trim().length > 0) {
      setLoading2(true);
      const timeout = setTimeout(() => {
        const filtered = followings.filter(user =>
          user.userName.toLowerCase().includes(querie.toLowerCase())
        );
        setResults(filtered);
        setLoading2(false);
      }, 1500);

      return () => clearTimeout(timeout);
    } else {
      setResults([]);
      setLoading2(false);
    }
  }, [querie]);

  useEffect(() => {
    dispatch(getFollowing(id))
  }, [dispatch])

  const removefollowerFun = async ({ id, followerId }) => {
    const res = await dispatch(removeFollower(followerId))
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getFollowers(id))
    }
  }

  const followFun = async ({ id, followerId }) => {
    const res = await dispatch(followOrUnfollow(followerId))
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getFollowing(id))
    }
  }


  return (
    <div>
      <div className='fixed top-0 w-full'>
        <FollowingNavbar />
      </div>

      <div className='m-2 py-2 px-4 bg-gray-100 rounded-[10px] flex items-center'>
        {!querie && <IoSearchOutline className='text-gray-400' />}
        <input
          type="text"
          value={querie}
          onChange={(e) => setQuerie(e.target.value)}
          placeholder='Search by username'
          className='bg-transparent border-0 outline-0 w-full placeholder-gray-400'
        />
        {querie.length > 0 && (
          loading2
            ? <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            : <RxCross2 className="cursor-pointer bg-gray-300 text-white w-4.5 h-4 rounded-full" onClick={() => setQuerie("")} />
        )}
      </div>
      {loading2 ? <InstagramLoader /> :
        loading ? (<InstagramLoader />) : data && data.length > 0 ? (
          data.map(item => (
            <div key={item._id}>
              <div className='flex items-center justify-between p-2 '>
                <div className='flex items-center gap-2 '>
                  <div className='cursor-pointer' onClick={() => navigare(`/profile/${item._id}`)}>
                    <Avatar>
                      <AvatarImage className='rounded-full w-12 h-12 object-center' src={item?.profilePicture} alt={item?.name} />
                      <AvatarFallback className='bg-gray-200 rounded-full w-12 h-12'>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className='flex items-center gap-2'>

                      <p className='text-[12px] font-semibold'>{item?.userName}</p>

                      {/* {user._id !== id &&
                        user?._id !== item?._id && item?.following?.includes(user?._id) && (
                          <button
                            onClick={() => followFun({ id: user._id, followerId: item._id })}
                            disabled={buttonloading}
                            className='text-blue-500 text-[12px] font-medium flex items-center gap-1 disabled:opacity-60 disabled:cursor-not-allowed'
                          >
                            <span className='text-black'>
                              <LuDot />
                          </span>
                          {console.log(item?.following?.includes(user?._id))}
                          {item?.following?.includes(user?._id) ? "":
                              loading ? (
                              <Loader2 className='w-3 h-3 animate-spin' />
                            ) : (
                              "Follow"
                            )}
                          </button>
                        )} */}
                    </div>

                    <p className='text-[12px] font-medium text-gray-500'>{item?.name}</p>
                  </div>
                </div>
                {user._id === id &&
                  <button className='bg-gray-200 px-4 py-2 rounded-[10px] text-sm font-medium' onClick={() => followFun({ id: user?._id, followerId: item._id })}>
                    {loading ? <Loader2 className='w-6 h-6 animate-spin' /> : "Unfollow"}
                  </button>
                }
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-sm px-4 py-6 flex justify-center items-center'>
            {querie.length > 0
              ? `No results found for "${querie}".`
              : 'No following found.'}
          </p>
        )}
    </div >
  )
}

export default Following