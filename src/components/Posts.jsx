import React, { useEffect } from 'react'
import Post from './Post'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/redux/postSlice';
import InstagramLoader from './InstagramLoader';

function Posts() {
  const dispatch = useDispatch()
  const { posts, loading } = useSelector((state) => state?.post)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])
  


  return (
    
    <div className='w-full flex flex-col items-center justify-center mx-auto'>
      {posts && posts.length > 0 ? (
          posts?.map((item) => <Post key={item._id} item={item} />)
        ) : (
          
          loading ?
            <InstagramLoader /> :
          <div className="text-center py-10 text-gray-500">
            <p>No posts available.</p>
          </div>
        )}
    </div>
  )
}

export default Posts