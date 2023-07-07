import React from 'react';

type ProgressionBarProps = {
    size?: 'small',
    value: number
}

const colorIndicator = (progression: number) => {
    if (progression >= 0 && progression <= 32) {
        return 'bg-primary-danger';
    }
    if (progression >= 33 && progression <= 66) {
        return 'bg-primary-attention';
    }
    return 'bg-primary-good';
};

export const ProgressionBar: React.FC<ProgressionBarProps> = ({ size, value }) => {
    const colorClass = colorIndicator(value);

    return (
        <div className={`relative h-4 max-w-[119px] ${!size && 'md:h-8 md:max-w-[275px]'} bg-main-grey dark:bg-main-grey rounded-r-rounder border border-primary-dark drop-shadow-progressbar`}>
            <div className={`h-[14px] max-w-[119px] ${!size && 'md:h-[30px] md:max-w-[275px]'} ${colorClass} pr-2`} style={{ width: `${value}%` }}>
                <p className={`absolute right-3 text-xs font-bold ${!size && 'md:text-xl'}`}>{value}%</p>
            </div>
        </div>
    );
};
