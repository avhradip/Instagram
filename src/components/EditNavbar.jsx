import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function EditNavbar() {
    const navigate = useNavigate();
    return (
        <div className="fixed top-0 left-0 w-full border-b md:hidden flex items-center py-2 px-4 bg-white z-50 shadow-sm">
            <button onClick={() => navigate(-1)}>
                <IoIosArrowBack size={20} />
            </button>
            <p className="w-full text-center font-medium">Edit Profile</p>
        </div>
    )
}

export default EditNavbar