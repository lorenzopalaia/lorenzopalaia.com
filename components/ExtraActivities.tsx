"use client";

import config from "@/config";
import CustomLink from "@/components/CustomLink";
import Card from "@/components/Card";

const ExtraActivities = () => {
    return (
        <section id="extra-activities" className="section mb-32">
            <div className="group">
                {config.extraActivities.map((activity, index) => (
                    <Card
                        key={index}
                        title={activity.role}
                        subtitle={activity.name}
                        description={activity.description}
                        badges={activity.badges}
                        date={activity.date}
                        url={activity.url}
                        show={activity.show}
                    />
                ))}
            </div>
            <CustomLink href="/extra-activities" className="mx-4">
                View All Extra Activities
            </CustomLink>
        </section>
    );
};

export default ExtraActivities;
