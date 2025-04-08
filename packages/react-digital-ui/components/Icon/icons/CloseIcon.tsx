import React from 'react';
import BaseIcon, { type IconProps } from '../BaseIcon';

export const CloseIcon = (props: IconProps) => (
    <BaseIcon {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 1024 1024">
            <path d="M215 215a48 48 0 0 1 68 0L512 444l229-229a48 48 0 0 1 68 68L580 512l229 229a48 48 0 0 1-68 68L512 580 283 809a48 48 0 0 1-68-68L444 512 215 283a48 48 0 0 1 0-68z" />
        </svg>
    </BaseIcon>
);
