import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
            <h1 className="text-6xl font-bold text-blue-600">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-gray-600 mt-2 max-w-md">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Button className="px-6 py-2" onClick={() => navigate('/')}>Go Home</Button>
        </div>
    )
}

export default ErrorPage
