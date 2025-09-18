import React from 'react'
import { LogoBlue } from '@/assets/vectors'
import Image from 'next/image'

const UpdateHeader = () => {
    return (
        <div className="flex flex-col items-center gap-2 text-center mx-auto">
            <div className="flex flex-row items-center gap-2">
                <Image src={LogoBlue} alt="Logo" />
                <h1 className='text-7xl font-bold capitalize text-[#033EDF]'>Updates</h1>
            </div>
            <div className="md:w-4/12 w-3/4">
                <p className='text-base text-[#4A6BC5]'>Every strike brings me closer to the next home run.</p>
            </div>
        </div>
    )
}

export default UpdateHeader