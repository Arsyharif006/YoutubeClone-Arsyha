import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";
import CommentsVideos from "./CommentsVideos";

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      console.log(res);
      setVideo(res);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      console.log(res);
      setRelatedVideos(res);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center h-[calc(100%-56px)] bg-black">
      <div className="w-full lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
        <div className="w-full h-[25vh] md:h-[70vh]" >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            width="100%"
            height="100%"
            style={{ backgroundColor: "#000000" }}
            playing={true}
          />
        </div>
        <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
          {video?.title}
        </div>
        <div className="flex justify-between flex-col md:flex-row mt-4">
          <div className="flex">
            <div className="flex items-start">
              <div className="flex h-11 w-11 rounded-full overflow-hidden">
                <Link to={`/channel/${video?.author?.channelId}`}>
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                    alt={video?.author?.title}
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col ml-3">
              <div className="text-white text-md font-semibold flex items-center">
                {video?.author?.title}
                {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                )}
              </div>
              <div className="text-white/[0.7] text-sm">
                {video?.author?.stats?.subscribersText} Subscribers
              </div>
            </div>
          </div>
          <div className="flex text-white mt-4 md:mt-0">
            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
              <AiOutlineLike className="text-xl text-white mr-2" />
              {`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}
            </div>
            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
              {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
            </div>
          </div>
        </div>
        <CommentsVideos videoId={id} />
        <div className="lg:hidden flex flex-col py-6 px-4">
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return (
              <SuggestionVideoCard key={index} video={item?.video} />
            );
          })}
        </div>
      </div>
      <div className="hidden lg:flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
        {relatedVideos?.contents?.map((item, index) => {
          if (item?.type !== "video") return false;
          return (
            <SuggestionVideoCard key={index} video={item?.video} />
          );
        })}
      </div>
    </div>
  );
};

export default VideoDetails;
