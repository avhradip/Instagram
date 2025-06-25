import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getUserFun = createAsyncThunk('/api/v1/user/', async () => {
    try {
        const token = localStorage.getItem('userToken')

        const { data } = await axios.get('https://instagram-backend-bftn.onrender.com/api/v1/user/getuserprofile', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return data
    } catch (error) {
        console.log('user', error)
    }
})

export const registerFun = createAsyncThunk('/api/v1/user/register', async (userInfo) => {
    try {
        await axios.post('https://instagram-backend-bftn.onrender.com/api/v1/user/register', userInfo)
    } catch (error) {
        console.log("registerFun", error);
    }
})

export const loginFun = createAsyncThunk('/api/v1/user/login', async (userInfo) => {
    try {
        const { data } = await axios.post('https://instagram-backend-bftn.onrender.com/api/v1/user/login', userInfo)
        localStorage.setItem('userToken', data?.token)
        return data
    } catch (error) {
        console.log("login", error);
    }
})

export const forgotPassword = createAsyncThunk('/api/v1/user/forgotPassword', async (email) => {
    try {
        const { data } = await axios.post('https://instagram-backend-bftn.onrender.com/api/v1/user/forgotPassword', { email })
        return data
    } catch (error) {
        console.log("forgotPassword", error);
    }
})

export const resetPassword = createAsyncThunk('/api/v1/user/resetPassword', async ({ password, confirmPassword, token }) => {
    try {
        const { data } = await axios.post('https://instagram-backend-bftn.onrender.com/api/v1/user/reset-Password', { password, confirmPassword, token }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.log("forgotPassword", error);
    }
})

export const getSuggestedUsers = createAsyncThunk('/user/getsuggestedusers', async () => {
    try {
        const token = localStorage.getItem("userToken")
        const { data } = await axios.get('https://instagram-backend-bftn.onrender.com/api/v1/user/getsuggestedusers', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return data.SuggestedUsers
    } catch (error) {
        console.log("getSuggestedUsers", error);

    }
})

export const editProfile = createAsyncThunk('/user/editprofile', async (formData) => {
    try {
        const token = localStorage.getItem("userToken")
        const { data } = await axios.patch('https://instagram-backend-bftn.onrender.com/api/v1/user/editprofile', formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        })
        return data
    } catch (error) {
        console.log("editProfile", error.message);
    }
})

export const followOrUnfollow = createAsyncThunk('/user/followorunfollow/:id', async (id) => {
    try {
        const token = localStorage.getItem("userToken")
        await axios.post(`https://instagram-backend-bftn.onrender.com/api/v1/user/followorunfollow/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log("followOrUnfollowFunction", error.message);
    }
})

export const getFollowers = createAsyncThunk('user/followers', async (id) => {
    try {
        const token = localStorage.getItem("userToken")
        const { data } = await axios.get(`https://instagram-backend-bftn.onrender.com/api/v1/user/followers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.followers
    } catch (error) {
        console.log("getFollowersFunction", error.message);
    }
})

export const getFollowing = createAsyncThunk('user/following', async (id) => {
    try {
        const token = localStorage.getItem("userToken")
        const { data } = await axios.get(`https://instagram-backend-bftn.onrender.com/api/v1/user/following/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.following
    } catch (error) {
        console.log("getFollowingFunction", error.message);
    }
})

export const removeFollower = createAsyncThunk('user/removefollowers', async (id) => {
    try {
        const token = localStorage.getItem("userToken")
        await axios.delete(`https://instagram-backend-bftn.onrender.com/api/v1/user/removefollower/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log("getFollowingFunction", error.message);
    }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        suggestedUsers: [],
        loading2: false,
        loading: false,
        buttonloading: false,
        error: false,
        isAuthenticated: false,
        followers: [],
        followings: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerFun.pending, (state) => {
                state.loading = true
            })
            .addCase(registerFun.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(registerFun.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(loginFun.pending, (state) => {
                state.loading = true
                state.error = false
            })

            .addCase(loginFun.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.user = action?.payload?.user
                state.isAuthenticated = action?.payload?.user?._id ? true : false
            })

            .addCase(loginFun.rejected, (state) => {
                state.loading = false
                state.error = true
                state.user = {}
                state.isAuthenticated = false
            })
            .addCase(getUserFun.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserFun.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.isAuthenticated = action?.payload?.user?._id ? true : false
                state.user = action.payload?.user
            })
            .addCase(getUserFun.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(getSuggestedUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getSuggestedUsers.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.suggestedUsers = action?.payload
            })
            .addCase(getSuggestedUsers.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(editProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.user = action.payload
            })
            .addCase(editProfile.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(followOrUnfollow.pending, (state) => {
                state.loading = true
            })
            .addCase(followOrUnfollow.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(followOrUnfollow.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(getFollowers.pending, (state) => {
                state.loading = true
            })
            .addCase(getFollowers.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.followers = action.payload
            })
            .addCase(getFollowers.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(getFollowing.pending, (state) => {
                state.loading = true
            })
            .addCase(getFollowing.fulfilled, (state, action) => {
                state.followings = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(getFollowing.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(removeFollower.pending, (state) => {
                state.buttonloading = true
            })
            .addCase(removeFollower.fulfilled, (state) => {
                state.buttonloading = false
                state.error = false
            })
            .addCase(removeFollower.rejected, (state) => {
                state.buttonloading = false
                state.error = true
            })
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(resetPassword.rejected, (state) => {
                state.loading = false
                state.error = true
            })
    }
})

export default userSlice.reducer