import React from 'react';
import { ProjectCardProps } from './types';
import Image from 'next/image';

const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    variant,
    span = 1,
    formatDateRange,
    onClick
}) => {
    const isGreen = variant === 'green';

    // Premium styling with transitions and shadows
    const cardClasses = `
        h-full w-full
        relative group overflow-hidden rounded-xl border p-6 flex flex-col justify-between cursor-pointer 
        transition-all duration-300 ease-out hover:-translate-y-1.5
        col-span-1 md:${span === 2 ? 'col-span-2' : 'col-span-1'}
        ${isGreen 
            ? 'bg-gradient-to-br from-green-900 via-green-800 to-emerald-950 border-green-700/40 text-green-100 hover:shadow-2xl hover:shadow-green-900/35' 
            : 'bg-white/90 backdrop-blur-sm border-gray-200/80 text-gray-800 hover:shadow-2xl hover:shadow-gray-300/40 hover:border-gray-300'
        }
    `;

    const dateClasses = `text-xs font-semibold uppercase tracking-wider mb-2 ${isGreen ? 'text-green-300/90' : 'text-gray-500'}`;
    const companyClasses = `text-xs mt-3 flex items-center gap-1.5 ${isGreen ? 'text-gray-300' : 'text-gray-600'}`;
    const titleClasses = `text-2xl font-bold mb-3 tracking-tight ${isGreen ? 'text-white' : 'text-gray-900 group-hover:text-black'}`;
    const descriptionClasses = `text-sm leading-relaxed mb-4 line-clamp-3 ${isGreen ? 'text-green-100/90' : 'text-gray-600'}`;

    const arrowClasses = `w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isGreen ? 'bg-white' : 'bg-black'}`;
    const arrowIconClasses = `w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${isGreen ? 'text-green-800' : 'text-white'}`;

    return (
        <div
            key={`project-${project.name}`}
            className={cardClasses}
            onClick={onClick}
        >
            <div>
                {/* Header Info */}
                <div className="flex items-center justify-between mb-1">
                    <span className={dateClasses}>
                        {formatDateRange(project.startDate, project.endDate)}
                    </span>
                </div>

                {/* Title */}
                <h3 className={titleClasses}>
                    {project.name}
                </h3>

                {/* Description */}
                <p className={descriptionClasses}>
                    {project.description}
                </p>
            </div>

            <div>
                {/* Tech Tags Preview */}
                {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                            <span 
                                key={index} 
                                className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium transition-colors ${
                                    isGreen 
                                        ? 'bg-green-950/65 text-green-200 border border-green-700/50' 
                                        : 'bg-gray-100 text-gray-700 border border-gray-200 group-hover:bg-gray-200/60'
                                }`}
                            >
                                {tech.icon && (
                                    <span className="relative w-3.5 h-3.5 flex-shrink-0">
                                        <Image 
                                            src={tech.icon} 
                                            alt="" 
                                            fill 
                                            sizes="14px"
                                            className="object-contain" 
                                            unoptimized
                                        />
                                    </span>
                                )}
                                {tech.name}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className={`text-[10px] self-center px-2 py-0.5 rounded-full font-semibold ${isGreen ? 'bg-green-700/30 text-green-300' : 'bg-gray-200/50 text-gray-500'}`}>
                                +{project.technologies.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Footer Section */}
                <div className="flex items-center justify-between border-t pt-4 border-dashed border-gray-300/30 mt-2">
                    <div>
                        {project.associatedWith && (
                            <div className={companyClasses}>
                                <span>Associated with:</span> 
                                <span className="font-bold underline decoration-dotted decoration-gray-400">{project.associatedWith}</span>
                            </div>
                        )}
                    </div>
                    
                    <div className={arrowClasses}>
                        <svg className={arrowIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
