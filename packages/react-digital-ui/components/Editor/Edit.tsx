import React, { type PropsWithChildren } from 'react';
import type { Entity } from '../../../core';
import { Box } from '../../../react-digital-ui';
import { useClassName } from '../../../react-digital';
import EditActions, { type EditActionsProps } from './EditActions';

export interface EditProps<T extends Entity> extends EditActionsProps {
    entity: T | undefined;
    renderName?: (e: T) => string;
    isLoading?: boolean;
    disabled?: boolean;
    isModified?: boolean;
}

export default function Edit<T extends Entity>({
    children,
    entity,
    actions,
    renderName,
    isModified,
    ...state
}: PropsWithChildren<EditProps<T>>) {
    const className = useClassName({}, 'Edit');

    return (
        <Box className={className}>
            <Box className={`${className}-State`}>
                <Box />
                <Box>
                    {entity ? (renderName?.(entity) ?? entity.id) : null}
                    {isModified && (
                        <span className="SafariUi-Button-text-modified">
                            &nbsp;(modifié)
                        </span>
                    )}
                </Box>
                <EditActions actions={actions} isModified={isModified} {...state} />
            </Box>
            <Box direction="row" overflow="hidden" fullHeight fullWidth>
                {children}
            </Box>
        </Box>
    );
}
