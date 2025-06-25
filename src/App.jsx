import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Profile from '../src/pages/Profile';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import ErrorPage from '../src/pages/ErrorPage';
import { getUserFun, getSuggestedUsers } from '../src/redux/userSlice';
import Layout from '../src/components/Layout';
import Explore from '../src/pages/Explore';
import Notifications from '../src/pages/Notifications'; // Fixed typo here
import { getAllPosts } from '../src/redux/postSlice';
import CommentPage from '../src/pages/CommentPage';
import People from '../src/pages/People';
import SearchPage from '../src/pages/SearchPage';
import SavedPage from '../src/pages/SavedPage';
import EditProfilePage from '../src/pages/EditProfilePage';
import ErrorBoundary from '../src/components/ErrorBoundary';
import FollowingPage from '../src/pages/FollowingPage';
import FollowersPage from '../src/pages/FollowersPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserFun());
    dispatch(getSuggestedUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllPosts());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {isAuthenticated ? (
            <Route path="*" element={<Layout><PrivateRoutes /></Layout>} />
          ) : (
            <Route path="*" element={<PublicRoutes />} />
          )}
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

function PrivateRoutes() {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/editprofile" element={<EditProfilePage />} />
      <Route path="/saved" element={<SavedPage />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/commentpage/:id" element={<CommentPage />} />
      <Route path="/people" element={<People />} />
      <Route path="/following/:id" element={<FollowingPage />} />
      <Route path="/followers/:id" element={<FollowersPage />} />
      <Route path="*" element={<ErrorPage />} />
    </>
  );
}

function PublicRoutes() {
  return (
    <>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="*" element={<ErrorPage />} />
    </>
  );
}
