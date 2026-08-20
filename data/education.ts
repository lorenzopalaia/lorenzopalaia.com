export type EducationRecord = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  period: string;
  items: string[];
  href?: string;
  image: string;
  links?: {
    title: string;
    href: string;
  }[];
};

export const education: EducationRecord[] = [
  {
    title: "BSc in Computer and Automation Engineering",
    company: "Sapienza University of Rome",
    startDate: "",
    endDate: "Mar 2024",
    period: "— Mar 2024",
    items: [
      "Excelled in Operative Systems, Functional Programming, Programming Techniques (4.0 GPA with honors)",
      "Mastered Data Structures & Algorithms, Software Design, Parallel Computing, Electronics, Web Development (4.0 GPA)",
    ],
    href: "https://www.uniroma1.it/it/",
    image: "/assets/images/sapienza.webp",
    links: [
      {
        title: "Thesis paper",
        href: "/assets/thesis.pdf",
      },
      {
        title: "Thesis project",
        href: "https://github.com/lorenzopalaia/Neural-Style-Transfer-and-Genre-Classification",
      },
    ],
  },
];
