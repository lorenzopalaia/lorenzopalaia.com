import { config } from "@/config";
import { Badge } from "@/components/ui/badge";

export default function Skills() {
  return (
    <section className="my-16">
      <p className="title text-2xl sm:text-3xl">Skills</p>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {config.skills.map((skill, index) => (
          <Badge key={index}>{skill}</Badge>
        ))}
      </div>
    </section>
  );
}
