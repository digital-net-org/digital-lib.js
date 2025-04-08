import React from 'react';
import { type InputNavProps, InputNav, Text } from '../../../../../react-digital-ui';

export interface PanelNavProps extends InputNavProps {
    label: string;
}

export default function PanelNav({ label, ...navProps }: PanelNavProps) {
    return (
        <React.Fragment>
            <Text size="xsmall" variant="caption" className="DigitalUi-AppSettings-NavSection">
                {label}
            </Text>
            <InputNav gap={1} {...navProps} />
        </React.Fragment>
    );
}
