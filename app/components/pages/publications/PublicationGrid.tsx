import React from 'react';
import type { PublicationList } from '@/data/pages/publications/publicationList';
import PublicationCard from './pageComponents/PublicationCard';

interface PublicationGridProps {
    publications: PublicationList[];
}

const PublicationGrid: React.FC<PublicationGridProps> = ({ publications }) => {
    return (
        <div>
            {publications.map((publication) => (
                <PublicationCard
                    key={publication.title}
                    publication={publication}
                />
            ))}
        </div>
    )
};

export default PublicationGrid;
