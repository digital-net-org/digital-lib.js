/* eslint react-hooks/rules-of-hooks: 0 */
import React from 'react';
import useWindow from './useWindow';
import { Box } from '../../react-ui/components/Box';
import type { StoryObj } from '@storybook/react';
import { Color } from '../Color';

export default { title: 'Utilities/ReactHooks' };

export const UseWindow: StoryObj = {
    decorators: () => {
        const color = React.useMemo(() => Color.getRandomColor(), []);
        const windowState = useWindow();
        return (
            <React.Fragment>
                <Box color={color} fullWidth fullHeight p={2}>
                    <Box>Element ID: Window</Box>
                    <pre>{JSON.stringify(windowState)}</pre>
                </Box>
            </React.Fragment>
        );
    },
};
