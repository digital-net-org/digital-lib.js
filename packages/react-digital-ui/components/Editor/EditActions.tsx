import React from 'react';
import { type Icon, Box, Button } from '../../../react-digital-ui';
import type { ValueOf } from '../../../core';

export interface EditActionsProps {
    actions?: Array<{
        action: () => void;
        icon: ValueOf<typeof Icon>;
        disabled?: boolean;
        formId?: string;
    }>;
    isLoading?: boolean;
    disabled?: boolean;
}

export default function EditActions({ isLoading, actions, disabled }: EditActionsProps) {
    return (
        <Box direction="row" align="center" gap={1} p={1}>
            {(actions ?? []).map(({ action, disabled: isActionDisabled, icon, formId }) => (
                <React.Fragment key={icon.name}>
                    <Button
                        form={formId}
                        type={formId ? 'submit' : 'button'}
                        variant="icon"
                        disabled={disabled || isActionDisabled || isLoading}
                        loading={isLoading}
                        onClick={action}
                    >
                        {React.createElement(icon, {
                            variant: 'outlined',
                            size: 'small',
                            color: 'text',
                        })}
                    </Button>
                </React.Fragment>
            ))}
        </Box>
    );
}
