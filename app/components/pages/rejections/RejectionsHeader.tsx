import React from 'react'
import { LogoBlue } from '@/assets/vectors'
import Image from 'next/image'

const RejectionsHeader = () => {
    return (
        <div className="flex flex-col items-center gap-2 text-center mx-auto">
            <div className="flex flex-row items-center gap-2">
                <Image src={LogoBlue} alt="Logo" />
                <h1 className='text-7xl font-bold capitalize text-[#033EDF]'>Job Rejections</h1>
            </div>
            <div className="md:w-4/12 w-3/4">
                <p className='text-base text-[#4A6BC5]'>Every rejection is a redirection. Here&apos;s my collection of &quot;thanks, but no thanks&quot; moments.</p>
            </div>
        </div>
    )
}

export default RejectionsHeader

