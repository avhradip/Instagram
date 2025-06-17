import InstagramLoader from '@/components/InstagramLoader';
import SearchNavbar from '@/components/SearchNavbar';
import { setRecentSearch } from '@/redux/postSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [querie, setQuerie] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { suggestedUsers } = useSelector((state) => state.user);
    const { recentSearch } = useSelector((state) => state.post);

    useEffect(() => {
        if (querie.trim().length > 0) {
            setLoading(true);
            const timeout = setTimeout(() => {
                const filtered = suggestedUsers.filter(user =>
                    user.userName.toLowerCase().includes(querie.toLowerCase())
                );
                setResults(filtered);
                setLoading(false);
            }, 1000);

            return () => clearTimeout(timeout);
        } else {
            setResults([]);
            setLoading(false);
        }
    }, [querie]);

    return (
        <div className='w-full flex justify-center'>
            <div className="fixed top-0 w-full lg:hidden z-20">
                <SearchNavbar />
            </div>

            <div className='md:w-150 w-full mx-2 h-screen'>
                <button className='sticky top-10 md:block hidden' onClick={() => navigate(-1)}><IoIosArrowBack size={20} /></button>
                <div className='flex items-center gap-0.5 bg-gray-100 px-2 py-2 rounded-lg text-gray-400 sticky md:top-17 mt-1 top-10'>
                    <IoSearchOutline />
                    <input
                        type="text"
                        value={querie}
                        onChange={(e) => setQuerie(e.target.value)}
                        placeholder='Search by username'
                        className='bg-transparent border-0 outline-0 w-full placeholder-gray-400'
                    />
                    {querie.length > 0 && (
                        loading
                            ? <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            : <RxCross2 className="cursor-pointer bg-gray-300 text-white w-4.5 h-4 rounded-full" onClick={() => setQuerie("")} />
                    )}
                </div>

                <div className='px-2 space-y-1 mt-7'>
                    {loading && <InstagramLoader />}
                    {recentSearch === null ?
                        (!loading && !results && !recentSearch && <p className="text-gray-500 h-fit w-full flex items-center justify-center"> No recent searches.</p>)
                        :
                        (
                            querie===""?
                            <div className="flex items-center justify-between cursor-pointer">
                                <div className='flex items-center gap-1' onClick={() => {
                                    dispatch(setRecentSearch(recentSearch))
                                    navigate(`/profile/${recentSearch._id}`)
                                }}>
                                    <Avatar>
                                        <AvatarImage className='w-11 h-11 rounded-full' src={recentSearch?.profilePicture} />
                                        <AvatarFallback className='bg-gray-400 w-10 h-10 p-2 rounded-full'>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">{recentSearch?.userName}</p>
                                        <p className="font-light text-[13px] text-gray-500">{recentSearch?.name} <span>{(recentSearch?.followers)?.length}followers</span></p>
                                    </div>
                                </div>
                                <div>
                                    <RxCross2 onClick={() => dispatch(setRecentSearch(null))} />
                                </div>
                            </div>:""
                        )
                    }

                    {!loading && querie && results.length === 0 && (
                        <p className="text-gray-500 h-fit w-full flex items-center justify-center">No results found.</p>
                    )}

                    {
                        !loading && results.map((user, idx) => (
                            <div key={idx} className=" ">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
                                    dispatch(setRecentSearch(user))
                                    navigate(`/profile/${user._id}`)
                                }}>
                                    <Avatar>
                                        <AvatarImage className='w-11 h-11 rounded-full' src={user.profilePicture} />
                                        <AvatarFallback className='bg-gray-400 w-10 h-10 p-2 rounded-full'>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">{user.userName}</p>
                                        <p className="font-light text-[13px] text-gray-500">{user.name} <span>{(user.followers).length} followers</span></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div >
    );
}

export default SearchPage;
