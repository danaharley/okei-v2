"use client";

import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

type TimeAgoProps = {
  timestamp: Date;
  className?: string;
};

export const TimeAgo = ({ timestamp, className }: TimeAgoProps) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      const currentDate = new Date();
      const timeDifference = currentDate.getTime() - timestamp.getTime();

      const minute = 60 * 1000;
      const hour = 60 * minute;
      const day = 24 * hour;
      const month = 30 * day;
      const year = 365 * day;

      // example setTimeAgo(`${minutes} minute${minutes > 1 ? "s" : ""} ago`); 1 minutes ago
      if (timeDifference < minute) {
        setTimeAgo("a few second ago");
      } else if (timeDifference < hour) {
        const minutes = Math.floor(timeDifference / minute);
        setTimeAgo(`${minutes}m${minutes > 1 ? "" : ""}`);
      } else if (timeDifference < day) {
        const hours = Math.floor(timeDifference / hour);
        setTimeAgo(`${hours}h${hours > 1 ? "" : ""}`);
      } else if (timeDifference < month) {
        const days = Math.floor(timeDifference / day);
        setTimeAgo(`${days}d${days > 1 ? "" : ""}`);
      } else if (timeDifference < year) {
        const months = Math.floor(timeDifference / month);
        setTimeAgo(`${months}m${months > 1 ? "" : ""}`);
      } else {
        const years = Math.floor(timeDifference / year);
        setTimeAgo(`${years}y${years > 1 ? "" : ""}`);
      }
    };

    updateTimeAgo();

    const interval = setInterval(updateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <span
      className={cn(
        "shrink-0 text-sm font-normal leading-none tracking-tighter text-muted-foreground/75",
        className,
      )}
    >
      {timeAgo}
    </span>
  );
};
