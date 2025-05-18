import React from 'react';
import { Icon } from '../Icon';
import { Button, type ButtonProps } from './Button';

type IconVariant = keyof typeof Icon;

export interface IconButtonProps extends Omit<ButtonProps, 'variant' | 'children'> {
    variant?: 'icon' | 'icon-filled' | 'icon-bordered';
    icon: IconVariant;
}

export const IconButton = React.forwardRef<HTMLElement, IconButtonProps>(
    ({ variant = 'icon', icon, ...props }, ref) => {
        return (
            <Button variant={variant} ref={ref} {...props}>
                {icon ? React.createElement(Icon[icon], { size: 'small' }) : null}
            </Button>
        );
    }
);
