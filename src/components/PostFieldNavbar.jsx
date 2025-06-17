import React from 'react'
import { Link } from 'react-router-dom'

function PostFieldNavbar() {
    return (
        <div>
            <nav className='w-full flex justify-around py-2 border-b border-gray-300'> {/* Added some basic styling for better visibility */}
                <Link
                    to="/profile/posts"
                    className="text-gray-700 hover:text-blue-500 font-medium px-4 py-2 rounded-md transition duration-200 ease-in-out" // Added styling for links
                >
                    POSTS
                </Link>
                <Link
                    to="/profile/saved"
                    className="text-gray-700 hover:text-blue-500 font-medium px-4 py-2 rounded-md transition duration-200 ease-in-out" // Added styling for links
                >
                    SAVED
                </Link>
                <Link
                    to="/profile/tagged"
                    className="text-gray-700 hover:text-blue-500 font-medium px-4 py-2 rounded-md transition duration-200 ease-in-out" // Added styling for links
                >
                    TAGGED
                </Link>
            </nav>
        </div>
    )
}

export default PostFieldNavbar