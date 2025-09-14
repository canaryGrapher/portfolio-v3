import React from 'react';
import Image from 'next/image';
import { ProjectModalProps } from './types';

const ProjectModal: React.FC<ProjectModalProps> = ({ project, formatDateRange, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative">
                <div className="p-4 sm:p-6 lg:p-8">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors z-10"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Project Title and Timeframe */}
                    <div className="mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                            {project.name}
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600">
                            {formatDateRange(project.startDate, project.endDate)}
                        </p>
                    </div>

                    {/* Project Image */}
                    <div className="w-full h-auto rounded-lg mb-6 flex items-center justify-center">
                        <Image src={project.image} alt={project.name} className="w-full" />
                    </div>

                    {/* Associated Company */}
                    {project.associatedWith && (
                        <div className="flex items-center mb-6">
                            {project.associatedWithImage && (
                                <div className="w-8 h-8 mr-2 rounded-full" style={{
                                    backgroundImage: `url(${project.associatedWithImage?.src || project.associatedWithImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }} />
                            )}
                            <span className="text-gray-700">
                                Associated with {project.associatedWith}
                            </span>
                        </div>
                    )}

                    {/* Project Description */}
                    <div className="mb-6">
                        <p className="text-gray-600 leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-black mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <div
                                    key={index}
                                    title={tech.name}
                                    aria-label={tech.name}
                                    role="button"
                                    tabIndex={0}
                                    className="group relative h-12 w-12 flex items-center justify-center bg-black/80 rounded-lg"
                                >
                                    {tech.icon ? (
                                        <Image src={tech.icon} alt={tech.name} width={18} height={18} className="w-full h-full p-2" />
                                    ) : (
                                        <span className="text-white text-xs">{tech.name}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-3">Links</h3>
                        <div className="flex flex-wrap gap-4">
                            {project.projectLink.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-800 px-4 py-2 bg-gray-200 rounded-md transition-colors"
                                >
                                    {link.linkName}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
