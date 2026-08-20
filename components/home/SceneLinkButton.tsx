"use client";

interface SceneLinkButtonProps {
  sceneId: string;
  children: React.ReactNode;
}

export default function SceneLinkButton({
  sceneId,
  children,
}: SceneLinkButtonProps) {
  const handleClick = () => {
    document.getElementById(sceneId)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <button
      type="button"
      className="text-cta"
      onClick={handleClick}
      data-cursor="EXPLORE"
    >
      {children}
    </button>
  );
}
