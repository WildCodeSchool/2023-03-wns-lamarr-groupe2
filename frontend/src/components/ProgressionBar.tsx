import React from "react";

type ProgressionBarProps = {
  size?: "small";
  value: number;
};

const colorIndicator = (progression: number, type: boolean) => {
  if (progression >= 0 && progression <= 32) {
    return "bgDanger";
  }
  if (progression >= 33 && progression <= 66) {
    return "bgAttention";
  }
  return "bgGood";
};

export const ProgressionBar: React.FC<ProgressionBarProps> = ({
  size,
  value,
}) => {
  const colorClass = colorIndicator(value, false);

  return (
    <div
      className={`relative h-4 max-w-[119px] ${
        !size && "md:h-8 md:max-w-[275px]"
      } bg-white dark:bg-white rounded-r-rounder border border-primary-dark drop-shadow-progressbar`}
    >
      <div
        className={`h-[14px] max-w-[119px] ${
          !size && "md:h-[30px] md:max-w-[275px]"
        } ${colorClass} pr-2 rounded-r-rounder`}
        style={{ width: `${value}%` }}
      >
        <p
          className={`absolute right-3 text-small-p font-bold ${
            !size && "md:text-main-p"
          }`}
        >
          {value}%
        </p>
      </div>
    </div>
  );
};

export const ProgressionAdminBar: React.FC<ProgressionBarProps> = ({
  size,
  value,
}) => {
  const strokeWidth = 8;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  const remaining = circumference - progress;

  return (
    <div className="flex justify-center items-center h-screen ">
      <svg className="w-36 h-36 " viewBox={`0 0 100 100`}>
        <circle
          className="stroke-main-grey  drop-shadow-progressbar"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          strokeOpacity={1}
          fill="transparent"
          strokeDasharray={circumference}
        />
        <circle
          className={`${
            value >= 0 && value <= 32
              ? "strokeDanger"
              : value >= 33 && value <= 66
              ? "strokeAttention"
              : "strokeGood"
          }`}
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={remaining}
          strokeLinecap="round"
        />
        <text
          className="text-center text-sm"
          x="52"
          y="52"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
};
