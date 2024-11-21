import { languagesMap } from "@/config";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Language {
  label: string;
  color: string;
  icon: React.ComponentType<{ size: number; color: string; className: string }>;
  description?: string;
}

function getLanguage(language: string): Language | undefined {
  const lang = language.toLowerCase().replace(" ", "");
  const languageData = languagesMap[lang as keyof typeof languagesMap];
  if (languageData) {
    return {
      label: languageData.label,
      color: languageData.color,
      icon: languageData.icon,
      description: languageData.description,
    };
  }
  return undefined;
}

export default function LanguagesList({ languages }: { languages: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {languages.map((language) => {
        const lang = getLanguage(language);
        if (lang)
          return (
            <Tooltip key={language}>
              <TooltipTrigger asChild>
                <div
                  className="rounded border"
                  style={{
                    backgroundColor: `rgba(${lang.color}, 0.1)`,
                    borderColor: `rgba(${lang.color}, 0.5)`,
                  }}
                >
                  <lang.icon
                    size={36}
                    className="p-2"
                    color={`rgb(${lang.color})`}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-bold">{lang.label}</p>
              </TooltipContent>
            </Tooltip>
          );
      })}
    </div>
  );
}
