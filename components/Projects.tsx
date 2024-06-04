"use client";

import config from "@/config";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
    return (
        <section id="projects" className="section">
            {config.projects.length === 0 && (
                <div>
                    {/* Render loading skeletons if no projects */}
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="skeleton w-full h-48 mb-8 opacity-50"
                        />
                    ))}
                </div>
            )}
            {config.projects.length > 0 && (
                <div className="group">
                    {config.projects.map((project) => (
                        <div
                            key={project.id || project.name} // Use unique identifier (if provided) or fallback
                            className={`flex flex-col lg:flex-row group-hover:opacity-50 hover:bg-white/5 hover:!opacity-100 mb-8 rounded-md group/inside hover:border-t border-white/10 transition ease-in-out duration-250 ${
                                project.url ? "cursor-pointer" : ""
                            }`}
                            onClick={() =>
                                project.html_url &&
                                window.open(project.html_url, "_blank")
                            }
                        >
                            <div className="mx-4 order-2 lg:order-1 lg:w-1/4">
                                <Image
                                    src={project.repo_preview}
                                    alt="Project Preview"
                                    className="lg:mt-6 mt-0 rounded"
                                    style={{
                                        border: "3px solid rgba(255, 255, 255, 0.075)",
                                    }}
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <div className="w-3/4 mx-4 order-1">
                                <p
                                    className={`group-hover/inside:text-primary lg:order-2 text-neutral-300 font-normal mb-0`}
                                >
                                    {project.name.replace(/-/g, " ")}
                                    {project.url && (
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                            className="ml-2 group-hover/inside:ml-3"
                                        />
                                    )}
                                </p>
                                <p className="font-extralight">
                                    {project.description}
                                </p>
                                {project.hasOwnProperty("stargazers_count") && (
                                    <p className="text-neutral-500">
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className="mr-1"
                                        />
                                        {project.stargazers_count}
                                    </p>
                                )}
                                <div className="flex flex-wrap">
                                    {project.languages.map((language) => (
                                        <div
                                            key={language}
                                            className="badge badge-lg badge-secondary mr-2 mb-8"
                                        >
                                            <p className="text-primary font-light">
                                                {language}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Link href="/projects" className="no-underline">
                <p className="mb-32 mx-4 group hover:underline decoration-primary">
                    View All Projects
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 group-hover:ml-3"
                    />
                </p>
            </Link>
        </section>
    );
};

export default Projects;
