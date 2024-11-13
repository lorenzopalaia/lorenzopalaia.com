"use client";

import React, { useState, useEffect, cloneElement } from "react";
import GitHubCalendar from "react-github-calendar";
import { ThemeInput } from "react-github-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MobileBreakpoint = 640;
const TabletBreakpoint = 1024;

export default function GitHubCal() {
  const [selectedMonths, setSelectedMonths] = useState(5);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < MobileBreakpoint) {
        setSelectedMonths(5);
      } else if (width >= MobileBreakpoint && width < TabletBreakpoint) {
        setSelectedMonths(6);
      } else {
        setSelectedMonths(7);
      }
    };

    handleResize(); // * Call once to set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const explicitTheme: ThemeInput = {
    dark: ["#1B284B", "#5EEAD4"],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectLastMonths = (contributions: any, monthsToSelect: number) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setMonth(currentDate.getMonth() - monthsToSelect + 1);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return contributions.filter((activity: any) => {
      const activityDate = new Date(activity.date);
      return activityDate >= startDate && activityDate <= currentDate;
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="mt-8">
      <div
        className={`relative mb-12 animate-pulse pb-1 transition-all ${
          loading ? "block" : "hidden"
        }`}
      >
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50"></div>
        <div className="h-32 w-[256px] rounded bg-teal-400/10 sm:w-1/2 md:w-[400px]"></div>
      </div>
      <div className={loading ? "hidden" : "block"}>
        <GitHubCalendar
          username="lorenzopalaia"
          theme={explicitTheme}
          hideColorLegend={true}
          labels={{
            totalCount: `{{count}} contributions in the last ${selectedMonths} months`,
          }}
          transformData={(contributions) =>
            selectLastMonths(contributions, selectedMonths)
          }
          renderBlock={(block, activity) =>
            cloneElement(block, {
              "data-tooltip-id": "react-tooltip",
              "data-tooltip-html": `${activity.count} activities on ${new Date(
                activity.date,
              ).toLocaleDateString()}`,
            })
          }
          loading={loading}
        />
        <ReactTooltip id="react-tooltip" />
      </div>
    </div>
  );
}
