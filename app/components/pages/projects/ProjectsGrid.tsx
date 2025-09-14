"use client";

import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import ImagePlaceholder from './ImagePlaceholder';
import { Project, ProjectsGridProps } from './types';

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Function to format date range
    const formatDateRange = (startDate: string, endDate: string): string => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
        const startYear = start.getFullYear().toString().slice(-2);
        const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
        const endYear = end.getFullYear().toString().slice(-2);

        return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    };

    // Function to determine cell type and span for the complex grid pattern
    const getCellInfo = (row: number, col: number) => {
        // Pattern for first 10 projects:
        // Row 1: Black, Green, White
        // Row 2: Green, Black+Black (combined), White  
        // Row 3: White, Green, White
        // Row 4: Green, White, Green
        // Row 5: White, Black+Black (combined), White

        if (row === 0) { // Row 1
            if (col === 0) return { type: 'black', span: 1 };
            if (col === 1) return { type: 'project', span: 1 };
            if (col === 2) return { type: 'white', span: 1 };
        } else if (row === 1) { // Row 2
            if (col === 0) return { type: 'project', span: 1 };
            if (col === 1) return { type: 'black', span: 2 }; // Combined cell
            if (col === 2) return { type: 'skip', span: 0 }; // Skip this position
        } else if (row === 2) { // Row 3
            if (col === 0) return { type: 'white', span: 1 };
            if (col === 1) return { type: 'project', span: 1 };
            if (col === 2) return { type: 'white', span: 1 };
        } else if (row === 3) { // Row 4
            if (col === 0) return { type: 'project', span: 1 };
            if (col === 1) return { type: 'white', span: 1 };
            if (col === 2) return { type: 'project', span: 1 };
        } else if (row === 4) { // Row 5
            if (col === 0) return { type: 'white', span: 1 };
            if (col === 1) return { type: 'black', span: 2 }; // Combined cell
            if (col === 2) return { type: 'skip', span: 0 }; // Skip this position
        }

        // Default fallback
        return { type: 'white', span: 1 };
    };

    // Create grid items with complex pattern
    const gridItems = [];
    let projectIndex = 0;
    let wideImageIndex = 1; // Track wide image order
    let singleImageIndex = 1; // Track single image order

    // Create 5 rows with 3 columns each (but some cells are merged)
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
            const cellInfo = getCellInfo(row, col);

            if (cellInfo.type === 'skip') {
                continue;
            }

            if (cellInfo.type === 'project' && projectIndex < projects.length) {
                // Project card (green)
                const project = projects[projectIndex];
                gridItems.push(
                    <ProjectCard
                        key={`project-${project.id}`}
                        project={project}
                        variant="green"
                        span={cellInfo.span}
                        formatDateRange={formatDateRange}
                        onClick={() => setSelectedProject(project)}
                    />
                );
                projectIndex++;
            } else if (cellInfo.type === 'black') {
                // Image placeholder (black) with background image - hidden on mobile
                const isWideBox = cellInfo.span === 2;
                const imageIndex = isWideBox ? wideImageIndex : singleImageIndex;

                gridItems.push(
                    <ImagePlaceholder
                        key={`placeholder-${row}-${col}`}
                        isWideBox={isWideBox}
                        imageIndex={imageIndex}
                        span={cellInfo.span}
                    />
                );

                if (isWideBox) {
                    wideImageIndex++;
                } else {
                    singleImageIndex++;
                }
            } else if (cellInfo.type === 'white' && projectIndex < projects.length) {
                // White project card (with black text)
                const project = projects[projectIndex];
                gridItems.push(
                    <ProjectCard
                        key={`project-${project.id}`}
                        project={project}
                        variant="white"
                        span={cellInfo.span}
                        formatDateRange={formatDateRange}
                        onClick={() => setSelectedProject(project)}
                    />
                );
                projectIndex++;
            }
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4">
                {gridItems}
            </div>

            {/* Project Popup Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    formatDateRange={formatDateRange}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </>
    );
};

export default ProjectsGrid;
