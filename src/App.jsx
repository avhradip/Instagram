import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Profile from '../src/pages/Profile'
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import ErrorPage from '../src/pages/ErrorPage'
import { getUserFun } from '../src/redux/userSlice'
import Layout from '../src/components/Layout'
import Explore from '../src/pages/Explore'
import Notoifications from '../src/pages/Notoifications'
import { getAllPosts } from '../src/redux/postSlice'
import CommentPage from '../src/pages/CommentPage'
import { getSuggestedUsers } from '@/redux/userSlice'
import People from '../src/pages/People'
import SearchPage from '../src/pages/SearchPage'
import SavedPage from '../src/pages/SavedPage'
import EditProfilePage from '../src/pages/EditProfilePage'
import ErrorBoundary from '../src/components/ErrorBoundary'
import FollowingPage from '../src/pages/FollowingPage'
import FollowersPage from '../src/pages/FollowersPage'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getUserFun())
    dispatch(getSuggestedUsers())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllPosts())
    }
  }, [dispatch, isAuthenticated])


  return (
    <BrowserRouter>
      <ErrorBoundary>
        {
          isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />
        }
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App

function PrivateRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/notoifications" element={<Notoifications />} />
        <Route path="/commentpage/:id" element={<CommentPage />} />
        <Route path="/people" element={<People />} />
        <Route path="/following/:id" element={<FollowingPage />} />
        <Route path="/followers/:id" element={<FollowersPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Layout>
  )
}

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
