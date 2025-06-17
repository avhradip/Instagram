import React, { useState } from 'react'
import logo2 from "/logo2.png";
import { CiSquarePlus } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CreatePost from './CreatePost';


function Navbar() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const setOnenHandler = () => {
        setOpen(true)
    }
    return (
        <div>
            <div className='md:hidden lg:hidden flex items-center justify-between px-[2%] border-b-2 py-2 bg-white'>
                <div>
                    <img src={logo2} alt="logo" className='w-28 h-8 ml-1' />
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <div className='flex gap-2 '>
                        <DialogTrigger>
                            <CiSquarePlus
                                className='w-8 h-8'
                                onClick={() => setOnenHandler()}
                            />
                        </DialogTrigger>
                        <CiHeart className="w-8 h-8" onClick={() => navigate("/notoifications")} />
                    </div>
                    {/* Must be direct child of <Dialog> */}
                    <DialogContent
                        onInteractOutside={() => setOpen(false)}
                        className="p-0 m-0 w-[90vw] max-w-4xl h-[70vh] overflow-hidden rounded-xl"
                    >
                        <CreatePost setOpen={setOpen} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Navbar