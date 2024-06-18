import { useEffect, useRef, useState } from "react";

const offset = 32;

const useNavigation = () => {
    const [activeSection, setActiveSection] = useState<any>(null);
    const scrollHandlerRef = useRef<any>(null);

    useEffect(() => {
        // Add event listener on component mount
        scrollHandlerRef.current = () => {
            const scrollPosition = window.scrollY;
            const sections = document.querySelectorAll(".section");

            sections.forEach((section: any) => {
                const sectionTop = section.offsetTop - offset;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionBottom
                ) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener("scroll", scrollHandlerRef.current);

        // Scroll to top on initial render
        window.scrollTo({ top: 0 });

        // Cleanup function for removing event listener on component unmount
        return () => {
            window.removeEventListener("scroll", scrollHandlerRef.current);
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const scrollTo = section.offsetTop - offset;
            window.scrollTo({ top: scrollTo });
            // window.history.pushState(null, null, `#${sectionId}`); // Update URL hash
        }
    };

    const handleScroll = (sectionId: string) => {
        scrollToSection(sectionId);
        setActiveSection(sectionId);
    };

    return { activeSection, handleScroll };
};

export default useNavigation;
