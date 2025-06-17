import Homenavbar from '../components/Homenavbar'
import Posts from '../components/Posts'
import RightSidebar from '../components/RightSidebar'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const { user } = useSelector((state) => state.user)
  // console.log(user);

  return (
    <div className=''>
      <div className="fixed top-0 w-full lg:hidden">
        <Homenavbar />
      </div>
      <div className='py-[3%] flex justify-between gap-1.5'>
        <Posts />
        <RightSidebar user={user}/>
      </div>
    </div>
  )
}

export default Home