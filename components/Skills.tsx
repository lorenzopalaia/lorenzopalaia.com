import { config } from "@/config";

import LanguagesList from "@/components/LanguagesList";

export default function Skills() {
  return (
    <section className="my-16">
      <p className="title text-2xl sm:text-3xl">Skills</p>
      <div className="mt-8">
        <LanguagesList languages={config.skills} />
      </div>
    </section>
  );
}
