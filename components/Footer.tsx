import config from "@/config";

const Footer = () => {
    return (
        <footer>
            <p className="mt-32 mb-16 mx-4 font-light">
                {config.footer}
                <br />
                Copyright © {new Date().getFullYear()} - All Rights Reserved
            </p>
        </footer>
    );
};

export default Footer;
