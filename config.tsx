import { Linkedin, Github, Mail } from "lucide-react";

export const config = {
  socials: [
    {
      href: "https://www.linkedin.com/in/lorenzopalaia/",
      icon: <Linkedin className="text-muted-foreground hover:text-primary" />,
    },
    {
      href: "https://github.com/lorenzopalaia",
      icon: <Github className="text-muted-foreground hover:text-primary" />,
    },
    {
      href: "mailto:lorenzopalaia53@gmail.com",
      icon: <Mail className="text-muted-foreground hover:text-primary" />,
    },
  ],
  work: [
    {
      title: "Computer Vision Software Engineer",
      company: "Sapienza Flight Team",
      startDate: "Sep 2021",
      endDate: "Oct 2022",
      items: [
        <p key={1}>
          Implemented the object detection and terrain mapping systems of a UAV,
          trained <span className="font-bold">YOLOv5/EfficientNet</span> models
          with custom datasets
        </p>,
        <p key={2}>
          Designed the{" "}
          <span className="font-bold">communication protocols</span> between UAV
          and Ground Station from scratch via endpoints using Flask,
          restructured the labeling GUI
        </p>,
        <p key={3}>
          Worked in a subteam of 5 and collaborated frequently with 60 people in
          other sumteams, migrated the entire Flight Team workflow to Slack
        </p>,
        <p key={4}>
          Earned a <span className="font-bold">15th</span> position out of 71
          entries for the Technical Design Paper in the AUVSI SUAS competition
        </p>,
      ],
      href: "https://www.sasa-aerospace.it/flight-team/",
      img: "/flightteam.png",
    },
    {
      title: "Software Developer",
      company: "Freelance",
      startDate: "2019",
      endDate: "Present",
      items: [
        <p key={1}>
          Developed websites and applications for more than{" "}
          <span className="font-bold">5</span> private and corporate clients
          including landing pages, bots and trackers,
        </p>,
      ],
      href: "https://github.com/lorenzopalaia",
      img: "/github.png",
      links: [
        {
          title: "GitHub",
          href: "https://github.com/lorenzopalaia",
        },
      ],
    },
  ],
  education: [
    {
      title: "BsC in Computer and Automatic Engineering",
      company: "Sapienza University of Rome",
      startDate: "",
      endDate: "Mar 2024",
      items: [
        <div key={1}>
          Best Marks:
          <ul className="ml-4 list-outside list-disc">
            <li>
              Operative Systems, Functional Programming, Programming Techniques{" "}
              <span className="font-bold">4.0 GPA with honors</span>
            </li>
            <li>
              Computer Architecture, Computer Networks, Databases, Software
              Engineering <span className="font-bold">4.0 GPA</span>
            </li>
          </ul>
        </div>,
      ],
      href: "https://www.uniroma1.it/it/",
      img: "/sapienza.jpeg",
      links: [
        {
          title: "Thesis Paper",
          href: "/thesis.pdf",
        },
        {
          title: "Thesis Project",
          href: "https://github.com/lorenzopalaia/Neural-Style-Transfer-and-Genre-Classification",
        },
      ],
    },
  ],
  extra: [
    {
      title: "Boolean Data Week",
      company: "Boolean Careers",
      startDate: "",
      endDate: "Nov 2023",
      href: "https://boolean.careers",
      img: "/boolean.png",
    },
    {
      title: "<Code.Your.Future> AI Hackathon",
      company: "Randstad",
      startDate: "",
      endDate: "Mar 2023",
      items: [
        <p key={1}>
          Led the development of a{" "}
          <span className="font-bold">job description classifier</span> in a
          team of 5 using TensorFlow during a 4-hour challenge
        </p>,
        <p key={2}>
          Secured the <span className="font-bold">2nd</span> spot out of 8
          contenders, reached an F1 score of 75%, explored both Bag of Words and
          Word2Vec solutions
        </p>,
      ],
      href: "https://www.randstad.it/",
      img: "/randstad.png",
      links: [
        {
          title: "Submission",
          href: "https://github.com/lorenzopalaia/Randstad-AI-Hackathon",
        },
      ],
    },
  ],
  skills: [
    "React",
    "Next.js",
    "Tailwind",
    "Node.js",
    "Git",
    "Python",
    "C",
    "Java",
    "Linux",
    "Bash",
    "Arduino",
  ],
};
