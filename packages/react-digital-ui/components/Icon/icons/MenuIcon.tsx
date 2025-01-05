import React from 'react';
import BaseIcon, { type IconProps } from '../BaseIcon';

export const MenuIcon = (props: IconProps) => (
    <BaseIcon {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </BaseIcon>
);
