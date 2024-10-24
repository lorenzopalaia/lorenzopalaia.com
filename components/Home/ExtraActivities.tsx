import config from "@/config";
import DateCard from "@/components/DateCard";
import InternalLink from "@/components/Links/InternalLink";
import SectionTitle from "@/components/SectionTitle";

export default function ExtraActivities() {
  return (
    <section
      id="extra-activities"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Extra Activities"
    >
      <SectionTitle>Extra Activities</SectionTitle>
      <div>
        <ol className="group/list">
          {config.extraActivities
            .filter((activity) => activity.show)
            .map((activity, index) => (
              <li className="mb-12" key={index}>
                <DateCard
                  date={activity.date}
                  title1={activity.activity}
                  title2={activity.category}
                  title3={activity.role}
                  title4={activity.location}
                  description={activity.description}
                  badges={activity.badges}
                  url={activity.url}
                />
              </li>
            ))}
        </ol>
        <div className="mt-12">
          <InternalLink href="/extra-activities">
            View All Extra Activities
          </InternalLink>
        </div>
      </div>
    </section>
  );
}
