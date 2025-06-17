import EditNavbar from '@/components/EditNavbar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from "@/components/ui/switch"
import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { editProfile, getUserFun } from '@/redux/userSlice';
import { Loader2 } from 'lucide-react';



function EditProfilePage() {
    const dispatch = useDispatch()
    const { user, loading } = useSelector((state) => state.user)
    const [userName, setUserName] = useState(user?.userName)
    const [name, setName] = useState(user?.name)
    const [bio, setBio] = useState(user?.bio)
    const [gender, setGender] = useState(user?.gender)
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || null)


    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setProfilePicture(selected);
        console.log("Selected file:", selected);
    };

    const handleSubmit = ({ userName, name, bio, gender, profilePicture }) => {
        console.log("Values going into FormData:", { userName, name, bio, gender, profilePicture });

        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("name", name);
        formData.append("bio", bio);
        formData.append("gender", gender);

        if (profilePicture) {
            formData.append("profilePicture", profilePicture);
        }

        // Check the FormData contents (log helper below)
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        dispatch(editProfile(formData))
        dispatch(getUserFun())
    };


    return (
        <div className='w-full flex flex-col justify-center items-center py-1 px-2'>
            <div className='fixed top-0 w-full lg:hidden'>
                <EditNavbar />
            </div>
            <div className='md:mt-10 md:w-150 w-full'>
                <div>
                    <p className='text-[20px] font-semibold md:block hidden'>Edit Profile</p>
                </div>
                <div className='flex flex-col gap-10'>
                    <div className='w-full flex justify-between items-center bg-gray-100 p-4 rounded-2xl'>
                        <div className='flex items-center gap-2'>
                            <div>
                                <img
                                    className='w-14 rounded-full aspect-square object-cover'
                                    src={
                                        profilePicture
                                            ? typeof profilePicture === 'string'
                                                ? profilePicture
                                                : URL.createObjectURL(profilePicture)
                                            : "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"
                                    }
                                    alt={userName}
                                />
                            </div>
                            <div>
                                <p className='font-bold'>{userName}</p>
                                <p>{name}</p>
                            </div>

                        </div>

                        <Dialog>
                            <DialogTrigger>
                                <button className='text-[14px] text-white rounded-[10px] bg-blue-500 h-8 px-3'>Change photo</button>
                            </DialogTrigger>
                            <DialogContent>
                                <div className='flex flex-col items-center justify-center'>
                                    <DialogHeader>
                                        <DialogTitle>Change profile photo</DialogTitle>
                                        <DialogDescription>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Input id="picture" type="file" onChange={handleFileChange} />
                                    <DialogTrigger><Button variant="outline" className=''>Cancel</Button></DialogTrigger>
                                </div>
                            </DialogContent>
                        </Dialog>

                    </div>
                    <div className='flex flex-col gap-2 -z-30'>
                        <p className='font-semibold'>Website</p>
                        <Textarea className="bg-gray-200 rounded-2xl" disabled type="text" placeholder="Website" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold'>Bio</p>
                        <Textarea className="rounded-2xl" value={bio} onChange={(e) => setBio(e.target.value)} type="text" placeholder="Add Bio.." />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold'>User name</p>
                        <Textarea className="rounded-2xl" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Add Bio.." />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold'>Name</p>
                        <Textarea className="rounded-2xl" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Add Bio.." />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold'>Show Threads badge</p>
                        <div className='flex justify-between items-center py-6 px-4 rounded-2xl border-1 border-gray-200'>
                            <p>Show Threads badge</p>
                            <Switch />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold'>Gender</p>

                        <Select value={gender} onValueChange={(val) => setGender(val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className='text-[10px]'>This won't be part of your public profile.</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold'>Show account suggestions on profiles</p>
                        <div className='flex justify-between items-center py-6 px-4 rounded-2xl border-1 border-gray-200'>
                            <p>Show account suggestions on profiles</p>
                            <Switch />
                        </div>
                    </div>
                    <p className='text-[10px] text-gray-500'>Certain profile info, such as your name, bio and links, is visible to everyone. <span className='text-blue-600'>See what profile info is visible</span></p>
                    {
                        loading ?
                            (
                                <Button disabled>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <button
                                    disabled={!userName && !name && !bio && !gender} // example condition
                                    className='bg-blue-500 w-1/2 py-3 text-white rounded-[10px] md:mb-0 mb-10'
                                    onClick={() => handleSubmit({ userName, name, bio, gender, profilePicture })}
                                >

                                    Submit
                                </button>
                            )
                    }
                </div>
            </div>
        </div >
    )
}

export default EditProfilePage