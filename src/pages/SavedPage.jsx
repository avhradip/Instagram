import { getBookMarkedPosts, setComment } from '@/redux/postSlice'
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaComment } from "react-icons/fa";
import SaveNavbar from './SaveNavbar'
import { TiHeartFullOutline } from 'react-icons/ti'
import CommentDialog from '@/components/CommentDialog'

function SavedPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const { bookMarks } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(getBookMarkedPosts())
    }, [])

    const handleOpen = (item) => {
        dispatch(setComment({ postDetails: item }));
        setActiveItem(item);
        setOpen(true);
    };

    return (
        <div className=''>
            <div className="fixed top-0 w-full lg:hidden z-20">
                <SaveNavbar />
            </div>
            <div className='flex flex-col md:mt-0 md:px-[14%] w-full mx-2 mt-6'>
                <div className='md:flex hidden items-center'>
                    <button onClick={() => navigate(-1)}><IoIosArrowBack size={30} className='text-gray-500' /></button>
                    <p className='w-full font-medium text-gray-500 text-sm'>Saved</p>
                </div>
                <p className='ml-2'>All posts</p>
                <div className='grid grid-cols-3 gap-2'>
                    {bookMarks !== null &&
                        bookMarks?.map(item => (
                            <div
                                key={item._id}
                                className="relative group cursor-pointer"
                                onClick={() => handleOpen(item)}
                            >
                                <img
                                    src={item.image}
                                    alt={item.userName}
                                    className="aspect-square object-cover w-full"
                                />
                                {/* Hover Overlay */}
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
                        ))}
                </div>
                {activeItem && (
                    <CommentDialog open={open} setOpen={setOpen} item={activeItem} />
                )}
            </div>
        </div>
    )
}

export default SavedPage