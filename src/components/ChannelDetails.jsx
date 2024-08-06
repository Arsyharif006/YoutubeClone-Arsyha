import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../utils/api';
import { Context } from '../context/contextApi';
import { abbreviateNumber } from 'js-abbreviation-number';
import ChannelVideos from './ChannelVideos';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import LeftNav from './LeftNav';

const ChannelDetails = () => {
    const [channel, setChannel] = useState(null);
    const { channelId } = useParams();
    const { setLoading } = useContext(Context);

    useEffect(() => {
        const getChannelDetails = async () => {
            setLoading(true);
            try {
                const data = await fetchDataFromApi(`channel/details/?id=${channelId}`);
                setChannel(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getChannelDetails();
    }, [channelId, setLoading]);

    if (!channel) return null;

    const avatarUrl = channel.avatar.length > 0 ? channel.avatar[channel.avatar.length - 1].url : '';
    const bannerUrl = channel.banner && channel.banner.desktop.length > 0 ? channel.banner.desktop[channel.banner.desktop.length - 1].url : '';
    const links = channel.links || [];

    return (
        <div className="flex flex-row h-[calc(100%-56px)]">
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black text-white md:w-full">
                <div className='flex flex-col items-center mt-4'>
                    <div className="w-full max-w-5xl mt-5">
                        {bannerUrl && (
                            <img
                                className="w-full h-52 object-cover"
                                src={bannerUrl}
                                alt={`${channel.title} banner`}
                            />
                        )}
                    </div>
                    <div className="flex flex-col items-center mt-7 px-4">
                        {avatarUrl && (
                            <img
                                className="h-24 w-24 rounded-full object-cover border-4 border-white"
                                src={avatarUrl}
                                alt={`${channel.title} avatar`}
                            />
                        )}
                        <div className="flex items-center mt-4">
                            <h1 className="text-3xl font-bold">{channel.title}</h1>
                            {channel.badges && channel.badges.some(badge => badge.type === 'VERIFIED_CHANNEL') && (
                                <BsFillCheckCircleFill className="text-blue-500 text-[20px] ml-2" />
                            )}
                        </div>
                        <p className="mt-4 text-center max-w-2xl">{channel.description}</p>
                        <div className="mt-4 text-sm">
                            <span>{channel.stats.subscribersText}</span> • <span>{abbreviateNumber(channel.stats.views, 2)} views</span>  
                        </div>
                        <div className="flex flex-wrap justify-center mt-4">
                            {links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.targetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline mx-2"
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='mt-10 p-5 text-2xl font-semibold'>
                    <h2>For you</h2>
                </div>
                <ChannelVideos channelId={channelId} />
            </div>
        </div>
    );
};

export default ChannelDetails;
