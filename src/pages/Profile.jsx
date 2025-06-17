import { BsViewList } from "react-icons/bs";
import Profilenavbar from '../components/Profilenavbar'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { IoBookmarkOutline } from "react-icons/io5";
import { PiTagLight } from "react-icons/pi";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BsGrid3X3 } from "react-icons/bs";
import InstagramLoader from '../components/InstagramLoader';
import { addToBookMark, getAllPosts, getBookMarkedPosts, getUserPosts, handleDeletePost, handleLikeDislikepost, setComment, setProfile } from '@/redux/postSlice';
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { followOrUnfollow } from "@/redux/userSlice";
import { formatDistanceToNow } from "date-fns";
import { FaBookmark, FaComment } from "react-icons/fa";
import Following from "../components/Following";
import Followers from "../components/Followers";
import { TiHeartFullOutline } from "react-icons/ti";
import CommentDialog from "../components/CommentDialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Loader2 } from "lucide-react";


function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [post, setPosts] = useState(true)
  const [itemId, setItemId] = useState(null)
  const [open, setOpen] = useState(false)
  const [followUnfollowloading, setFollowUnfollowloading] = useState(false)
  const [activeItem, setActiveItem] = useState(null);
  const [saved, setSaved] = useState(false)
  const [feed, setFeed] = useState(false)
  const [tagged, setTagged] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user1, setUser] = useState({})
  const { id } = useParams()
  const { userPosts, loading } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.user)
  const { bookMarks } = useSelector((state) => state.post)

  // const userPosts =[]
  // console.log(activeItem);

  const getProfile = async (id) => {
    try {
      const token = localStorage.getItem("userToken")
      const res = await axios.get(`https://instagram-backend-bftn.onrender.com/api/v1/user/getprofile/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

      if (res?.data) {
        setUser(res.data.user)
      }
    } catch (error) {
      console.log('getProfile', error);
    }
  }

  useEffect(() => {
    getProfile(id)
    dispatch(getUserPosts(id))
    dispatch(getBookMarkedPosts())
  }, [dispatch, id])


  const followers = user1?.followers || [];
  const following = user1?.following || [];
  const postData = user1?.posts || [];

  const deletePost = async ({ postId, id }) => {
    const res = await dispatch(handleDeletePost(postId))
    if (res?.meta?.requestStatus === "fulfilled") {
      getProfile(id)
      setItemId(null)
    }
  }

  const likeOrDislikeHandler = async (postId, userId) => {
    const res = await dispatch(handleLikeDislikepost(postId));
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getUserPosts(userId));
    }
  }

  const followUnfollow = async (id) => {
    setFollowUnfollowloading(true)
    const res = await dispatch(followOrUnfollow(id))

    if (res?.meta?.requestStatus === "fulfilled") {
      getProfile(id)
      setFollowUnfollowloading(false)
    }
  }

  const bookMarkHandler = async ({ id, postId }) => {
    const res = await dispatch(addToBookMark(postId))
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getBookMarkedPosts())
    }
  }


  const handleOpen = (item) => {
    dispatch(setComment({ postDetails: item }));
    setActiveItem(item);
    setOpen(true);
  };



  return (
    <div className='md:mx-[10%]'>
      <div className="fixed top-0 w-full lg:hidden">
        <Profilenavbar user1={user1} />
      </div>
      <IoIosArrowBack size={20} onClick={() => navigate(-1)} />
      <div className='py-[3%] flex justify-start items-center gap-1.5 md:px-0 px-4'>
        <div className=' md:block lg:block hidden'>
          <div className='flex w-full gap-20'>
            <div className="w-32 h-32 shrink-0">
              <img
                className="rounded-full w-full h-full object-cover"
                src={user1.profilePicture || "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"}
                alt="profilePic"
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-4'>
                <p>{user1?.userName}</p>
                {
                  user?._id === user1?._id ?
                    <button className='bg-gray-100 px-4 py-1 text-sm rounded' onClick={() => navigate('/editprofile')}>Edit Profile</button>
                    :
                    <>
                      {
                        user1?.followers?.includes(user._id) ?
                          <button className='bg-gray-100 text-gray-800 text-sm font-medium w-30 py-1 rounded-sm flex items-center justify-center gap-1' onClick={() => followUnfollow(user1._id)}>{followUnfollowloading ? <Loader2 className="animate-spin" /> : "Following"} <MdKeyboardArrowDown size={20} /></button>
                          :
                          <>
                            {
                              <>
                                {user1?.following?.includes(user._id) ?
                                  <button className='bg-blue-500 text-white text-sm font-medium w-30 py-1 rounded-sm flex items-center justify-center' onClick={() => followUnfollow(user1._id)}>
                                    {followUnfollowloading ? <Loader2 className="animate-spin" /> : "Follow Back"}
                                  </button>
                                  :
                                  <button className='bg-blue-500 text-white text-sm w-30 py-1 mx-auto rounded-sm flex items-center justify-center' onClick={() => followUnfollow(user1._id)}>
                                    {followUnfollowloading ? <Loader2 className="animate-spin" /> : "Follow"}
                                  </button>
                                }
                              </>
                            }
                          </>
                      }

                    </>
                }

              </div>
              <div className='flex gap-10'>

                <p className="font-medium flex gap-1.5 items-center">
                  {postData.length || 0}
                  <span className="text-[15px] font-normal text-gray-500">
                    posts
                  </span>
                </p>


                <Dialog>
                  <VisuallyHidden>
                    <DialogTitle>
                      followers
                    </DialogTitle>
                  </VisuallyHidden>
                  <DialogTrigger>
                    <p className="font-medium cursor-pointer flex gap-1.5 items-center">
                      {followers.length || 0}
                      <span className="text-[15px] font-normal text-gray-500">
                        followers
                      </span>
                    </p>
                  </DialogTrigger>

                  <DialogContent
                    className="w-full max-w-md h-[500px] overflow-hidden p-0"
                  >
                    {/* <DialogTrigger asChild> */}
                    <div className="h-full overflow-y-auto p-4">
                      <Followers id={id} />
                    </div>
                    {/* </DialogTrigger> */}
                  </DialogContent>
                </Dialog>




                <Dialog>
                  <VisuallyHidden>
                    <DialogTitle>
                      following
                    </DialogTitle>
                  </VisuallyHidden>
                  <DialogTrigger>
                    <p className="font-medium cursor-pointer flex gap-1.5 items-center">
                      {following.length || 0}
                      <span className="text-[15px] font-normal text-gray-500">
                        following
                      </span>
                    </p>
                  </DialogTrigger>
                  <DialogContent
                    className="w-full max-h-md h-[500px] overflow-hidden p-0"
                  >
                    {/* <DialogTrigger asChild> */}
                    <div className="h-full overflow-y-auto p-4">
                      <Following id={id} />
                    </div>
                    {/* </DialogTrigger> */}
                  </DialogContent>
                </Dialog>


              </div>
              <div className='mt-5 flex flex-col gap-1 '>
                <div className='flex gap-10'>
                  <p className="text-[12px] font-medium">{user1?.name || "name"}</p>
                </div>
                <div className='min-w-full'>
                  <p className="text-[12px] font-light">{user1?.bio || 'Resort Owner and youtuber . Channel "Vivek Awasthi" 5 Lakh 11 Thousands Subscribers , Sponsors Pls Call 9953423776'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=' md:hidden lg:hidden block'>
          <div className='flex flex-col'>
            <div className="flex gap-2 items-start">
              <img
                className='rounded-full w-18 h-18 object-cover'
                src={user1.profilePicture || "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"}
                alt="profilePic"
              />
              <div className='flex items-center gap-4'>
                <p>{user1.userName}</p>
                {
                  user?._id === user1?._id ?
                    <button className='bg-gray-100 px-4 py-1 text-sm rounded' onClick={() => navigate('/editprofile')}>Edit Profile</button>
                    :
                    <>
                      {
                        user1?.followers?.includes(user._id) ?
                          <button className='bg-gray-100 text-gray-800 text-sm font-medium w-30 py-1 rounded-sm flex items-center justify-center gap-1' onClick={() => followUnfollow(user1._id)}>{followUnfollowloading ? <Loader2 className="animate-spin" /> : "Following"} <MdKeyboardArrowDown size={20} /></button>
                          :
                          <>
                            {
                              <>
                                {user1?.following?.includes(user._id) ?
                                  <button className='bg-blue-500 text-white text-sm font-medium w-30 py-1 rounded-sm flex items-center justify-center' onClick={() => followUnfollow(user1._id)}>
                                    {followUnfollowloading ? <Loader2 className="animate-spin" /> : "Follow Back"}
                                  </button>
                                  :
                                  <button className='bg-blue-500 text-white text-sm w-30 py-1 mx-auto rounded-sm flex items-center justify-center' onClick={() => followUnfollow(user1._id)}>
                                    {followUnfollowloading ? <Loader2 className="animate-spin" /> : "Follow"}
                                  </button>
                                }
                              </>
                            }
                          </>
                      }

                    </>
                }
                {
                  user?._id !== user1?._id &&
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button>
                          <HiOutlineDotsHorizontal size={20} className="text-gray-700 hover:text-black" />
                        </button>
                      </DialogTrigger>
                      <DialogTrigger asChild>
                        <DialogContent className="w-60 p-0 rounded-xl overflow-hidden">
                          <div className="flex flex-col divide-y divide-gray-300 text-sm font-medium">
                            <button className="text-red-600 hover:bg-red-100 w-full py-3">Block</button>
                            <button className="hover:bg-gray-100 w-full py-3">Report</button>
                            <button className="hover:bg-gray-100 w-full py-3">Cancel</button>
                          </div>
                        </DialogContent>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                }

              </div>
            </div>
            <div className='space-y-2'>
              <div className='mt-5 flex flex-col gap-1 '>
                <div className='flex gap-10'>
                  <p>{user1?.name || "name"}</p>
                </div>
                <div className='min-w-full'>
                  <p>{user1?.bio || 'Resort Owner and youtuber . Channel "Vivek Awasthi" 5 Lakh 11 Thousands Subscribers , Sponsors Pls Call 9953423776'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='flex justify-around md:hidden lg:hidden border-t-1 border-b-1 py-2'>
          <div className='flex flex-col items-center'>
            <p>{postData.length || 0} </p>
            <p>posts</p>
          </div>


          <div className='flex flex-col items-center' onClick={() => navigate(`/followers/${user1._id}`)}>
            <p>{followers.length || 0}</p>
            <p>followers</p>
          </div>
          <div className='flex flex-col items-center' onClick={() => navigate(`/following/${user1._id}`)}>
            <p>{following.length || 0}</p>
            <p>following</p>
          </div>
        </div>
        <nav className='w-full flex justify-center items-center gap-19 text-sm py-4 border-t border-gray-300'>
          <div
            onClick={() => {
              setPosts(true)
              setFeed(false)
              setSaved(false)
              setTagged(false)
              dispatch(getUserPosts(id))
            }}
            className='flex items-center gap-1 cursor-pointer'
          >
            {
              post ? (
                <>
                  <BsGrid3X3 size={20} className="text-blue-600 md:hidden block" />
                  <BsGrid3X3 size={10} className="text-black md:block hidden" />
                  <p className='md:block lg:block hidden text-[12px] font-bold text-black'>POSTS</p>
                </>
              ) : (
                <>
                  <BsGrid3X3 size={20} className="text-gray-500 md:hidden block" />
                  <BsGrid3X3 size={10} className="text-gray-500 md:block hidden" />
                  <p className='md:block lg:block hidden text-[12px] font-bold text-gray-500'>POSTS</p>
                </>
              )
            }

          </div>
          <div
            onClick={() => {
              setPosts(false)
              setFeed(true)
              setSaved(false)
              setTagged(false)
              dispatch(getUserPosts(id))
            }}
            className='flex items-center gap-1 cursor-pointer'
          >
            {
              feed === true ? (
                <>
                  <BsViewList size={20} className="text-blue-600 md:hidden block" />
                  <BsViewList size={10} className="text-black md:block hidden" />
                  <p className='md:block lg:block hidden text-[12px] font-bold text-black'>FEED</p>
                </>
              ) : (
                <>
                  <BsViewList size={20} className="text-gray-500 md:hidden block" />
                  <BsViewList size={10} className="text-gray-500 md:block hidden" />
                  <p className='md:block lg:block hidden text-[12px] font-bold text-gray-500'>FEED</p>
                </>
              )
            }
          </div>
          {user?._id == id &&
            <div
              onClick={() => {
                setPosts(false)
                setFeed(false)
                setSaved(true)
                setTagged(false)
              }}
              className='flex items-center gap-1 cursor-pointer'
            >
              {
                saved ? (
                  <>
                    <IoBookmarkOutline size={20} className="text-blue-600 md:hidden block" />
                    <IoBookmarkOutline size={10} className="text-black md:block hidden" />
                    <p className='md:block lg:block hidden text-[12px] font-bold text-black'>SAVED</p>
                  </>
                ) : (
                  <>
                    <IoBookmarkOutline size={20} className="text-gray-500 md:hidden block" />
                    <IoBookmarkOutline size={10} className="text-gray-500 md:block hidden" />
                    <p className='md:block lg:block hidden text-[12px] font-bold text-gray-500'>SAVED</p>
                  </>
                )
              }
            </div>
          }
          <div
            onClick={() => {
              setPosts(false)
              setFeed(false)
              setSaved(false)
              setTagged(true)
            }}
            className='flex items-center gap-1 cursor-pointer'>
            {
              tagged ? (
                <>
                  <PiTagLight size={20} className="text-blue-600 md:hidden block" />
                  <PiTagLight size={10} className="text-black md:block hidden" />
                  <p className='md:block lg:block hidden text-[12px] font-bold text-black'>TAGGED</p>
                </>
              ) : (
                <>
                  <PiTagLight size={20} className="text-gray-500 md:hidden block" />
                  <PiTagLight size={10} className="text-gray-500 md:block hidden" />
                  <p className='md:block lg:block hidden text-[12px] font-bold text-gray-500'>TAGGED</p>
                </>
              )
            }
          </div>
        </nav>

        <div>
          {
            loading ? <InstagramLoader /> :
              post &&
              <div className="grid grid-cols-3 gap-[2px]">
                {

                  userPosts?.length < 1 ? (
                    <div className="col-span-3 text-center py-10">
                      <p className="text-gray-500 text-lg">No Posts Available</p>
                      <p className="text-sm text-gray-400 mt-2">Start sharing your moments!</p>
                    </div>
                  ) : (

                    userPosts
                      ?.slice()
                      ?.reverse()
                      ?.map((item, index) => (
                        <div
                          key={index}
                          className="w-full aspect-square overflow-hidden relative group"
                          onClick={() => handleOpen(item)}
                        >
                          <img
                            src={item?.image}
                            alt="Post"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                            <div className="flex items-center gap-1 text-white">
                              <TiHeartFullOutline size={22} className="group-hover:scale-110 transition-transform" />
                              <span className="text-sm font-semibold">{item?.likes?.length}</span>
                            </div>
                            <div className="flex items-center gap-1 text-white">
                              <FaComment size={20} className="group-hover:scale-110 transition-transform" />
                              <span className="text-sm font-semibold">{item?.comments?.length}</span>
                            </div>
                          </div>
                        </div>
                      )))}
              </div>
          }
          {activeItem && (
            <CommentDialog open={open} setOpen={setOpen} item={activeItem} />
          )}
        </div>
        {
          loading ? <InstagramLoader /> :
            feed &&
            <div className="flex flex-col gap-4 ">
              {
                userPosts?.length < 1 ? (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500 text-lg">No Posts Available</p>
                    <p className="text-sm text-gray-400 mt-2">Start sharing your moments!</p>
                  </div>
                ) : (
                  userPosts
                    ?.slice()
                    ?.reverse()
                    ?.map((item) => (
                      <div key={item._id} className="flex flex-col items-center justify-center pb-7 mx-auto">
                        <div className="flex flex-row items-center md:w-96 w-full px-4 justify-between p-2">

                          <div className='flex items-center gap-3'>
                            <div>
                              <Avatar>
                                <AvatarImage className='w-11 h-11 rounded-full object-cover' src={item?.userId?.profilePicture} />
                                <AvatarFallback className='bg-gray-400 w-11 h-11 rounded-full flex items-center justify-center text-white'>CN</AvatarFallback>
                              </Avatar>
                            </div>
                            <div>
                              <p className='font-semibold'>{item?.userId?.userName}</p>
                            </div>
                            {item?.createdAt && (
                              <p className='text-xs text-gray-500'>
                                {formatDistanceToNow(new Date(Number(item.createdAt)), { addSuffix: true })}
                              </p>
                            )}
                          </div>
                          <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
                            <DialogTrigger asChild>
                              <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => setItemId(item._id)}>
                                <HiDotsHorizontal className="w-5 h-5 text-gray-700" />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="fixed left-[50%] top-[50%] z-50 p-0 grid md:w-full w-2xs rounded-2xl max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 bg-background duration-200
                                    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
                                        sm:rounded-lg shadow-2xl">
                              <DialogTitle />
                              <div className="flex flex-col items-center justify-center text-center">
                                {user._id === item._id && <button onClick={() => {
                                  setMenuOpen(false)
                                  deletePost({ postId: itemId, id: id })
                                }} className=" py-4 w-full text-sm font-semibold "
                                >
                                  <p>Delete</p>
                                </button>}

                                {user1?.followers?.includes(user._id) ?

                                  <button onClick={() => {
                                    setMenuOpen(false)
                                    followUnfollow(user1._id)
                                  }} className=" py-4 w-full text-sm font-semibold ">Unfollow</button>
                                  :
                                  <button onClick={() => {
                                    setMenuOpen(false)
                                    followUnfollow(user1._id)
                                  }} className=" py-4 w-full text-sm font-semibold ">Follow</button>
                                }
                                <button onClick={() => setMenuOpen(false)} className=" py-4 border-t-2 w-full text-sm font-semibold ">Cancel</button>
                              </div>

                            </DialogContent>
                          </Dialog>
                        </div>
                        <div className="">
                          <img
                            src={item?.image}
                            alt="Post"
                            className="md:w-96 w-full h-full aspect-square object-cover"
                          />
                        </div>
                        <div className="md:w-96 w-full px-4">
                          <div className="flex justify-between items-center py-2">
                            <div className="flex gap-3 items-center">
                              {item?._id && item?.userId?._id && Array.isArray(item?.likes) && item.likes.includes(user._id) ? (
                                <FaHeart
                                  size={25}
                                  className="text-red-500 cursor-pointer"
                                  onClick={() => likeOrDislikeHandler(item._id, item.userId._id)}
                                />
                              ) : (
                                <FaRegHeart
                                  size={25}
                                  className="hover:text-gray-400 cursor-pointer"
                                  onClick={() => likeOrDislikeHandler(item._id, item.userId._id)}
                                />
                              )}

                              <LuMessageCircle
                                onClick={() => {
                                  dispatch(setProfile(item))
                                  navigate(`/commentpage/${item._id}`)
                                }}
                                size={25}
                                className="transform rotate-x-[45dge] cursor-pointer hover:text-gray-400"
                              />
                            </div>

                            {bookMarks?.some(post => post?._id === item?._id) ? (
                              <FaBookmark
                                size={25}
                                className="cursor-pointer text-black"
                                onClick={() => bookMarkHandler({ id: user1._id, postId: item?._id })}
                              />
                            ) : (
                              <FaRegBookmark
                                size={25}
                                className="hover:text-gray-400 cursor-pointer"
                                onClick={() => bookMarkHandler({ id: user1._id, postId: item?._id })}
                              />
                            )}


                          </div>
                          <span>{(item?.likes).length} likes</span>
                          <p className='font-normal '>
                            <span className='font-bold mr-1'>{item?.userId?.userName}</span>
                            {item?.caption}
                          </p>
                          <span onClick={() => {
                            dispatch(setProfile(item))
                            navigate(`/commentpage/${item._id}`)
                          }}
                            className='text-gray-400 cursor-pointer'>
                            View all {(item.comments).length} comments
                          </span>
                        </div>
                      </div>
                    )))}
            </div>
        }
        {
          user?._id === id &&
          saved &&
          <div className="w-full flex flex-col items-center justify-center">
            <p>Only you can see what you've saved</p>
            {
              bookMarks?.length < 1 ? (
                <div className="col-span-3 md:w-96 w-full text-center py-10">
                  <p className="text-gray-500 text-lg">No Posts Available</p>
                  <p className="text-sm text-gray-400 mt-2">Start sharing your moments!</p>
                </div>
              ) : (
                <div className="w-80 flex flex-wrap cursor-pointer" onClick={() => navigate('/saved')} >
                  {bookMarks?.slice(0, 4)?.map((item, index) => (
                    <div key={index} className="w-40 aspect-square overflow-hidden">
                      <img
                        src={item?.image}
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        }
        {
          tagged && <p className="w-full text-center text-gray-500">No tagged post abalabel</p>
        }
      </div>
    </div >
  )
}

export default Profile