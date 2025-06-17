import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

function FollowersNavbar() {
    const navigate = useNavigate()
    return (
        <div className='border-b-1 flex py-2 bg-white'>
            <button onClick={() => navigate(-1)}><IoIosArrowBack size={20} /></button>
            <p className='w-full text-center'>Followers</p>
        </div>
    )
}

export default FollowersNavbar