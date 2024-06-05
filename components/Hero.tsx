import config from "@/config";

const Hero = () => {
    return (
        <>
            <h1 className="mb-2 mt-16 text-4xl font-bold">
                {config.hero.name}
            </h1>
            <h2 className="mb-4 text-xl font-thin">{config.hero.title}</h2>
            <p className="mb-16 font-light">{config.hero.description}</p>
        </>
    );
};

export default Hero;
