import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GoHome } from "react-icons/go";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiHeart, CiSquarePlus } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"; // shadcn/ui version
import logo2 from "/logo2.png";
import logo from "/logo3.jpeg";
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import CreatePost from './CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { PiCompassThin } from 'react-icons/pi';
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { PiCompassFill } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { BsClipboardHeartFill } from 'react-icons/bs';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { getUserFun } from '@/redux/userSlice';

function Sidebar() {
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [menu, setMenu] = useState(false)
    const [open, setOpen] = useState(false)

    const logOut = () => {
        localStorage.removeItem("userToken");
    };

    const setOnenHandler = () => {
        setOpen(true)
    }


    return (
        <div className="lg:w-52 border-r-2 ">
            {/* Desktop Sidebar */}
            <nav className="hidden lg:flex flex-col justify-between h-screen fixed top-0 left-0">
                <div className="flex flex-col gap-4 ml-3 my-8 w-full">
                    <img src={logo2} alt="logo" className='w-22 h-6 ml-1' onClick={() => navigate('/')} />

                    <Link to="/" className='hover:bg-gray-100 flex items-center gap-4 px-2 py-1 rounded-sm cursor-pointer'>
                        {location.pathname === "/" ? (
                            <GoHomeFill className='w-8 h-8' />
                        ) : (
                            <GoHome className='w-8 h-8' />
                        )}
                        <p>Home</p>
                    </Link>

                    <Link to="/search" className='hover:bg-gray-100 flex items-center gap-4 px-2 py-1 rounded-sm cursor-pointer'>
                        {location.pathname === "/search" ? (
                            <IoSearch className="w-8 h-8" />
                        ) : (
                            <HiMagnifyingGlass className="w-8 h-8" />
                        )}
                        <p>Search</p>
                    </Link>

                    <Link to="/explore" className='hover:bg-gray-100 flex items-center gap-4 px-2 py-1 rounded-sm cursor-pointer'>

                        {location.pathname === "/explore" ? (
                            <PiCompassFill className="w-8 h-8" />
                        ) : (
                            <PiCompassThin className="w-8 h-8" />
                        )}
                        <p>Explore</p>
                    </Link>

                    <Link to="/notoifications" className='hover:bg-gray-100 flex items-center gap-4 px-2 py-1 rounded-sm cursor-pointer'>
                        {location.pathname === "/notoifications" ? (
                            <FaHeart className="w-6 h-6" />
                        ) : (
                            <CiHeart className="w-8 h-8" />
                        )}
                        <p>Notoifications</p>
                    </Link>

                    <div className='hover:bg-gray-100 flex items-center gap-4 px-2 py-1 rounded-sm cursor-pointer'
                        onClick={() => setOnenHandler()}
                    >
                        <CiSquarePlus className='w-8 h-8' />
                        <p>Create</p>
                    </div>

                    <div onClick={() => navigate(`/profile/${user._id}`)} className='hover:bg-gray-100 flex items-center gap-4 px-2 py-1 rounded-sm cursor-pointer'>
                        <Avatar>
                            <AvatarImage className='rounded-full' src={user?.profilePicture || "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"} />
                            <AvatarFallback className='rounded-full'>CN</AvatarFallback>
                        </Avatar>
                        <p>Profile</p>
                    </div>
                </div>

                <div className="flex items-center hover:bg-gray-200 gap-4 px-2 py-1 rounded-2xl ml-3 mx-1 mb-6 cursor-pointer"
                    onClick={() => setMenu(!menu)}
                >
                    <RxHamburgerMenu className="w-8 h-8" />
                    <p>More</p>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <nav className="hidden md:flex lg:hidden flex-col justify-between h-screen fixed top-0 left-0 ">
                <div className="flex flex-col items-center gap-4 px-3">
                    <img src={logo} alt="logo" className="w-8 h-8 my-6 cursor-pointer" onClick={() => navigate('/')} />

                    <Link to="/" className='hover:bg-gray-100 flex items-center gap-4 px-2 py-1 rounded-sm cursor-pointer'>
                        {location.pathname === "/" ? (
                            <GoHomeFill className='w-8 h-8' />
                        ) : (
                            <GoHome className='w-8 h-8' />
                        )}
                    </Link>

                    <Link to="/search" className='hover:bg-gray-100 flex items-center gap-4 px-2 py-1 rounded-sm cursor-pointer'>
                        {location.pathname === "/search" ? (
                            <IoSearch className="w-8 h-8" />
                        ) : (
                            <HiMagnifyingGlass className="w-8 h-8" />
                        )}
                    </Link>

                    <Link to="/explore" className='hover:bg-gray-100 flex items-center gap-4 px-2 py-1 rounded-sm cursor-pointer'>

                        {location.pathname === "/explore" ? (
                            <PiCompassFill className="w-8 h-8" />
                        ) : (
                            <PiCompassThin className="w-8 h-8" />
                        )}
                    </Link>

                    <Link to="/notoifications" className='hover:bg-gray-100 flex items-center gap-4 px-2 py-1 rounded-sm cursor-pointer'>
                        {location.pathname === "/notoifications" ? (
                            <FaHeart className="w-6 h-6" />
                        ) : (
                            <CiHeart className="w-8 h-8" />
                        )}
                    </Link>

                    <div
                        className="p-2 rounded"
                        onClick={() => setOnenHandler()}
                    >
                        <CiSquarePlus className='w-8 h-8' />
                    </div>

                    <div onClick={() => navigate(`/profile/${user._id}`)} className="p-2 rounded">
                        <Avatar>
                            <AvatarImage src={user?.profilePicture} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <div className="flex items-center gap-4 px-4 mb-4"
                    onClick={() => setMenu((prev) => !prev)}
                >
                    <RxHamburgerMenu
                        className="w-8 h-8"
                    />
                </div>
            </nav>

            <Dialog open={open} onOpenChange={setOpen}>

                {/* Must be direct child of <Dialog> */}
                <DialogContent
                    onInteractOutside={() => setOpen(false)}
                    className="p-0 m-0 w-[90vw] max-w-4xl h-fit overflow-hidden rounded-xl"
                >
                    <CreatePost setOpen={setOpen} />
                </DialogContent>
            </Dialog>




            <Dialog open={menu} onOpenChange={setMenu}>
                <DialogContent className="max-w-sm text-center">
                    <DialogHeader>
                        <DialogTitle className="flex justify-center">
                            <img src={logo2} alt="logo" width={100} height={30} />
                        </DialogTitle>
                        <DialogDescription className="text-base text-black font-medium py-4 flex justify-center">
                            Are you sure you want to log out?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex mx-auto items-center h-fit justify-center">
                        <Button
                            onClick={() => {
                                logOut()
                                setMenu(false)
                                dispatch(getUserFun())
                                navigate("/")
                            }}
                            className="bg-blue-700"
                        >
                            Log Out
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default Sidebar;
