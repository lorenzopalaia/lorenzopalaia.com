"use client";

import config from "@/config";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const workExperience = () => {
    return (
        <section id="work-experience" className="section">
            <div className="group">
                {config.workExperience.map((work) => (
                    <div
                        key={work.id || work} // Use a unique identifier (if provided) or fallback
                        className={`flex group-hover:opacity-50 hover:bg-white/5 hover:!opacity-100 mb-8 rounded-md transition ease-in-out duration-250 ${
                            work.url ? "cursor-pointer" : ""
                        }`}
                        onClick={() =>
                            work.url && window.open(work.url, "_blank")
                        } // Handle external link redirection
                    >
                        {work.show && (
                            <>
                                <div className="w-1/4 mx-4">
                                    <p className="uppercase font-light text-neutral-400 text-sm mt-6">
                                        {work.date}
                                    </p>
                                </div>
                                <div className="w-3/4 mx-4">
                                    <p
                                        className={`group-hover/inside:text-primary text-neutral-300 font-normal mb-0`}
                                    >
                                        {work.company}
                                        {work.url && (
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                                className="ml-2 group-hover/inside:ml-3"
                                            />
                                        )}
                                    </p>
                                    <p className="font-light text-neutral-400 mt-0">
                                        {work.role}
                                    </p>
                                    {work.description.map(
                                        (description, index) => (
                                            <p
                                                key={index}
                                                className="font-extralight"
                                            >
                                                {description}
                                            </p>
                                        )
                                    )}
                                    <div className="flex flex-wrap">
                                        {work.badges.map((badge, index) => (
                                            <div
                                                key={index}
                                                className="badge badge-lg badge-secondary mr-2 mb-8"
                                            >
                                                <p className="text-primary font-light">
                                                    {badge}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <Link href="/work-experience" className="no-underline">
                <p className="mb-32 mx-4 group hover:underline decoration-primary">
                    View All Work Experiences
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 group-hover:ml-3"
                    />
                </p>
            </Link>
        </section>
    );
};

export default workExperience;
