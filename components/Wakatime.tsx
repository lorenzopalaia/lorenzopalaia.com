"use client";

import useWakatime from "@/hooks/useWakatime";

const Wakatime = () => {
  const { wakatime, isLoading } = useWakatime();

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="relative pb-1 mb-12 transition-all animate-pulse">
          <div className="absolute z-0 hidden transition rounded-md -inset-x-4 -inset-y-4 motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50"></div>
          <div className="w-48 h-4 rounded bg-teal-400/10"></div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Total time coded this week:{" "}
          {wakatime.data.human_readable_total_including_other_language}
        </p>
      )}
    </div>
  );
};

export default Wakatime;
