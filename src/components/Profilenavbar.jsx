import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserFun } from '@/redux/userSlice';

function Profilenavbar({ user1 }) {
    const navugate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const logout = () => {
        localStorage.removeItem("userToken")
        navugate('/')
        dispatch(getUserFun())
    }

    return (
        <div className='w-full text-center py-2 md:hidden lg:hidden block border-b-2 bg-white'>
            {user1?.userName}
            {user?._id === user1?._id &&
                <AlertDialog>
                    <AlertDialogTrigger className=""><IoIosArrowDown /></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to log out? You will need to log in again to access your account.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    logout()
                                }}
                            >
                                Logout
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            }


        </div>
    )
}

export default Profilenavbar