import config from "@/config";

const Hero = () => {
    return (
        <>
            <h1 className="mb-4 mt-16">{config.hero.name}</h1>
            <h2 className="mt-0 mb-4 font-thin">{config.hero.title}</h2>
            <p className="font-light">{config.hero.description}</p>
        </>
    );
};

export default Hero;
