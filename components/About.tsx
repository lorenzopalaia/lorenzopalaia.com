import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AboutCard from "@/components/AboutCard";

import { config } from "@/config";

export default function About() {
  return (
    <section className="mt-12">
      <Tabs defaultValue="work">
        <TabsList className="w-full">
          <TabsTrigger className="w-full font-bold" value="work">
            Work
          </TabsTrigger>
          <TabsTrigger className="w-full font-bold" value="education">
            Education
          </TabsTrigger>
        </TabsList>
        <TabsContent value="work">
          <AboutCard data={config.work} />
        </TabsContent>
        <TabsContent value="education">
          <AboutCard data={config.education} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
