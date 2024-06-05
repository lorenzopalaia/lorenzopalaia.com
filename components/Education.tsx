"use client";

import config from "@/config";
import CustomLink from "@/components/CustomLink";
import Card from "@/components/Card";

const Education = () => {
    return (
        <section id="education" className="section mb-32">
            <div className="group">
                {config.education.map((degree, index) => (
                    <Card
                        key={index}
                        title={degree.school}
                        subtitle={degree.degree}
                        description={degree.description}
                        date={degree.date}
                        url={degree.url}
                        show={degree.show}
                    />
                ))}
            </div>
            <CustomLink href="/education" className="mx-4">
                View All Education
            </CustomLink>
        </section>
    );
};

export default Education;
