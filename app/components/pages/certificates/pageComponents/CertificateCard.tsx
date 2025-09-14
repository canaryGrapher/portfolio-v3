import React from 'react';
import Image from 'next/image';
import { FaExternalLinkAlt } from "react-icons/fa";
import { CertificateData } from '@/data/pages/certificates/certificateData';

interface CertificateCardProps {
    certificate: CertificateData;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
    return (
        <div className="bg-white flex flex-col justify-center">
            <div className="flex flex-col md:flex-row p-2 items-center">
                {/* Certificate Image */}
                <div className="flex justify-center items-center w-full md:w-1/4">
                    <Image
                        src={certificate.image}
                        alt={certificate.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Certificate Details */}
                <div className="p-4 flex flex-col justify-between w-full">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                            {certificate.name}
                        </h3>
                        <div className="flex flex-row justify-between">
                            <div>
                                <p className="text-xs text-gray-600">
                                    Issued on {certificate.issuedDate}
                                </p>
                                <div className="flex flex-row-reverse items-center text-xs text-gray-600 mt-2">
                                    <span>Provided by <span className="underline">{certificate.providers.name}</span></span>
                                    <div className="w-8 h-8 bg-gray-400 rounded-full mr-2">
                                        <Image
                                            src={certificate.providers.icon}
                                            alt={certificate.providers.name}
                                            className="w-full h-full object-fill rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* View Credentials Button */}
                            {certificate.link && (
                                <div className="flex flex-row justify-end">
                                    <a
                                        href={certificate.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
                                    >
                                        View credentials
                                        <FaExternalLinkAlt className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateCard;
