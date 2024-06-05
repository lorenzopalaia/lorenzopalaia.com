"use client";

import CustomLink from "@/components/CustomLink";
import Card from "@/components/Card";
import useProjects from "@/hooks/useProjects";

const Projects = () => {
    const { projects, isLoading } = useProjects("lorenzopalaia");

    return (
        <section id="projects" className="section mb-32">
            {isLoading ? (
                <div>
                    {/* Render loading skeletons if loading */}
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="skeleton w-full h-48 mb-8 opacity-50"
                        />
                    ))}
                </div>
            ) : (
                <div className="group">
                    {projects.map((project, index) => (
                        <Card
                            key={index}
                            subtitle={project.name.split("-").join(" ")}
                            description={project.description}
                            img={project.repo_preview}
                            url={project.html_url}
                            show={
                                project.show === undefined ? true : project.show
                            }
                        />
                    ))}
                </div>
            )}

            <CustomLink href="/projects" className="mx-4">
                View All Projects
            </CustomLink>
        </section>
    );
};

export default Projects;
