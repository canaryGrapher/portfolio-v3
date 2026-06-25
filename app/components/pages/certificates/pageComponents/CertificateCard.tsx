import React from 'react';
import Image from 'next/image';
import { CertificateData } from '@/data/pages/certificates/certificateData';

interface CertificateCardProps {
    certificate: CertificateData;
    variant: 'green' | 'white';
}

const CertificateCard: React.FC<CertificateCardProps> = ({
    certificate,
    variant
}) => {
    const isGreen = variant === 'green';
    const redirectUrl = certificate.link || certificate.image;
    const hasLink = !!redirectUrl;

    const cardClasses = `
        h-full w-full min-h-[240px]
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

    const categoryClasses = `inline-flex items-center text-[10px] px-2.5 py-0.5 rounded-full font-bold transition-colors ${isGreen
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
                        Issued {certificate.issuedDate}
                    </span>
                    <span className={categoryClasses}>
                        {certificate.category}
                    </span>
                </div>

                {/* Content Section (Title & Org Image) */}
                <div className="flex gap-5 items-start flex-grow flex-col">
                    {/* Title and Provider name */}
                    <div className="flex-1">
                        <h3 className={titleClasses}>
                            {certificate.name}
                        </h3>

                        {/* Provided by details */}
                        <div className="flex items-center gap-2 mt-2">
                            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-300/20 bg-white flex-shrink-0">
                                <Image
                                    src={certificate.providers.icon}
                                    alt={certificate.providers.name}
                                    fill
                                    sizes="24px"
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                            <span className={`text-[11px] font-semibold ${isGreen ? 'text-gray-300' : 'text-gray-600'}`}>
                                Via <span className="underline decoration-dotted decoration-gray-400 font-bold">{certificate.providers.name}</span>
                            </span>
                        </div>

                        {/* Certificate Description / Body */}
                        {certificate.body && (
                            <p className={`text-xs leading-relaxed mt-3.5 line-clamp-3 ${isGreen ? 'text-green-100/85' : 'text-gray-600 font-medium'}`}>
                                {certificate.body}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="flex items-center justify-between border-t pt-4 border-dashed border-gray-300/30 mt-4 w-full">
                <span className={`text-xs font-semibold tracking-wide ${isGreen ? 'text-green-300/90' : 'text-green-900'}`}>
                    Verify Certificate
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

export default CertificateCard;
