import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Loader } from '../Loader';
import { PopOver, type PopOverProps } from '../PopOver';
import { useClassName } from '../../../core';
import './ButtonMenu.styles.css';

export interface MenuAction {
    label: React.ReactNode;
    callback?: () => void;
    selected?: boolean;
}

export interface ButtonMenuProps {
    icon: React.ReactNode;
    actions: MenuAction[];
    label?: string;
    loading?: boolean;
    direction?: PopOverProps['direction'];
}

export default function ButtonMenu({ actions, icon, label, loading, direction = 'left' }: ButtonMenuProps) {
    const className = useClassName({ direction }, 'DigitalUi-ButtonMenu');
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const handleMenu = () => setIsMenuOpen(!isMenuOpen);

    return loading ? (
        <Loader size="small" />
    ) : (
        <React.Fragment>
            <Button ref={buttonRef} variant="icon" onClick={handleMenu} selected={isMenuOpen}>
                {direction === 'left' && icon}
                {isMenuOpen && label && <span>{label}</span>}
                {direction === 'right' && icon}
            </Button>
            <PopOver
                anchor={buttonRef.current}
                open={isMenuOpen}
                onClose={handleMenu}
                direction={direction}
                includeAnchor
            >
                <Box ref={menuRef} className={className}>
                    {actions.map((props, index) =>
                        props.callback === undefined ? (
                            props.label
                        ) : (
                            <Button
                                key={index}
                                variant="text"
                                fullWidth
                                selected={props.selected}
                                align={direction}
                                onClick={() => {
                                    if (props.selected) return;
                                    props.callback?.();
                                    handleMenu();
                                }}
                            >
                                {props.label}
                            </Button>
                        )
                    )}
                </Box>
            </PopOver>
        </React.Fragment>
    );
}
