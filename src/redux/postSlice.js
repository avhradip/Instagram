import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const addPost = createAsyncThunk('post/addPost', async (postDetails) => {
    try {
        const token = localStorage.getItem("userToken");
        const res = await axios.post('https://instagram-backend-bftn.onrender.com/api/v1/post/addpost', postDetails, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        });
        return res.data;
    } catch (error) {
        console.log('addPost', error);
        throw error;
    }
})

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
    try {
        const token = localStorage.getItem("userToken");
        const res = await axios.get('https://instagram-backend-bftn.onrender.com/api/v1/post/all', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res?.data?.posts;
    } catch (error) {
        console.log('getAllPosts', error)
    }
})

export const getUserPosts = createAsyncThunk('post/getUserPost', async (id) => {
    try {
        const token = localStorage.getItem("userToken")
        const { data } = await axios.get(`https://instagram-backend-bftn.onrender.com/api/v1/post/all/post/user/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return data.post
    } catch (error) {
        console.log('getAllPosts', error)
    }
})

export const handleDeletePost = createAsyncThunk('post/deletepost', async (postId) => {
    try {
        const token = localStorage.getItem("userToken");
        await axios.delete(`https://instagram-backend-bftn.onrender.com/api/v1/post/deletepost/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Delete post error:", error);
    }
})

export const handleLikeDislikepost = createAsyncThunk('post/likepostdislikepost',async (id) => {
        try {
            const token = localStorage.getItem("userToken");
            await axios.post(`https://instagram-backend-bftn.onrender.com/api/v1/post/likepostdislikepost/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.error("handleLikeDislikepost post error:", error);
        }
    }
);

export const handlecomment = createAsyncThunk('post/addcomment', async ({ id, text }, thunkAPI) => {
    try {
        const token = localStorage.getItem("userToken");
        await axios.post(`https://instagram-backend-bftn.onrender.com/api/v1/post/addcomment/${id}`, { text }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
    } catch (error) {
        console.log("handlecomment", error.message);
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
}
);

export const getComments = createAsyncThunk("/getcommentsofapost/:id", async (id) => {
    try {
        const token = localStorage.getItem("userToken")
        const { data } = await axios.get(`https://instagram-backend-bftn.onrender.com/api/v1/post/getcommentsofapost/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return data.comment
    } catch (error) {
        console.log("handlecomment", error.message);
    }
})

export const getProfile = createAsyncThunk('user/getProfile', async (id) => {
    try {
        const token = localStorage.getItem("userToken");

        const response = await axios.get(`https://instagram-backend-bftn.onrender.com/api/v1/user/getprofile/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.user;
    } catch (error) {
        return console.log(error.response?.data || error.message)
    }
})

export const deleteComment = createAsyncThunk('user/comment', async (id) => {
    try {
        const token = localStorage.getItem("userToken")
        await axios.delete(`https://instagram-backend-bftn.onrender.com/api/v1/post/deletecomment/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    } catch (error) {
        console.error("Delete post error:", error);
    }
})

export const editComment = createAsyncThunk('post/editcomment', async ({ id, text }, thunkAPI) => {
    try {
        const token = localStorage.getItem("userToken");
        await axios.patch(`https://instagram-backend-bftn.onrender.com/api/v1/post/editcomment/${id}`, { text }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
    } catch (error) {
        console.log("handlecomment", error.message);
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
}
);

export const addToBookMark = createAsyncThunk('post/addoobookmark', async (id) => {
    try {
        const token = localStorage.getItem("userToken")
        await axios.post(`https://instagram-backend-bftn.onrender.com/api/v1/post/addoobookmark/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

    } catch (error) {
        alert('error')
        console.log("addToBookMark", error.message);
    }
})

export const getBookMarkedPosts = createAsyncThunk('post/getuserbookmarks', async () => {
    try {
        const token = localStorage.getItem("userToken")
        const { data } = await axios.get('https://instagram-backend-bftn.onrender.com/api/v1/post/getuserbookmarks', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.bookmarksPosts
    } catch (error) {
        console.log("getBookMarkedPosts", error);
    }
})



const postSlice = createSlice({
    name: "post",
    initialState: {
        loading: false,
        error: false,
        posts: [],
        userPosts: [],
        comments: [],
        profile: null,
        selectedComment: {},
        recentSearch: null,
        bookMarks: null,
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload
        },
        setComment: (state, action) => {
            state.selectedComment = action.payload
        },
        setRecentSearch: (state, action) => {
            state.recentSearch = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPost.pending, (state) => {
                state.loading = true
            })
            .addCase(addPost.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(addPost.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.posts = action.payload;
            })
            .addCase(getAllPosts.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(handleDeletePost.pending, (state) => {
                state.loading = true
            })
            .addCase(handleDeletePost.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(handleDeletePost.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(handleLikeDislikepost.pending, (state) => {
                state.loading = true
            })
            .addCase(handleLikeDislikepost.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(handleLikeDislikepost.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(getUserPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.userPosts = action?.payload
                state.loading = false
                state.error = false
            })
            .addCase(getUserPosts.rejected, (state) => {
                state.userPosts = []
                state.loading = false
                state.error = false
            })
            .addCase(getComments.pending, (state) => {
                state.loading = true
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.comments = action?.payload
                state.loading = false
                state.error = false
            })
            .addCase(getComments.rejected, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(getProfile.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false
                state.profile = action.payload
                state.error = false
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteComment.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(deleteComment.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload;
            })
            .addCase(addToBookMark.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(addToBookMark.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(addToBookMark.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload;
            })
            .addCase(getBookMarkedPosts.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getBookMarkedPosts.fulfilled, (state, action) => {
                state.loading = false
                state.bookMarks = action.payload
                state.error = false
            })
            .addCase(getBookMarkedPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(editComment.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(editComment.fulfilled, (state, action) => {
                state.loading = false
                state.bookMarks = action.payload
                state.error = false
            })
            .addCase(editComment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { setProfile, setComment, setRecentSearch } = postSlice.actions;
export default postSlice.reducer;
