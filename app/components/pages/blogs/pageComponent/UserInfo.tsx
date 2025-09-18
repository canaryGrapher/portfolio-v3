"use client"
import React, {useState, useEffect} from "react"
import Image from "next/image";
import { HashnodeClient } from '@/app/lib/hashnode-client';

const UserInfo: React.FC = () => {
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [bio, setBio] = useState<string>('');
    const [blogUrl, setBlogUrl] = useState<string>('https://blogs.yasharyan.dev');

    useEffect(() => {
        (async () => {
            const res = await HashnodeClient.getUserProfile('yasharyan', 5, null);
            if (res.success && res.data?.user) {
                setProfilePic(res.data.user.profilePicture || null);
                setBio(res.data.user.bio?.text || '');
                const firstUrl = res.data.user.publications?.edges?.[0]?.node?.url;
                if (firstUrl) setBlogUrl(firstUrl);
            }
        })();
    }, []);

    return (
        <div className="flex flex-col justify-items-center w-11/12 md:w-4/12 mx-auto text-center mt-20 pb-20">
            {profilePic ? (
                <Image src={profilePic} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" width={80} height={80} />
            ) : (
                <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto mb-3" />
            )}
            <div className="text-gray-600 whitespace-pre-line">
                <p>{bio}</p>
            </div>
            <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[20px] bg-gray-500 text-white hover:bg-gray-700 mt-4"
            >
                Visit my blog
            </a>
        </div>
    );
};

export default UserInfo;