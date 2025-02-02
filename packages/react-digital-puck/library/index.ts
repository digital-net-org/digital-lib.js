import { type Config } from '@measured/puck';
import { categories } from './categories';
import { Box, Paragraph } from './components';

export const config: Config = {
    categories,
    components: {
        Box,
        Paragraph,
    },
};
