"use client";

import config from "@/config";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Education = () => {
    return (
        <section id="education" className="section">
            <div className="group">
                {config.education.map((degree) => (
                    <div
                        key={degree.id || degree.degree} // Use unique identifier (if provided) or fallback
                        className={`flex group-hover:opacity-50 hover:bg-white/5 hover:!opacity-100 mb-8 rounded-md group/inside hover:border-t border-white/10 transition ease-in-out duration-250 ${
                            degree.url ? "cursor-pointer" : ""
                        }`}
                        onClick={() =>
                            degree.url && window.open(degree.url, "_blank")
                        }
                    >
                        {degree.show && (
                            <>
                                <div className="w-1/4 mx-4">
                                    <p className="uppercase font-light text-neutral-400 text-sm mt-6">
                                        {degree.date}
                                    </p>
                                </div>
                                <div className="w-3/4 mx-4">
                                    <p
                                        className={`group-hover/inside:text-primary text-neutral-300 font-normal mb-0`}
                                    >
                                        {degree.degree}
                                        {degree.url && (
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                                className="ml-2 group-hover/inside:ml-3"
                                            />
                                        )}
                                    </p>
                                    <p className="font-light text-neutral-400 mt-0">
                                        {degree.school}
                                    </p>
                                    {degree.description.map(
                                        (description, index) => (
                                            <p
                                                key={index}
                                                className="font-extralight"
                                            >
                                                {description}
                                            </p>
                                        )
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <Link href="/education" className="no-underline">
                <p className="mb-32 mx-4 group hover:underline decoration-primary">
                    View All Education
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 group-hover:ml-3"
                    />
                </p>
            </Link>
        </section>
    );
};

export default Education;
