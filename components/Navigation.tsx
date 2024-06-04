"use client";

import config from "@/config";
import { useState } from "react";

const Navigation = () => {
    /* window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => {
            const setionTop = section.offsetTop - 32;
            const sectionBottom = setionTop + section.offsetHeight;
            if (scrollPosition >= setionTop && scrollPosition < sectionBottom) {
                setActiveSection(section.id);
            }
        });
    }); */

    const [activeSection, setActiveSection] = useState(null);

    return (
        <header>
            <nav className="hidden md:block">
                {config.nav.map((section) => (
                    <div
                        className="flex flex-row group cursor-pointer"
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                    >
                        <div
                            className={`divider group-hover:w-16 group-hover:divider-primary mt-1.5 mr-4 ${
                                activeSection === section.id
                                    ? "w-16 divider-primary"
                                    : "w-8 divider-accent"
                            }`}
                        ></div>
                        <div
                            className={`uppercase group-hover:text-primary active:text-accent font-bold ${
                                activeSection === section.id
                                    ? "text-primary"
                                    : "text-accent"
                            }`}
                        >
                            {section.name}
                        </div>
                    </div>
                ))}
            </nav>
        </header>
    );
};

export default Navigation;
