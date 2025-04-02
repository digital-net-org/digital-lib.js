import React from 'react';
import { Button } from '../../Button';
import { PopOver } from '../../PopOver';
import { InputNav, type InputNavProps } from '../InputNav';

export interface InputNavButtonProps
    extends Omit<InputNavProps, 'textDirection' | 'direction'>,
        React.PropsWithChildren {
    loading?: boolean;
    direction?: 'left' | 'right';
    icon: React.ReactNode;
}

export default function InputNavButton({ loading, direction, icon, children, ...props }: InputNavButtonProps) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const handleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <React.Fragment>
            <Button ref={buttonRef} variant="icon" onClick={handleMenu} selected={isMenuOpen} loading={loading}>
                {direction === 'left' && icon}
                {isMenuOpen && <span>{children}</span>}
                {direction === 'right' && icon}
            </Button>
            <PopOver
                anchor={buttonRef.current}
                open={isMenuOpen}
                onClose={handleMenu}
                direction={direction}
                includeAnchor
            >
                <InputNav gap={1} {...props} />
            </PopOver>
        </React.Fragment>
    );
}
