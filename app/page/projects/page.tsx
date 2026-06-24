import { ProjectsGrid } from "@/components/pages/projects";
import ProjectData from "@/data/pages/projects/ProjectData";
import React from 'react';

const ProjectsPage = () => {
    return (
        <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Minimalist Typography Hero Header */}
                <div className="pt-16 pb-10">
                    {/* Live Chip Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50/80 border border-green-200/50 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-green-800 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                        </span>
                        Selected Creations
                    </div>
                    
                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-5 max-w-4xl leading-[1.1]">
                        Building things that <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-705 to-teal-900">make an impact.</span>
                    </h1>
                    
                    {/* Subtitle description */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed font-semibold">
                        A curated showcase of professional products, open-source packages, and personal experiments. From sleek user interfaces to robust backend services, each project reflects my passion for building clean, performant, and purposeful software.
                    </p>
                </div>

                {/* Projects Grid Section */}
                <div className="py-6">
                    <ProjectsGrid projects={ProjectData.projects} />
                </div>
            </div>  
        </div>
    );
};

export default ProjectsPage;
