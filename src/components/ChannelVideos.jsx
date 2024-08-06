import React, { useState, useEffect, useContext } from 'react';
import { fetchDataFromApi } from '../utils/api';
import { Context } from '../context/contextApi';
import { Link } from 'react-router-dom';
import VideoLength from '../shared/videoLength';
import { abbreviateNumber } from "js-abbreviation-number";

const ChannelVideos = ({ channelId }) => {
  const [videos, setVideos] = useState([]);
  const { setLoading } = useContext(Context);

  useEffect(() => {
    const fetchChannelVideos = async () => {
      setLoading(true);
      try {
        const data = await fetchDataFromApi(`channel/videos/?id=${channelId}&filter=videos_latest`);
        setVideos(data.contents.map(item => item.video));
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelVideos();
  }, [channelId, setLoading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
      {videos.map((video, index) => (
        <Link key={index} to={`/video/${video?.videoId}`}>
          <div className="flex flex-col mb-8 overflow-hidden">
            {video.thumbnails && video.thumbnails.length > 0 && (
              <div className="relative">
                <img
                  className="h-40 sm:h-48 md:h-40 w-full object-cover rounded-lg"
                  src={video.thumbnails[0].url}
                  alt={video.title}
                />
                {video.lengthSeconds && (
                  <VideoLength time={video.lengthSeconds} className="absolute bottom-2 right-2 text-white text-sm bg-black bg-opacity-50 px-1 rounded" />
                )}
              </div>
            )}
            <div className="flex flex-col mt-3">
              <span className="text-sm font-bold line-clamp-2">
                {video.title}
              </span>
              <div className="flex text-[12px] font-semibold text-white/[0.7] mt-2 gap-1">
                <span>{`${abbreviateNumber(video.stats.views, 2)} views`}</span>•
                <p>{video.publishedTimeText}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChannelVideos;
