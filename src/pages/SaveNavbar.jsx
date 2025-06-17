import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

function SaveNavbar() {
    const navigate=useNavigate()
    return (
        <div className='md:hidden flex items-center bg-white border-b-2'>
            <button onClick={() => navigate(-1)}><IoIosArrowBack size={30} className='text-gray-500' /></button>
            <p className='w-full font-medium text-gray-500 text-sm'>Saved</p>
        </div>
    )
}

export default SaveNavbar