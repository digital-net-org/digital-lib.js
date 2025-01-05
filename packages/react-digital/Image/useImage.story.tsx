/* eslint react-hooks/rules-of-hooks: 0 */
import React from 'react';
import useImage from './useImage';
import { Box } from '../../react-digital-ui/components/Box';
import type { StoryObj } from '@storybook/react';

export default { title: 'Utilities/ReactHooks' };

export const UseImage: StoryObj = {
    decorators: () => {
        const [src, setSrc] = React.useState<string | undefined>(
            'https://avatars.githubusercontent.com/u/88612813?v=4',
        );
        const { hasError, htmlImage } = useImage(src);
        return (
            <Box>
                <img src={htmlImage?.src} alt="Image" />
                <input type="text" value={src} onChange={e => setSrc(e.target.value)} />
                <p>
                    hasError:
                    {hasError ? 'true' : 'false'}
                </p>
            </Box>
        );
    },
};
