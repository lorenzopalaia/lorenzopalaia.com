// "use client";

import config from "@/config";
import DateCard from "@/components/DateCard";
import InternalLink from "@/components/Links/InternalLink";
import SectionTitle from "@/components/SectionTitle";

export default function Experience() {
  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <SectionTitle>Experience</SectionTitle>
      <div>
        <ol className="group/list">
          {config.experience
            .filter((work) => work.show)
            .map((work, index) => (
              <li className="mb-12" key={index}>
                <DateCard
                  date={work.date}
                  title1={work.role}
                  title2={work.company}
                  title3={work.position}
                  title4={work.location}
                  description={work.description}
                  links={work.links}
                  badges={work.badges}
                  url={work.url}
                />
              </li>
            ))}
        </ol>
        <div className="mt-12">
          <InternalLink href="/experience">View Full Experience</InternalLink>
        </div>
      </div>
    </section>
  );
}
