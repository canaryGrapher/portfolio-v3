import React from 'react';

const ThoughtsHero: React.FC = () => (
    <div className="pt-16 pb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50/80 border border-green-200/50 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-green-800 mb-6">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600" />
            </span>
            Unfiltered
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-5 max-w-4xl leading-[1.1]">
            Thinking out loud,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-700 to-teal-900">
                in public.
            </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed font-semibold">
            Short entries on whatever is on my mind. Politics, culture, half-formed arguments, things
            I changed my mind about. Not engineering writing; that lives on the blogs page.
        </p>

        <p className="text-xs text-gray-500 max-w-3xl mt-4 italic">
            These are personal opinions, written quickly and held loosely. They are mine alone and
            not those of any employer, past or present.
        </p>
    </div>
);

export default ThoughtsHero;
