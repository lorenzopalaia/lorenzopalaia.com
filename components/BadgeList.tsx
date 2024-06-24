const BadgeList = ({ badges }: { badges: string[] }) => {
  return (
    <ul className="flex flex-wrap mt-2" aria-label="Technologies used">
      {badges.map((badge, index) => (
        <li key={index} className="mr-1.5 mt-2">
          <div className="flex items-center px-3 py-1 text-xs font-medium leading-5 text-teal-300 rounded-full bg-teal-400/10">
            {badge}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BadgeList;
