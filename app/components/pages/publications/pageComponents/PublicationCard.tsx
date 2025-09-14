import React from 'react';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';


const PublicationCard = ({ publication }) => {
    return (
        <div className="border-2 border-gray-300 rounded-md p-4 text-black">
            <h1 className="text-2xl font-bold">{publication.title}</h1>
            <p className="mb-1">Along with {publication.authors.join(", ")}</p>
            <p className="text-gray-500 text-xs">{publication.dop}</p>
            <p className="text-gray-500 my-2">{publication.description}</p>
            <div className="flex items-center gap-2">
                <Image src={publication.journal.image} alt={publication.journal.name} width={24} height={24} className="w-6 h-6 rounded-full" />
                <p className="text-gray-500 text-xs">{publication.journal.name}</p>
            </div>
            <div className="flex flex-row mt-5">
                <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 text-xs font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 py-2 border-2 border-gray-300"
                >
                    View credentials
                    <FaExternalLinkAlt className="w-4 h-4 ml-2" />
                </a>
            </div>

            {/* <p className="text-gray-500">{publication.dop}</p>
            <p className="text-gray-500">{publication.description}</p>
            <p className="text-gray-500">{publication.journal}</p>
            <a href={publication.link} className="text-blue-500">View Publication</a> */}
        </div>
    )
}

export default PublicationCard;