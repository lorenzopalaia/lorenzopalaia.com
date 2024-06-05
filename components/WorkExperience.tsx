"use client";

import config from "@/config";
import CustomLink from "@/components/CustomLink";
import Card from "@/components/Card";

const workExperience = () => {
    return (
        <section id="work-experience" className="section mb-32">
            <div className="group">
                {config.workExperience.map((work, index) => (
                    <Card
                        key={index}
                        title={work.company}
                        subtitle={work.role}
                        description={work.description}
                        badges={work.badges}
                        date={work.date}
                        url={work.url}
                        show={work.show}
                    />
                ))}
            </div>
            <CustomLink href="/work-experience" className="mx-4">
                View All Work Experiences
            </CustomLink>
        </section>
    );
};

export default workExperience;
