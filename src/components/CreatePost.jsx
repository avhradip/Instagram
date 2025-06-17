import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Loader2, XIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, getAllPosts, getProfile } from '@/redux/postSlice';
import { IoArrowBackOutline } from "react-icons/io5";
import icon from "../../public/icon.png"

function CreatePost({ open, setOpen }) {
    const dispatch = useDispatch();
    const [preview, setPreview] = useState(null);
    const [next, setNext] = useState(false);
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const { user } = useSelector((state) => state.user);
    const { loading } = useSelector((state) => state.post);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const cancelSelection = () => {
        setPreview(null);
        setFile(null);
        setNext(false);
    };

    const createPostHandler = async (data) => {
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("image", file);

        const res = await dispatch(addPost(formData));
        if (res?.meta?.requestStatus === "fulfilled") {
            dispatch(getAllPosts());
            dispatch(getProfile(user._id));
            setOpen(false);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b-2 pb-2 py-2">
                {preview && (
                    <IoArrowBackOutline
                        size={30}
                        className="cursor-pointer"
                        onClick={cancelSelection}
                    />
                )}
                <p className="text-center w-full font-semibold">Create new post</p>
                <div className="flex items-center gap-2">
                    {preview && !next && (
                        <button onClick={() => setNext(true)}>Next</button>
                    )}
                    {next && (
                        <Button onClick={() => createPostHandler()} variant="ghost">
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Share"}
                        </Button>
                    )}
                    <XIcon className="cursor-pointer" onClick={() => setOpen(false)} />
                </div>
            </div>

            {/* Upload Area */}
            <div className="flex flex-col items-center justify-center gap-4 w-full min-h-[60vh]">
                {!preview && (
                    <div className="relative">
                        <div className="flex flex-col items-center gap-4">
                            <img src={icon} alt="icon" />
                            <button
                                type="button"
                                onClick={() => document.getElementById("fileInput").click()}
                                className="bg-blue-600 text-white px-2 py-1 rounded-sm"
                            >
                                Select from computer
                            </button>
                        </div>

                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                )}

                {/* Preview Section */}
                {preview && (
                    <div className="flex flex-col md:flex-row w-full h-full">
                        <div className={`w-full ${next ? 'md:w-1/2' : 'md:w-full'} h-full`}>
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover shadow-md"
                            />
                        </div>

                        {next && (
                            <div className="w-full md:w-1/2 h-full overflow-y-auto example">
                                <textarea
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className="w-full h-full resize-none p-3 text-base rounded-md shadow "
                                    placeholder="Add a caption..."
                                />
                            </div>
                        )}
                    </div>

                )}
            </div>
        </div>
    );
}

export default CreatePost;
