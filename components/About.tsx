import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AboutCard from "@/components/AboutCard";

export default function About() {
  const work = [
    {
      title: "Graduate Associate (SEED Programme)",
      company: "DBS Bank",
      startDate: "Jul 2023",
      endDate: "Present",
      items: [
        "Developed the Java backend for a bank account servicing process with multiple channel integrations using Activiti workflow",
        "Built a custom database migration tool using Python and MariaDB and facilitated the migration of 1000+ processes from a vendor platform",
      ],
      href: "https://www.dbs.com.sg",
      img: "/dbs.png",
    },
    {
      title: "Software Engineer Intern",
      company: "DBS Bank",
      startDate: "May 2022",
      endDate: "Aug 2022",
      items: [
        "Developed a web application for a bank account servicing process using Spring Boot and React",
        "Implemented a custom authentication system using JWT and Spring Security",
      ],
      href: "https://www.dbs.com.sg",
      img: "/dbs.png",
    },
  ];

  const education = [
    {
      title: "Bachelor of Computer Science",
      company: "National University of Singapore",
      startDate: "Aug 2019",
      endDate: "May 2023",
      href: "https://www.comp.nus.edu.sg",
      img: "/nus.png",
    },
    {
      title: "Diploma in Information Technology",
      company: "Singapore Polytechnic",
      startDate: "Apr 2016",
      endDate: "May 2019",
      items: ["Graduated with Merit", "Gold Medal for Academic Excellence"],
      href: "https://www.sp.edu.sg",
      img: "/sp.png",
      links: [
        {
          title: "Graduated with Merit",
          href: "https://www.sp.edu.sg",
        },
        {
          title: "Gold Medal for Academic Excellence",
          href: "https://www.sp.edu.sg",
        },
      ],
    },
  ];

  return (
    <section className="mt-12">
      <Tabs defaultValue="work">
        <TabsList className="w-full">
          <TabsTrigger className="w-full font-bold" value="work">
            Work
          </TabsTrigger>
          <TabsTrigger className="w-full font-bold" value="education">
            Educaiton
          </TabsTrigger>
        </TabsList>
        <TabsContent value="work">
          <AboutCard data={work} />
        </TabsContent>
        <TabsContent value="education">
          <AboutCard data={education} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
