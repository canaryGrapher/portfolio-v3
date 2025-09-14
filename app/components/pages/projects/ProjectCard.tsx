import React from 'react';
import { ProjectCardProps } from './types';

const ProjectCard: React.FC<ProjectCardProps> = ({ 
    project, 
    variant, 
    span = 1, 
    formatDateRange, 
    onClick 
}) => {
    const isGreen = variant === 'green';
    
    const cardClasses = `
        ${isGreen ? 'bg-green-800 hover:bg-green-700' : 'bg-white hover:bg-gray-100'} 
        p-6 flex flex-col justify-between cursor-pointer transition-colors duration-200
        col-span-1 md:${span === 2 ? 'col-span-2' : 'col-span-1'}
    `;
    
    const dateClasses = `text-sm mb-2 ${isGreen ? 'text-green-200' : 'text-gray-600'}`;
    const companyClasses = `text-sm mb-2 ${isGreen ? 'text-gray-300' : 'text-gray-600'}`;
    const titleClasses = `text-xl font-bold mb-3 ${isGreen ? 'text-white' : 'text-black'}`;
    const descriptionClasses = `text-sm leading-relaxed block ${isGreen ? 'text-green-100' : 'text-gray-700'}`;
    
    const arrowClasses = `w-8 h-8 rounded-full flex items-center justify-center ${isGreen ? 'bg-white' : 'bg-black'}`;
    const arrowIconClasses = `w-4 h-4 ${isGreen ? 'text-green-800' : 'text-white'}`;

    return (
        <div
            key={`project-${project.id}`}
            className={cardClasses}
            onClick={onClick}
        >
            <div>
                {project.associatedWith && (
                    <div className={companyClasses}>
                        {project.associatedWith}
                    </div>
                )}
                <div className={dateClasses}>
                    {formatDateRange(project.startDate, project.endDate)}
                </div>
                <h3 className={titleClasses}>
                    {project.name}
                </h3>
                <p className={descriptionClasses}>
                    {project.description}
                </p>
            </div>
            <div className="flex justify-end mt-4">
                <div className={arrowClasses}>
                    <svg className={arrowIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
