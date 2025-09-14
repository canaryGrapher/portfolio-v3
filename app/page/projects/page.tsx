import { Projects } from "@/assets/images";
import { PageHeroSection } from "@/components/common";
import { ProjectsGrid } from "@/components/pages/projects";
import ProjectData from "@/data/pages/projects/ProjectData";

import React from 'react';

const ProjectsPage = () => {
    return (
        <div className="bg-gray-200 min-h-screen">
            <div className="pt-10 max-w-7xl mx-auto">
                {/* Hero Section */}
                <PageHeroSection
                    backgroundImage={Projects.projectsBG.src}
                    title="My Projects"
                    subtitle="Some say ideas matter. Some say execution matters more. I believe both are essential. My portfolio is a mix of personal experiments and professional projects I've delivered with teams across industries. Whether it's a sleek web app, a backend service, or a full-stack product, each project reflects my passion for building things that make an impact. Technology keeps evolving, and so do I. This is not just a portfolio — it's a story in progress, one project at a time."
                    altText="Projects Background"
                />

                {/* Projects Grid */}
                <div className="container mx-auto px-4 py-12">
                    <ProjectsGrid projects={ProjectData.projects} />
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
