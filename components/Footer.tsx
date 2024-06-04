import config from "@/config";

const Footer = () => {
    return (
        <footer>
            <p className="mt-32 mb-16 mx-4 font-light">{config.footer}</p>
        </footer>
    );
};

export default Footer;
