import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import CommentNavbar from '@/components/commentNavbar';
import { Input } from '@/components/ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment, getComments, handlecomment } from '@/redux/postSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { formatDistanceToNow } from 'date-fns';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import InstagramLoader from '@/components/InstagramLoader';

function CommentPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [edit, setEdit] = useState("")
    const [commentHandlerloading, setCommentHandlerloading] = useState(false)
    const { comments, profile, loading } = useSelector((state) => state.post)
    const { user } = useSelector((state) => state.user)


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
            setEdit("")
            setCommentHandlerloading(false)
        }
    }

    useEffect(() => {
        dispatch(getComments(id))

    }, [id])


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

    const editCommentFun = async ({ postId, text, id }) => {
        setCommentHandlerloading(true)
        const res = await dispatch(editComment({ id, text }))
        if (res?.meta?.requestStatus === "fulfilled") {
            dispatch(getComments(postId))
            setText('')
            setEdit("")
            setCommentHandlerloading(false)
        }
    }

    return (
        <div className='flex flex-col'>
            <div className="fixed top-0 w-full lg:hidden">
                <CommentNavbar />
            </div>
            <div className='bg-white py-2 flex items-start'>
                <button className='md:block hidden' onClick={() => navigate(-1)}><IoIosArrowBack size={40} /></button>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage className='w-11 h-11 rounded-full object-cover' src={profile?.userId?.profilePicture} />
                        <AvatarFallback className='bg-gray-400 w-11 h-11 rounded-full flex items-center justify-center text-white'>CN</AvatarFallback>
                    </Avatar>
                    <p className='font-normal '>
                        <span className='font-bold mr-1'>{profile?.userId?.userName}</span>
                        {profile?.caption}
                    </p>
                </div>
            </div>
            <hr />

            <div className='min-h-[70vh] overflow-y-hidden'>
                {loading ? <InstagramLoader /> :
                    Array.isArray(comments) && comments.length > 0 ? (
                        comments.slice().reverse().map(item => (
                            <div key={item._id} className='flex justify-between items-center p-1'>
                                <div className='flex gap-1'>
                                    <Avatar>
                                        <AvatarImage
                                            className='w-11 h-11 rounded-full object-cover'
                                            src={item?.userId?.profilePicture}
                                        />
                                        <AvatarFallback className='bg-gray-400 w-11 h-11 rounded-full flex items-center justify-center text-white'>
                                            {item?.userId?.userName?.charAt(0)?.toUpperCase() || 'C'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className='text-[15px] font-semibold'>
                                            {item?.userId?.userName}{' '}
                                            <span className='font-normal'>{item.text}</span>
                                        </p>
                                        {item.createdAt && (
                                            <p className='text-xs text-gray-500'>
                                                {formatDistanceToNow(new Date(Number(item.createdAt)), { addSuffix: true })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>


                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button>
                                                <HiOutlineDotsHorizontal size={22} />
                                            </button>
                                        </DialogTrigger>

                                        <DialogContent className="p-0 w-[90%] max-w-sm rounded-xl overflow-hidden">
                                            <div className="flex flex-col text-center text-sm font-medium divide-y divide-gray-300">

                                                {user._id === item.userId._id && (
                                                    <>
                                                        <DialogClose asChild>
                                                            <button
                                                                onClick={() => deleteCommentFun({ id: item._id, postId: item.post })}
                                                                className="py-3 text-red-500 hover:bg-gray-100"
                                                            >
                                                                Delete
                                                            </button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <button
                                                                onClick={() => {
                                                                    setEditFun(item);
                                                                }}
                                                                className="py-3 hover:bg-gray-100"
                                                            >
                                                                Edit
                                                            </button>
                                                        </DialogClose>
                                                    </>
                                                )}
                                                <DialogClose asChild>
                                                    <button className="py-3 text-red-500 hover:bg-gray-100">
                                                        Report
                                                    </button>
                                                </DialogClose>
                                                <DialogClose asChild>
                                                    <button className="py-3 font-semibold hover:bg-gray-100">
                                                        Cancel
                                                    </button>
                                                </DialogClose>
                                            </div>
                                        </DialogContent>
                                    </Dialog>


                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-10">No comments available.</p>
                    )}
            </div>

            <div className='flex items-center gap-2 mx-2'>
                <Input
                    value={text}
                    onChange={changeEventHandler}
                    placeholder="Add a comment.."
                />
                {text && (
                    edit !== "" ? (
                        <span
                            className="text-blue-600 font-semibold text-[12px] cursor-pointer"
                            onClick={() => editCommentFun({ id: edit, text: text, postId: id })}
                        >
                            {commentHandlerloading ? <Loader2 className='animate-spin text-blue-600' /> : "Update"}
                        </span>
                    ) : (
                        <span
                            className="text-blue-600 font-semibold cursor-pointer text-[12px]"
                            onClick={() => commentHandler({ id: id, text: text })}
                        >
                            {commentHandlerloading ? <Loader2 className='animate-spin text-blue-600' /> : "Post"}
                        </span>
                    )
                )}
            </div>
        </div >
    )
}

export default CommentPage