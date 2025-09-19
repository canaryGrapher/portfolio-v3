import React from 'react'
import { LogoBlue } from '@/assets/vectors'
import Image from 'next/image'

const ContactsHeader = () => {
    return (
        <div className="mx-auto">
            <div className="flex flex-row gap-2">
                <div className='flex flex-col justify-center'>
                    <Image src={LogoBlue} alt="Logo" className='top-0' />
                </div>
                <div className="flex flex-col justify-start">
                    <h1 className='text-7xl font-bold capitalize text-[#033EDF]'>CONTACT</h1>
                    <p className='text-base text-[#4A6BC5]'>Invisible threads are the strongest ties.</p>
                </div>
            </div>
        </div>
    )
}

export default ContactsHeader