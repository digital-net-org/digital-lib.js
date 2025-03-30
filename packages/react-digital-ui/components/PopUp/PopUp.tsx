import React from 'react';
import { useClassName, useProps } from '../../../core';
import type { SafariNodeWithChildren } from '../types';
// import { useOnOpen } from '../PopOver/useOnOpen';
// import { useAnchor } from '../PopOver/useAnchor';
import './PopUp.styles.css';
import { Box } from '../Box';
import { Button } from '../Button';
import { Icon } from '../Icon';

export interface PopUpProps extends SafariNodeWithChildren {
    title?: string;
    open: boolean;
    onClose: () => void;
}

export default function PopUp({ children, onClose, title, open, ...props }: PopUpProps) {
    const className = useClassName({ ...props }, 'DigitalUi-PopUp');

    return (
        <React.Fragment>
            <dialog open={open} className={className}>
                <Box className="DigitalUi-PopUp-header" direction="row" justify="space-between" align="center">
                    <span>{title}</span>
                    <Button variant="icon" onClick={onClose} critical>
                        <Icon.CloseIcon />
                    </Button>
                </Box>
                <hr />
                <div className="DigitalUi-PopUp-content">{children}</div>
            </dialog>

            {open ? <div className="DigitalUi-PopUp-background" onClick={onClose} /> : null}
        </React.Fragment>
    );
}
