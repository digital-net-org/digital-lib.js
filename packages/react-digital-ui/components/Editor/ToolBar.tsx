import React from 'react';
import type { ValueOf } from '../../../core';
import { useClassName } from '../../../react-digital';
import { Box, Button, type Icon } from '../../../react-digital-ui';

export interface ToolBarProps {
    tools?: Array<{
        id: string;
        onSelect: (id: string) => void;
        selected: boolean;
        icon: ValueOf<typeof Icon>;
        isDefault?: boolean;
    }>;
    disabled?: boolean;
}

export default function ToolBar({ tools, disabled }: ToolBarProps) {
    const className = useClassName({}, 'ToolBar');

    return tools && tools.length > 0
        ? (
                <Box className={className} fullHeight>
                    <Box direction="column" gap={1} fullHeight>
                        {tools.map(({ id, icon, onSelect, selected, isDefault }, i) => (
                            <React.Fragment key={id}>
                                <Button
                                    variant="icon"
                                    selected={selected}
                                    onClick={() => onSelect(id)}
                                    disabled={disabled}
                                >
                                    {React.createElement(icon, {
                                        variant: 'outlined',
                                        size: 'small',
                                        color: 'text',
                                    })}
                                </Button>
                                {isDefault && tools[i + 1]?.isDefault === false
                                    ? <Box className={`${className}-separator`} />
                                    : null}
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
            )
        : null;
}
