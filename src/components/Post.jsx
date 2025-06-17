import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { HiDotsHorizontal } from "react-icons/hi";
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";
import { LuSend } from "react-icons/lu";
import CommentDialog from './CommentDialog';
import { useDispatch, useSelector } from 'react-redux';
import { addToBookMark, getAllPosts, getBookMarkedPosts, getProfile, handlecomment, handleDeletePost, handleLikeDislikepost, setComment } from '@/redux/postSlice';
import { useNavigate } from 'react-router-dom';
import { followOrUnfollow, getFollowers, getFollowing } from '@/redux/userSlice';
import { Loader2 } from 'lucide-react';


function Post({ item }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [bookMarkHandlerloading, setBookMarkHandlerloading] = useState(false)
    const [likeOrDislikeHandlerloading, setLikeOrDislikeHandlerloading] = useState(false)
    const [commentHandlerloading, setCommentHandlerloading] = useState(false)
    const { user, followings, loading } = useSelector((state) => state.user)
    const { bookMarks } = useSelector((state) => state.post)


    const [menuOpen, setMenuOpen] = useState(false)
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(getFollowing(user?._id))
    }, [user])

    const changeEventHandler = (e) => {
        const inpuText = e.target.value
        if (inpuText.trim()) {
            setText(inpuText)
        } else {
            setText('')
        }
    }
    const numberOfComments = item?.comments.length
    const numberOfLikes = item?.likes.length

    const deletePost = async (id) => {
        const res = await dispatch(handleDeletePost(id))
        if (res?.meta?.requestStatus === "fulfilled") {
            dispatch(getAllPosts())
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

    const commentHandler = async ({ id, text }) => {
        setCommentHandlerloading(true)
        const res = await dispatch(handlecomment({ id, text }))
        if (res?.meta?.requestStatus === "fulfilled") {
            dispatch(getAllPosts())
            setText('')
            setCommentHandlerloading(false)
        }
    }

    const bookMarkHandler = async (id) => {
        if (!id) return;
        setBookMarkHandlerloading(true)
        const res = await dispatch(addToBookMark(id));

        if (res?.meta?.requestStatus === "fulfilled") {
            dispatch(getBookMarkedPosts());
            setBookMarkHandlerloading(false)
        }
    };


    const followUnfollow = async ({ id, userId }) => {
        const res = await dispatch(followOrUnfollow(id));
        if (res?.meta?.requestStatus === "fulfilled") {
            dispatch(getFollowing(userId));
            setMenuOpen(false);
        }
    };



    return (
        <div className=''>
            <div className='flex flex-row items-center justify-between md:px-0 px-4 py-2 w-full md:w-96' >
                <div className='flex items-center gap-3'>
                    <div className='cursor-pointer' onClick={() => navigate(`/profile/${item?.userId?._id}`)}>
                        <Avatar>
                            <AvatarImage className='w-11 h-11 rounded-full object-cover' src={item?.userId?.profilePicture} />
                            <AvatarFallback className='bg-gray-400 w-11 h-11 rounded-full flex items-center justify-center text-white'>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p className='font-semibold text-[12px]'>{item?.userId?.userName}</p>
                        {item?.createdAt && (
                            <p className='text-xs text-gray-500'>
                                {formatDistanceToNow(new Date(Number(item.createdAt)), { addSuffix: true })}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <Dialog open={menuOpen} onOpenChange={setMenuOpen} item={item} user={user}>
                        <DialogTrigger asChild>
                            <button>
                                <HiDotsHorizontal className="w-5 h-5 text-gray-700 cursor-pointer" />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="fixed left-[50%] top-[50%] z-50 p-0 grid md:w-full w-2xs rounded-2xl max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 bg-background duration-200
                                    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
                                        sm:rounded-lg shadow-2xl">
                            <DialogTitle />
                            <div className="flex flex-col items-center justify-center text-center">
                                <button onClick={() => setMenuOpen(false)} className=" py-4 border-b-2 w-full text-sm font-semibold text-red-600">Report</button>
                                <div className="w-full">
                                    {bookMarkHandlerloading ? (
                                        <div className='py-3 border-b-2 w-full text-sm font-semibold'>
                                            < Loader2 className='animate-spin w-full mx-auto' />
                                        </div>
                                    ) :
                                        bookMarks?.some(post => post?._id === item?._id) ? (
                                            <button
                                                onClick={() => {
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
                                                    bookMarkHandler(item._id)
                                                    setMenuOpen(false)
                                                }}
                                                className="py-4 border-b-2 w-full text-sm font-semibold text-blue-600"
                                            >
                                                Add to Favorites
                                            </button>
                                        )
                                    }

                                    {
                                        user && user?._id === item?.userId?._id &&
                                        <button onClick={() => {
                                            setMenuOpen(false)
                                            deletePost(item?._id)
                                        }} className=" py-4 border-b-2 w-full text-sm font-semibold "
                                        >
                                            Delete
                                        </button>
                                    }

                                    {loading ?
                                        <div className='py-3 border-b-2 w-full text-sm font-semibold'>
                                            < Loader2 className='animate-spin w-full mx-auto' />
                                        </div>

                                        :
                                        user?._id !== item?.userId?._id ?
                                            followings?.some(following => following._id === item.userId._id) ? (
                                                <button
                                                    onClick={() => followUnfollow({ id: item.userId._id, userId: user._id })}
                                                    className='py-4 border-b-2 w-full text-sm font-semibold'
                                                >
                                                    Unfollow
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => followUnfollow({ id: item.userId._id, userId: user._id })}
                                                    className='py-4 border-b-2 w-full text-sm font-semibold'
                                                >
                                                    Follow
                                                </button>
                                            ) : ("")
                                    }


                                    <button onClick={() => setMenuOpen(false)} className=" py-4 w-full text-sm font-semibold ">Cancel</button>
                                </div>
                            </div>


                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className='md:w-96 w-full'>
                <img
                    className='rounded-sm w-full my-3 aspect-square object-cover'
                    src={item?.image}
                    alt="post"
                />
            </div>

            <div className='flex justify-between md:w-96 w-full pb-3 md:px-0 px-4'>
                <div className='flex gap-3'>
                    {likeOrDislikeHandlerloading ? <Loader2 className='animate-spin' /> :
                        item?.likes.includes(user?._id) ? (
                            <FaHeart
                                size={25}
                                className="text-red-500 cursor-pointer"
                                onClick={() => likeOrDislikeHandler(item?._id)}
                            />
                        ) : (
                            <FaRegHeart
                                size={25}
                                className="hover:text-gray-400 cursor-pointer"
                                onClick={() => likeOrDislikeHandler(item?._id)}
                            />
                        )}

                    <LuMessageCircle
                        onClick={() => {
                            dispatch(setComment({ id: user._id, postDetails: item }))
                            setOpen(true)
                        }}
                        size={25}
                        className="transform rotate-x-[45dge] cursor-pointer hover:text-gray-400"
                    />
                    <LuSend size={25} className="hover:text-gray-400 cursor-pointer" />
                </div>

                {bookMarkHandlerloading ? <Loader2 className='animate-spin' /> :
                    bookMarks?.some(bookmark => bookmark._id === item._id) ? (
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
            <span className='md:px-0 px-4'>{numberOfLikes} likes</span>
            <p className='font-normal text-[12px] '>
                <span className='font-semibold text-[12px] mr-1 md:px-0 px-4'>{item?.userId?.userName}</span>
                {item?.caption}
            </p>
            <span onClick={() => {
                dispatch(setComment({ id: user?._id, postDetails: item }))
                setOpen(true)
            }} className='text-gray-400 cursor-pointer md:px-0 px-4'>View all {numberOfComments} comments</span>
            <CommentDialog open={open} setOpen={setOpen} item={item} />
            <div className='flex items-center justify-between h-8 mb-1 placeholder-gray-400 md:px-0 px-4'>
                <input
                    type='text'
                    placeholder='Add a comment…'
                    value={text}
                    onChange={changeEventHandler}
                    className='outline-0 text-sm w-full'
                />
                {commentHandlerloading ? <Loader2 className='animate-spin w-4 h-4' /> :
                    text &&
                    <span
                        className='text-blue-600 font-bold cursor-pointer'
                        onClick={() => commentHandler({ id: item?._id, text: text })}
                    >
                        Post
                    </span>
                }
            </div>
            <hr />

        </div>
    )
}

export default Post