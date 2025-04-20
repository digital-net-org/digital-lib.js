import React from 'react';
import { Icon } from '../Icon';
import Button, { type ButtonProps } from './Button';

type IconVariant = keyof typeof Icon;

export interface IconButtonProps extends Omit<ButtonProps, 'variant' | 'children'> {
    variant?: 'icon' | 'icon-filled' | 'icon-bordered';
    icon: IconVariant;
}

export default function IconButton({ variant = 'icon', icon, ...props }: IconButtonProps) {
    return (
        <Button variant={variant} {...props}>
            {icon ? React.createElement(Icon[icon], { size: 'small' }) : null}
        </Button>
    );
}
