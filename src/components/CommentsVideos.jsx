import React, { useState, useEffect } from 'react';
import { fetchDataFromApi } from '../utils/api';
import CommentVideo from './CommentVideos';

const CommentsVideos = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    fetchDataFromApi(`video/comments/?id=${videoId}`).then((res) => {
      setComments(res?.comments || []);
      setTotalComments(res?.totalCommentsCount || 0);
    });
  }, [videoId]);

  return (
    <div className="mt-6">
      <h2 className="text-white text-xl mb-4">Comments ({totalComments})</h2>
      {comments.map((comment, index) => (
        <CommentVideo key={index} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsVideos;
