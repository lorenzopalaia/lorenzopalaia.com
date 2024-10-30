export const config = {
  work: [
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
        <div key={2}>
          <span className="font-bold">Best Marks:</span>
          <ul className="ml-4 list-outside list-disc">
            <li>
              Operative Systems, Functional Programming, Programming Techniques{" "}
              <span className="font-bold">4.0 GPA with honors</span>
            </li>
            <li>
              Computer Architecture, Computer Networks, Databases, Software
              Engineering <span className="font-bold">4.0 GPA with honors</span>
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
};
