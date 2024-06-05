import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const BackLink = () => {
    return (
        <Link href="/">
            <p className="mt-16 text-primary">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Lorenzo Palaia
            </p>
        </Link>
    );
};

export default BackLink;
