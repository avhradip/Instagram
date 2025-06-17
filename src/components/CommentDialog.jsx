import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Link } from 'react-router-dom'
import { Loader2, XIcon } from 'lucide-react'
import { Button } from './ui/button'
import { HiDotsHorizontal } from 'react-icons/hi'
import { addToBookMark, deleteComment, editComment, getAllPosts, getBookMarkedPosts, getComments, handlecomment, handleLikeDislikepost, setComment } from '@/redux/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Input } from './ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from 'react-icons/fa'
import { LuMessageCircle, LuSend } from 'react-icons/lu'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import InstagramLoader from './InstagramLoader'
import { RxCross2 } from 'react-icons/rx'

function CommentDialog({ open, setOpen, item }) {
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false)
  const [likeOrDislikeHandlerloading, setLikeOrDislikeHandlerloading] = useState(false)
  const [bookMarkHandlerloading, setBookMarkHandlerloading] = useState(false)
  const [commentHandlerloading, setCommentHandlerloading] = useState(false)
  const [edit, setEdit] = useState("")
  const [text, setText] = useState("")



  const { user } = useSelector((state) => state.user)
  const { selectedComment, comments, posts, bookMarks, loading } = useSelector((state) => state.post)
  

  useEffect(() => {
    dispatch(getBookMarkedPosts())
    const postId = selectedComment?.postDetails?._id;
    if (postId) {
      dispatch(getComments(postId))
    }
  }, [selectedComment, dispatch]);


  const changeEventHandler = (e) => {
    const inpuText = e.target.value
    if (inpuText.trim()) {
      setText(inpuText)
    } else {
      setText('')
    }
  }

  const commentHandler = async ({ id, text }) => {
    setCommentHandlerloading(true)
    const res = await dispatch(handlecomment({ id, text }))
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getComments(id))
      setText('')
      setCommentHandlerloading(false)
    }
  }

  const deleteCommentFun = async ({ id, postId }) => {
    const res = await dispatch(deleteComment(id))
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getComments(postId))
    }
  }

  const setEditFun = (item) => {
    setEdit(item?._id)
    setText(item?.text)
  }

  const editCommentFun = async ({ id, text, postId }) => {
    setCommentHandlerloading(true)
    const res = await dispatch(editComment({ id, text }))
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getComments(postId))
      setText("")
      setEdit("")
      setCommentHandlerloading(false)
    }
  }

  const bookMarkHandler = async (id) => {
    setBookMarkHandlerloading(true)
    const res = await dispatch(addToBookMark(id))
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getBookMarkedPosts())
      setBookMarkHandlerloading(false)
    }
  }

  const followUnfollow = async (id) => {
    const res = await dispatch(followOrUnfollow(id))
    if (res?.meta?.requestStatus === "fulfilled") {
      getProfile(id)
    }
  }

  const likeOrDislikeHandler = async (id) => {
    setLikeOrDislikeHandlerloading(true)
    const res = await dispatch(handleLikeDislikepost(id))
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getAllPosts())
      setLikeOrDislikeHandlerloading(false)
    }
  }



  return (
    <Dialog open={open} className='relative'>
      <VisuallyHidden>
        <DialogTitle>
          Comments
        </DialogTitle>
      </VisuallyHidden>
      {
        open && <XIcon className='absolute top-0 right-0' onClick={() => setOpen(false)} />
      }
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="
       md:max-w-2xl lg:max-w-4xl
      h-[80vh] max-h-[80vh]
      p-0 m-0 rounded-0
      flex flex-col md:flex-row
      overflow-hidden
    "
      >

        <div className="flex flex-col lg:flex-row w-full h-full">
          <div className="w-full lg:w-1/2 h-60 md:h-full md:ml-0 mr-0">
            <img
              src={item?.image}
              alt="post"
              className="w-full h-full aspect-square object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
            />
          </div>
          <div className=" md:ml-4 lg:w-1/2 h-full flex flex-col justify-between ">
            <div className=''>
              <div className='flex justify-between items-center p-1 border-b-1'>
                <div className='flex items-center gap-3'>
                  <Link>
                    <Avatar>
                      <AvatarImage className='w-11 h-11 rounded-full object-cover' src={item?.userId?.profilePicture} />
                      <AvatarFallback className='bg-gray-400 w-11 h-11 rounded-full flex items-center justify-center text-white'>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <Link>{item.userId.userName}</Link>
                </div>
                <div>

                  <Dialog open={menuOpen} onOpenChange={setMenuOpen}>

                    <DialogTrigger>
                      <HiDotsHorizontal className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent
                      className="w-72 p-0 rounded-xl overflow-hidden "
                    >
                      <div className="flex flex-col text-center divide-y divide-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setMenuOpen(false)}
                          className="py-3 text-sm text-red-500 font-semibold hover:bg-gray-100"
                        >
                          Report
                        </button>


                        {loading ?
                          (
                            <div
                              className='py-3 border-b-2 w-full text-sm font-semibold'
                            >
                              < Loader2 className='animate-spin ' />
                            </div>
                          )
                          :
                          bookMarks?.some(post => post?._id === item?._id) ? (
                            <button
                              onClick={() => {
                                // Handle remove to favorites
                                bookMarkHandler(item._id)
                                setMenuOpen(false)
                              }}
                              className="py-4 border-b-2 w-full text-sm font-semibold text-red-500"
                            >
                              Remove from Favorites
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                // Handle adding to favorites
                                bookMarkHandler(item?._id)
                                setMenuOpen(false)
                              }}
                              className="py-4 border-b-2 w-full text-sm font-semibold text-blue-600"
                            >
                              Add to Favorites
                            </button>
                          )
                        }


                        <button
                          onClick={() => setMenuOpen(false)}
                          className="py-3 text-sm text-gray-900 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                      </div>


                    </DialogContent>
                  </Dialog>


                </div>
              </div>
              <div className='md:h-90 h-[25vh] overflow-y-scroll whitespace-nowrap px-2 flex flex-col gap-4 mb-10 example'>
                {loading ? <InstagramLoader /> :
                  comments?.map((item) => (
                    <div key={item._id} className='flex justify-between items-center p-1'>
                      <div className='flex gap-1'>
                        <Avatar>
                          <AvatarImage
                            className='w-8 h-8 rounded-full object-cover'
                            src={item?.userId?.profilePicture}
                          />
                          <AvatarFallback className='bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center text-white'>
                            {item?.userId?.userName?.charAt(0)?.toUpperCase() || 'C'}
                          </AvatarFallback>
                        </Avatar>
                        <div className=''>
                          <p className='text-[15px] font-semibold'>
                            {item?.userId?.userName}{' '}
                            <span className='font-normal'>{item.text}</span>
                          </p>
                          {item?.createdAt && (
                            <p className='text-xs text-gray-500'>
                              {formatDistanceToNow(new Date(Number(item?.createdAt)), { addSuffix: true })}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='cursor-pointer'>
                        <Dialog>
                          <DialogTrigger>
                            <HiOutlineDotsHorizontal className='cursor-pointer' />
                          </DialogTrigger>
                          <DialogContent className=" w-60 h-fit p-0 m-0 flex items-center justify-center">
                            <DialogHeader>
                              <DialogTitle>
                              </DialogTitle>
                              <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <DialogTrigger
                              className="flex flex-col w-full divide-y divide-gray-200 text-center"
                            >
                              {user?._id === item?.userId?._id && (
                                <>
                                  <button
                                    className="py-3 text-sm text-blue-600 bg-transparent"
                                    onClick={() => setEditFun(item)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="py-3 text-sm bg-transparent"
                                    onClick={() => deleteCommentFun({ id: item?._id, postId: selectedComment?.postDetails?._id })}
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                              <button className="py-3 text-sm text-red-500 bg-transparent">
                                Report
                              </button>
                              <button className="py-3 text-sm bg-transparent">
                                Cancel
                              </button>
                            </DialogTrigger>
                          </DialogContent>
                        </Dialog>

                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className='flex flex-col sticky bottom-0 z-40 bg-white'>
              <div className='flex justify-between w-full '>
                <div className='flex gap-3'>
                  {likeOrDislikeHandlerloading ? <Loader2 className='animate-spin' /> :
                    posts?.find(p => p._id === item._id)?.likes?.some(like => like?.toString() === user?._id?.toString()) ? (
                      <FaHeart
                        size={25}
                        className="text-red-500 cursor-pointer"
                        onClick={() => likeOrDislikeHandler(item._id)}
                      />
                    ) : (
                      <FaRegHeart
                        size={25}
                        className="hover:text-gray-400 cursor-pointer"
                        onClick={() => likeOrDislikeHandler(item._id)}
                      />
                    )}




                  <LuMessageCircle
                    size={25}
                    className="transform rotate-x-[45dge] cursor-pointer hover:text-gray-400"
                  />
                  <LuSend size={25} className="hover:text-gray-400 cursor-pointer" />
                </div>

                {bookMarkHandlerloading ? <Loader2 className='animate-spin w-6 h-6' />
                  :
                  bookMarks?.some(post => post?._id === item?._id) ? (
                    <FaBookmark
                      size={25}
                      className="cursor-pointer text-black"
                      onClick={() => bookMarkHandler(item._id)}
                    />
                  ) : (
                    <FaRegBookmark
                      size={25}
                      className="hover:text-gray-400 cursor-pointer"
                      onClick={() => bookMarkHandler(item._id)}
                    />
                  )}

              </div>

              {(() => {
                const matchedPost = posts.find(p => p._id === item._id);
                return <span>{matchedPost?.likes?.length ?? 0} likes</span>;
              })()}


              <Input type="text" value={text} onChange={(e) => changeEventHandler(e)} placeholder='Add comment...' className='w-full outline-none border border-gray-200' />
              {
                edit == "" ?
                  <Button disabled={!text.trim()} onClick={() => commentHandler({ id: selectedComment?.postDetails?._id, text: text })}>
                    {commentHandlerloading ? <Loader2 className='animate-spin' /> : "send"}
                  </Button>
                  :
                  <Button disabled={!text.trim()} onClick={() => editCommentFun({ postId: selectedComment?.postDetails?._id, id: edit, text: text })}>
                    {commentHandlerloading ? <Loader2 className='animate-spin' /> : "update"}
                  </Button>
              }
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog >


  )
}

export default CommentDialog