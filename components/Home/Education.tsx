import config from "@/config";
import DateCard from "@/components/DateCard";
import InternalLink from "@/components/Links/InternalLink";
import SectionTitle from "@/components/SectionTitle";

export default function Education() {
  return (
    <section
      id="education"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Education"
    >
      <SectionTitle>Education</SectionTitle>
      <div>
        <ol className="group/list">
          {config.education
            .filter((degree) => degree.show)
            .map((degree, index) => (
              <li className="mb-12" key={index}>
                <DateCard
                  date={degree.date}
                  title1={degree.degree}
                  title3={degree.school}
                  title4={degree.location}
                  description={degree.description}
                  url={degree.url}
                />
              </li>
            ))}
        </ol>
        <div className="mt-12">
          <InternalLink href="/education">View Full Education</InternalLink>
        </div>
      </div>
    </section>
  );
}
