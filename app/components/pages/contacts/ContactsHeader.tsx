import React from 'react'
import { LogoGreen } from '@/assets/vectors'
import Image from 'next/image'

const ContactsHeader = () => {
    return (
        <div className="mx-auto flex flex-col items-center md:items-start text-center md:text-left">
            {/* Live Chip Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50/80 border border-green-200/50 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-green-800 mb-6">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                </span>
                user.contact()
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className='flex flex-col justify-center bg-green-50 border border-green-200/50 p-3.5 rounded-2xl shadow-inner w-16 h-16 items-center justify-center'>
                    <Image src={LogoGreen} alt="Logo" className='w-8 h-8' />
                </div>
                <div className="flex flex-col justify-start">
                    <h1 className='text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-gray-900 leading-none'>
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-705 to-teal-900">Touch.</span>
                    </h1>
                    <p className='text-xs sm:text-sm text-gray-500 font-extrabold uppercase tracking-widest mt-2.5'>
                        Invisible threads are the strongest ties.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ContactsHeader