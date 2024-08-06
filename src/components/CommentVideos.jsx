import React from 'react';
import { AiOutlineLike } from 'react-icons/ai';

const CommentVideo = ({ comment }) => {
  return (
    <div className="flex items-start space-x-5 py-4 border-b border-gray-700">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src={comment?.author?.avatar[0]?.url}
          alt={comment?.author?.title}
        />
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-white font-semibold text-xs md:text-base">
            {comment?.author?.title}
          </span>
          <span className="text-gray-400 text-xs md:text-sm">
            {comment?.publishedTimeText}
          </span>
        </div>
        <p className="text-white mt-1 text-xs md:text-base">
          {comment?.content}
        </p>
        <div className="flex items-center space-x-3 mt-2">
          <div className="flex items-center space-x-1 text-gray-400 text-xs md:text-base">
            <AiOutlineLike />
            <span>{comment?.stats?.votes}</span>
          </div>
          {comment?.stats?.replies > 0 && (
            <div className="text-gray-400 text-xs md:text-base">
              {comment?.stats?.replies} replies
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentVideo;
