import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { HiMagnifyingGlass } from "react-icons/hi2";
import { GoHome, GoHomeFill } from 'react-icons/go'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { PiCompassFill, PiCompassThin } from 'react-icons/pi';
import { IoSearch } from 'react-icons/io5';

function Bottombar() {
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation()


    return (
        <div className="md:hidden lg:hidden flex flex-row justify-around border-t-2 py-2 mx-auto bg-white ">
            <Link to="/" className=' flex items-center gap-4 px-2 py-1 rounded'>
                {location.pathname === "/" ? (
                    <GoHomeFill className='w-8 h-8' />
                ) : (
                    <GoHome className='w-8 h-8' />
                )}
            </Link>

            <Link to="/search" className='flex items-center gap-4 px-2 py-1 rounded '>
                {location.pathname === "/search" ? (
                    <IoSearch className="w-8 h-8" />
                ) : (
                    <HiMagnifyingGlass className="w-8 h-8" />
                )}
            </Link>

            <Link to="/explore" className='flex items-center gap-4 px-2 py-1 rounded '>
                {location.pathname === "/explore" ? (
                    <PiCompassFill className="w-8 h-8" />
                ) : (
                    <PiCompassThin className="w-8 h-8" />
                )}
            </Link>

            <div
                onClick={() => navigate(`/profile/${user?._id}`)}
                className="flex items-center gap-4 px-2 py-1 rounded cursor-pointer"
            >
                <Avatar
                    className={`w-6 h-6 rounded-full box-border flex items-center justify-center ${location.pathname === `/profile/${user?._id}` ? "border-2 border-black" : ""
                        }`}
                >
                    <AvatarImage className="rounded-full w-full h-full" src={user?.profilePicture} />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
            </div>


        </div>
    )
}

export default Bottombar