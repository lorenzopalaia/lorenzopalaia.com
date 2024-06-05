import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BadgeList from "@/components/BadgeList";
import Image from "next/image";

const Card = ({
    title,
    subtitle,
    description,
    badges,
    date,
    img,
    url,
    show,
}: {
    title?: string;
    subtitle: string;
    description: string[];
    badges?: string[];
    date?: string;
    img?: string;
    url: string;
    show: boolean;
}) => {
    return (
        <div
            className={`flex group-hover:opacity-50 hover:bg-white/5 hover:!opacity-100 mb-8 rounded-md group/inside hover:border-t border-white/10 transition ease-in-out duration-250 ${
                url ? "cursor-pointer" : ""
            }`}
            onClick={() => url && window.open(url, "_blank")} // Handle external link redirection
        >
            {show && (
                <>
                    {date && (
                        <div className="w-1/4 mx-4 my-8">
                            <p className="uppercase font-light text-neutral-400 text-sm mt-6">
                                {date}
                            </p>
                        </div>
                    )}
                    {img && (
                        <div className="mx-4 order-2 lg:order-1 lg:w-1/4">
                            <Image
                                src={img}
                                alt="Project Preview"
                                className="lg:mt-6 mt-0 rounded"
                                style={{
                                    border: "3px solid rgba(255, 255, 255, 0.075)",
                                }}
                                width={300}
                                height={300}
                            />
                        </div>
                    )}
                    <div className={`w-3/4 mx-4 my-8 ${img ? "order-1" : ""}`}>
                        <p
                            className={`group-hover/inside:text-primary text-neutral-300 font-normal`}
                        >
                            {subtitle}
                            {url && (
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="ml-2 group-hover/inside:ml-3"
                                />
                            )}
                        </p>
                        <p className="font-light text-neutral-400 mb-4">
                            {title}
                        </p>
                        {description.map((paragraph, index) => (
                            <p key={index} className="font-extralight mb-2">
                                {paragraph}
                            </p>
                        ))}
                        {badges && <BadgeList badges={badges} />}
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;
