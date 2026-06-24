import React from 'react';
import Image from 'next/image';
import { ProjectModalProps } from './types';

const ProjectModal: React.FC<ProjectModalProps> = ({ project, formatDateRange, onClose }) => {
    // Filter out invalid or draft links
    const validLinks = project.projectLink.filter(
        link => link.link && link.link !== 'null' && link.link !== 'undefined' && link.link.trim() !== ''
    );

    return (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6 transition-all duration-300">
            {/* Modal Box */}
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto relative shadow-2xl border border-gray-150 animate-in fade-in zoom-in-95 duration-250">
                
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6 sm:p-8 md:p-10">
                    {/* Project Title and Timeframe */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2.5 pr-10 tracking-tight">
                            {project.name}
                        </h2>
                        <span className="inline-flex items-center text-xs font-bold text-green-800 bg-green-50 px-3 py-1 rounded-md border border-green-200/50 uppercase tracking-wider">
                            {formatDateRange(project.startDate, project.endDate)}
                        </span>
                    </div>

                    {/* Project Image Panel */}
                    <div className="w-full rounded-xl overflow-hidden mb-6 border border-gray-200 bg-gray-50 flex items-center justify-center relative shadow-sm max-h-[420px]">
                        <Image 
                            src={project.image} 
                            alt={project.name} 
                            className="w-full h-auto object-contain max-h-[420px]" 
                            width={800} 
                            height={450} 
                            unoptimized={true} 
                        />
                    </div>

                    {/* Associated Company */}
                    {project.associatedWith && (
                        <div className="flex items-center gap-2 mb-6 p-3 bg-gray-50 border border-gray-205 rounded-xl">
                            {project.associatedWithImage && (
                                <div className="w-7 h-7 rounded-full border border-gray-300" style={{
                                    backgroundImage: `url(${project.associatedWithImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }} />
                            )}
                            <span className="text-sm font-semibold text-gray-700">
                                Associated with: <span className="text-gray-950 font-bold">{project.associatedWith}</span>
                            </span>
                        </div>
                    )}

                    {/* Project Description */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Project Overview</h3>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            {project.description}
                        </p>
                    </div>

                    {/* Technologies Section */}
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-8 border-t border-gray-200/80 pt-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Technologies Used</h3>
                            <div className="flex flex-wrap gap-2.5">
                                {project.technologies.map((tech, index) => (
                                    <div
                                        key={index}
                                        title={tech.name}
                                        aria-label={tech.name}
                                        className="flex items-center gap-2 px-3.5 py-1.5 bg-gray-50 border border-gray-200 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:scale-[1.03]"
                                    >
                                        {tech.icon ? (
                                            <span className="relative w-5 h-5 flex-shrink-0">
                                                <Image 
                                                    src={tech.icon} 
                                                    alt={tech.name} 
                                                    fill
                                                    sizes="20px"
                                                    className="object-contain" 
                                                    unoptimized
                                                />
                                            </span>
                                        ) : null}
                                        <span className="text-gray-800 text-xs font-semibold">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Links Section */}
                    {validLinks.length > 0 && (
                        <div className="border-t border-gray-200/80 pt-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Project Links</h3>
                            <div className="flex flex-wrap gap-3">
                                {validLinks.map((link, index) => {
                                    const isGithub = link.linkName.toLowerCase().includes('code') || link.link.includes('github.com');
                                    
                                    return (
                                        <a
                                            key={index}
                                            href={link.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                                        >
                                            {isGithub ? (
                                                /* GitHub Icon */
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                                </svg>
                                            ) : (
                                                /* External Link Icon */
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                </svg>
                                            )}
                                            {link.linkName}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
