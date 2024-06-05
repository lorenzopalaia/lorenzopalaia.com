const BadgeList = ({ badges }: { badges: string[] }) => {
    return (
        <div className="flex flex-wrap">
            {badges.map((badge, index) => (
                <div
                    key={index}
                    className="badge badge-lg badge-secondary mt-4 mr-2"
                >
                    <p className="text-primary font-light">{badge}</p>
                </div>
            ))}
        </div>
    );
};

export default BadgeList;
