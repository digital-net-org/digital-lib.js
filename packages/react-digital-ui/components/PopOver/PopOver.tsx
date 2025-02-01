import React from 'react';
import type { SafariNodeWithChildren } from '../types';
import { useOnOpen } from './useOnOpen';
import { useAnchor } from './useAnchor';
import { useClassName, useProps } from '../../../react-digital';
import './PopOver.styles.css';

export interface PopOverProps extends SafariNodeWithChildren {
    anchor: HTMLElement | null;
    open: boolean;
    direction?: 'left' | 'right';
    includeAnchor?: boolean;
    onClose: () => void;
    onOpen?: () => void;
}

export default function PopOver({ children, anchor, open, onOpen, onClose, ...props }: PopOverProps) {
    const className = useClassName({ ...props }, 'DigitalUi-PopOver');
    const { mapHtmlProps } = useProps(props);

    const dialogRef = React.useRef(null);
    const placeHolderRef = React.useRef(null);
    const backgroundRef = React.useRef(null);

    useOnOpen(open, anchor, onOpen);
    useAnchor(anchor, placeHolderRef.current, dialogRef.current, { ...props });

    return (
        <React.Fragment>
            {mapHtmlProps(
                <dialog ref={dialogRef} open={open} className={className}>
                    <div ref={placeHolderRef} className="DigitalUi-PopOver-placeholder" />
                    <div className="DigitalUi-PopOver-content">{children}</div>
                </dialog>,
            )}
            {open ? <div ref={backgroundRef} className="DigitalUi-PopOver-background" onClick={onClose} /> : null}
        </React.Fragment>
    );
}
