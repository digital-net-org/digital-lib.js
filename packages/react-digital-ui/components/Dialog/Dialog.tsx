import React from 'react';
import { useChildren, useClassName } from '../../../core';
import type { SafariNodeWithChildren } from '../types';
import { Button } from '../Button';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { Text } from '../Text';
import './Dialog.styles.css';

export interface DialogProps extends SafariNodeWithChildren {
    open: boolean;
    onClose: () => void;
}

const className = 'DigitalUi-Dialog';

const Header = ({ children }: React.PropsWithChildren) => (
    <Text variant="section-title" className={`${className}-header`}>
        {children}
    </Text>
);
const Panel = ({ children }: React.PropsWithChildren) => <Box className={`${className}-panel`}>{children}</Box>;
const Content = ({ children }: React.PropsWithChildren) => <Box className={`${className}-content`}>{children}</Box>;

function Dialog({ children, className: propsClassName, ...props }: DialogProps) {
    const resolvedClassName = useClassName(props, className);
    const { mapTypeOf } = useChildren(children);
    return (
        <React.Fragment>
            <dialog className={`${resolvedClassName}${propsClassName ? ` ${propsClassName}` : ''}`} {...props}>
                <Box className={`${className}-wrapper`} direction="row">
                    {mapTypeOf(Panel)}
                    <Box className={`${className}-main`}>
                        {mapTypeOf(Header)}
                        {mapTypeOf(Content)}
                    </Box>
                    <Box className={`${className}-actions`} direction="column">
                        <Button variant="icon" onClick={props.onClose} critical>
                            <Icon.CloseIcon />
                        </Button>
                    </Box>
                </Box>
            </dialog>
            {props.open ? <div className={`${className}-background`} onClick={props.onClose} /> : null}
        </React.Fragment>
    );
}

export default Object.assign(Dialog, {
    Header,
    Panel,
    Content,
});
