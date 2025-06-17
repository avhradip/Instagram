import CommentDialog from '../components/CommentDialog';
import ExploreNavbar from '../components/ExploreNavbar';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { FaComment } from 'react-icons/fa';
import { TiHeartFullOutline } from "react-icons/ti";
import { setComment } from '@/redux/postSlice';
import InstagramLoader from '../components/InstagramLoader';

function Explore() {
  const { posts, loading } = useSelector((state) => state?.post);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleOpen = (item) => {
    dispatch(setComment({ postDetails: item }));
    setActiveItem(item);
    setOpen(true);
  };

  return (
    <div>
      <div className="fixed top-0 w-full lg:hidden z-20">
        <ExploreNavbar />
      </div>

      {loading ? <InstagramLoader /> :
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-2 md:px-[14%] pt-16">
          {posts.map((item) => (
            <div
              key={item._id}
              className="relative group cursor-pointer"
              onClick={() => handleOpen(item)}
            >
              <img
                src={item.image}
                alt={item.userName}
                className="aspect-square object-cover w-full"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 text-white">
                  <TiHeartFullOutline size={22} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold">{item?.likes?.length}</span>
                </div>
                <div className="flex items-center gap-1 text-white">
                  <FaComment size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold">{item?.comments?.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      }


      {activeItem && (
        <CommentDialog open={open} setOpen={setOpen} item={activeItem} />
      )}
    </div>
  );
}

export default Explore;
