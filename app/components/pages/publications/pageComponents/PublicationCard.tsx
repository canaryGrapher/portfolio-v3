import React from 'react';
import Image from 'next/image';
import type { PublicationList } from '@/data/pages/publications/publicationList';

interface PublicationCardProps {
    publication: PublicationList;
    variant: 'green' | 'white';
}

const PublicationCard: React.FC<PublicationCardProps> = ({
    publication,
    variant
}) => {
    const isGreen = variant === 'green';
    const redirectUrl = publication.link || publication.journal.image;
    const hasLink = !!redirectUrl;

    const cardClasses = `
        h-full w-full min-h-[260px]
        relative group overflow-hidden rounded-xl border p-6 flex flex-col justify-between
        transition-all duration-300 ease-out hover:-translate-y-1.5
        ${hasLink ? 'cursor-pointer' : ''}
        ${isGreen
            ? 'bg-gradient-to-br from-green-900 via-green-800 to-emerald-950 border-green-700/40 text-green-100 hover:shadow-2xl hover:shadow-green-900/35'
            : 'bg-white/90 backdrop-blur-sm border-gray-200/80 text-gray-800 hover:shadow-2xl hover:shadow-gray-300/40 hover:border-gray-300'
        }
    `;

    const dateClasses = `text-[10px] font-extrabold uppercase tracking-wider ${isGreen ? 'text-green-300/90' : 'text-gray-500'}`;
    const titleClasses = `text-lg font-bold mb-3 tracking-tight leading-snug line-clamp-2 ${isGreen ? 'text-white' : 'text-gray-900 group-hover:text-black'}`;
    
    const publisherBadgeClasses = `inline-flex items-center text-[10px] px-2.5 py-0.5 rounded-full font-bold transition-colors ${
        isGreen 
            ? 'bg-green-950/65 text-green-200 border border-green-700/50' 
            : 'bg-gray-100 text-gray-700 border border-gray-200 group-hover:bg-gray-200/60'
    }`;

    const arrowClasses = `w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isGreen ? 'bg-white' : 'bg-black'}`;
    const arrowIconClasses = `w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${isGreen ? 'text-green-800' : 'text-white'}`;

    const handleCardClick = () => {
        if (redirectUrl) {
            window.open(redirectUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className={cardClasses} onClick={handleCardClick}>
            <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-4 mb-4 w-full">
                    <span className={dateClasses}>
                        {publication.dop}
                    </span>
                    {publication.journal.publicationsParent && (
                        <span className={publisherBadgeClasses}>
                            {publication.journal.publicationsParent}
                        </span>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex gap-5 items-start flex-grow flex-col">
                    <div className="flex-1 w-full">
                        <h3 className={titleClasses}>
                            {publication.title}
                        </h3>

                        {/* Authors info */}
                        {publication.authors && publication.authors.length > 0 && (
                            <p className={`text-xs font-semibold mb-2 ${isGreen ? 'text-green-300/80' : 'text-gray-500'}`}>
                                With {publication.authors.join(", ")}
                            </p>
                        )}
                        
                        {/* Description / Abstract */}
                        {publication.description && (
                            <p className={`text-xs leading-relaxed line-clamp-3 mb-4 ${isGreen ? 'text-green-100/85' : 'text-gray-600 font-medium'}`}>
                                {publication.description}
                            </p>
                        )}

                        {/* Journal / Conference info */}
                        <div className="flex items-center gap-2 mt-2">
                            {publication.journal.image && (
                                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-300/20 bg-white flex-shrink-0">
                                    <Image
                                        src={publication.journal.image}
                                        alt={publication.journal.name}
                                        fill
                                        sizes="24px"
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                            )}
                            <span className={`text-[11px] font-semibold line-clamp-2 ${isGreen ? 'text-gray-300' : 'text-gray-600'}`}>
                                Published in: <span className="underline decoration-dotted decoration-gray-400 font-bold">{publication.journal.name}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="flex items-center justify-between border-t pt-4 border-dashed border-gray-300/30 mt-4 w-full">
                <span className={`text-xs font-semibold tracking-wide ${isGreen ? 'text-green-300/90' : 'text-green-900'}`}>
                    View Publication
                </span>
                <div className={arrowClasses}>
                    <svg className={arrowIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default PublicationCard;