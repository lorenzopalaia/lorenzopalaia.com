"use client";

import config from "@/config";
import useNavigation from "@/hooks/useNavigation";

const Navigation = () => {
    const { activeSection, handleScroll } = useNavigation();

    return (
        <header>
            <nav className="hidden md:block">
                {config.nav.map((section) => (
                    <div
                        className="flex flex-row group cursor-pointer"
                        key={section.id}
                        onClick={() => handleScroll(section.id)}
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
