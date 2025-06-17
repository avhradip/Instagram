import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Profile from './pages/Profile'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'
import { getUserFun } from './redux/userSlice'
import Layout from './components/Layout'
import Explore from './pages/Explore'
import Notoifications from './pages/Notoifications'
import { getAllPosts } from './redux/postSlice'
import CommentPage from '../src/pages/CommentPage'
import { getSuggestedUsers } from '@/redux/userSlice'
import People from './pages/people'
import SearchPage from './pages/SearchPage'
import SavedPage from './pages/SavedPage'
import EditProfilePage from './pages/EditProfilePage'
import ErrorBoundary from './components/ErrorBoundary'
import FollowingPage from './pages/FollowingPage'
import FollowersPage from './pages/FollowersPage'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.user)
  console.log(user);

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
