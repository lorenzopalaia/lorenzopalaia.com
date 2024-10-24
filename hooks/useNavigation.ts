import { useState, useEffect } from "react";

const useNavigation = (offset = 96) => {
  // * Default offset of 6rem (96px)
  const [scrollCoordinates, setScrollCoordinates] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollCoordinates = {
        x: window.scrollX,
        y: window.scrollY + offset, // * Add the offset to recognize the active section
      };
      setScrollCoordinates(newScrollCoordinates);

      // * Determine the current section based on the scroll position
      const sections = document.querySelectorAll("section"); // * Select all sections
      console.log(sections);
      let foundSection = null;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // * Check if the scroll position is within the section considering the offset
        if (
          newScrollCoordinates.y >= sectionTop &&
          newScrollCoordinates.y < sectionBottom
        ) {
          foundSection = section.id;
        }
      });

      if (foundSection) {
        setActiveSection(foundSection);
      }
    };

    // * Add a listener for the scroll event when the component is mounted
    window.addEventListener("scroll", handleScroll);

    // * Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]); // * Add the offset as a dependency to recalculate the effect when it changes

  return activeSection;
};

export default useNavigation;
