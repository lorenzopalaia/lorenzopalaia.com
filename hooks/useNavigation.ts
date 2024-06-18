import { useState, useEffect } from "react";

const useNavigation = (offset = 96) => {
  // Offset predefinito di 6rem (96px)
  const [scrollCoordinates, setScrollCoordinates] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollCoordinates = {
        x: window.scrollX,
        y: window.scrollY + offset, // Aggiungiamo l'offset per riconoscere la sezione attiva
      };
      setScrollCoordinates(newScrollCoordinates);

      // Determina la sezione corrente in base alla posizione dello scroll
      const sections = document.querySelectorAll("section"); // Seleziona tutte le sezioni
      let foundSection = null;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // Verifica se la posizione dello scroll è all'interno della sezione considerando l'offset
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

    // Aggiungiamo un listener per l'evento di scroll quando il componente viene montato
    window.addEventListener("scroll", handleScroll);

    // Pulizia dell'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]); // Aggiungiamo l'offset come dipendenza per ricalcolare l'effetto quando cambia

  return activeSection;
};

export default useNavigation;
