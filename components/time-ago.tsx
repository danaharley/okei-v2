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

      if (timeDifference < minute) {
        setTimeAgo("a few seconds ago");
      } else if (timeDifference < hour) {
        const minutes = Math.floor(timeDifference / minute);
        setTimeAgo(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
      } else if (timeDifference < day) {
        const hours = Math.floor(timeDifference / hour);
        setTimeAgo(`${hours} hour${hours > 1 ? "s" : ""} ago`);
      } else if (timeDifference < month) {
        const days = Math.floor(timeDifference / day);
        setTimeAgo(`${days} day${days > 1 ? "s" : ""} ago`);
      } else if (timeDifference < year) {
        const months = Math.floor(timeDifference / month);
        setTimeAgo(`${months} month${months > 1 ? "s" : ""} ago`);
      } else {
        const years = Math.floor(timeDifference / year);
        setTimeAgo(`${years} year${years > 1 ? "s" : ""} ago`);
      }
    };

    updateTimeAgo();

    const interval = setInterval(updateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <span
      className={cn(
        "shrink-0 text-sm font-normal leading-none text-muted-foreground/75",
        className,
      )}
    >
      {timeAgo}
    </span>
  );
};
