const config = {
    hero: {
        name: "Lorenzo Palaia",
        title: "Software Engineer | Computer and Automatic Engineer Graduate",
        description:
            "Crypto enthusiast, passionate about programming, artificial intelligence, blockchains, finance and traveling",
    },
    navigation: [
        { name: "About", id: "about" },
        { name: "Experience", id: "experience" },
        { name: "Projects", id: "projects" },
        { name: "Education", id: "education" },
        { name: "Extra Activities", id: "extra-activities" },
        { name: "Skills", id: "skills" },
    ],
    experience: [
        {
            show: true,
            url: "https://www.github.com/lorenzopalaia",
            date: "2019 - Present",
            role: "Software Engineer",
            company: "Freelance",
            position: "Fullstack Developer",
            location: "Rome, Italy",
            description: [
                "Developed websites and applications for more than 5 private and corporate clients including landing pages, bots and trackers",
            ],
            links: [
                {
                    name: "GitHub",
                    url: "https://www.github.com/lorenzopalaia",
                },
            ],
            badges: ["Python", "HTML"],
        },
    ],
    showedProjects: [
        // github projects
        "Neural-Style-Transfer-and-Genre-Classification",
        "Arduino-Oscilloscope",
        "Blocktracr",
        // local projects
        "Sysco S.p.A.",
    ],
    projects: [
        {
            created_at: "Feb 2024",
            updated_at: "Mar 2024",
            img: "https://raw.githubusercontent.com/lorenzopalaia/Repo-Template/main/repo_assets/preview.png",
            html_url: "https://syscospa.it",
            name: "Sysco S.p.A.",
            description:
                "Developed a corporate website for Sysco S.p.A. using Vue.js, HTML and CSS",
            // stargazers_count: 0,
            languages: ["Vue", "Javascript", "HTML", "CSS"],
        },
        {
            created_at: "Sep 2020",
            updated_at: "Oct 2020",
            img: "https://raw.githubusercontent.com/lorenzopalaia/Repo-Template/main/repo_assets/preview.png",
            html_url: "https://alfa-impiantisrl.it",
            name: "Alfa Impianti S.r.l.",
            description:
                "Developed a corporate website for Alfa Impianti S.r.l. using HTML and CSS",
            stargazers_count: 0,
            languages: ["Javascript", "HTML", "CSS"],
        },
    ],
    education: [
        {
            show: true,
            url: "https://www.uniroma1.it",
            date: "Mar 2024",
            degree: "Computer and Automatic Engineering",
            school: "Sapienza University of Rome",
            location: "Rome, Italy",
            description: [
                "Best Marks: Operative Systems, Functional Programming, Programming Techniques 4.0 GPA with honors, Data Structures & Algorithms, Software Design, Parallel Computing, Electronics, Web Development 4.0 GPA",
            ],
        },
    ],
    extraActivities: [
        {
            show: false,
            url: "https://www.boolean.careers",
            date: "Nov 2023",
            activity: "Boolean Data Week",
            category: "Data Visualization",
            role: "Participant",
            location: "Remote",
            description: [],
            badges: ["Python", "Pandas", "Tableau"],
        },
        {
            show: true,
            url: "https://www.github.com/lorenzopalaia/Randstad-AI-Hackathon",
            date: "Mar 2023",
            activity: "Randstad <Code.Your.Future>",
            category: "AI Hackathon",
            role: "Participant",
            location: "Rome, Italy",
            description: [
                "Guided the development of a job description neural network in a team of 5 using Tensorflow in a 4 hour challenge",
                "Secured the 2nd spot out of 8 contenders, reached an F1 score of 75%, explored both Bag of Words and Word2Vec solutions",
            ],
            badges: ["Python", "Tensorflow"],
        },
        {
            show: true,
            url: "https://www.sasa-aerospace.it/flight-team",
            date: "Sep 2021 - Oct 2022",
            activity: "Sapienza Flight Team",
            category: "AUVSI SUAS Competition",
            role: "Computer Vision Software Engineer",
            location: "Rome, Italy",
            description: [
                "Implemented the object detection and terrain mapping systems of a UAV, trained YOLOv5/EfficientNet models with custom datasets",
                "Designed the communication protocols between UAV and Ground Station from scratch via endpoints using Flask, restructured the labeling GUI",
                "Worked in a subteam of 5 and collaborated frequently with 60 people in other sumteams, migrated the entire Flight Team workflow to Slack",
                "Earned a 15th position out of 71 entries for the Technical Design Paper in the AUVSI SUAS competition",
            ],
            badges: ["Python", "Tensorflow"],
        },
    ],
    skills: [
        { name: "Python", value: 90 },
        { name: "C", value: 80 },
        { name: "Java", value: 80 },
        { name: "Javascript", value: 70 },
        { name: "Tensorflow", value: 80 },
        { name: "Vue", value: 90 },
        { name: "Node.js", value: 80 },
        { name: "HTML", value: 70 },
        { name: "CSS", value: 70 },
        { name: "MongoDB", value: 60 },
        { name: "PostgreSQL", value: 50 },
    ],
    languages: [
        { name: "Italian", value: 100 },
        { name: "English", value: 80 },
        { name: "French", value: 25 },
    ],
};

export default config;
