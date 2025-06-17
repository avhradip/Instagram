import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

function ExploreNavbar() {
    const navigate=useNavigate()
    return (
        <div className='border-b-1 md:hidden lg:hidden flex py-2 bg-white'>
            <button onClick={() => navigate(-1)}><IoIosArrowBack size={20} /></button>
            <p className='w-full text-center'>Explore</p>
        </div>
    )
}

export default ExploreNavbar