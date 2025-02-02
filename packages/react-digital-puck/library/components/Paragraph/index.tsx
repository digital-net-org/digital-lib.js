import { type Config } from '@measured/puck';
import ParagraphComponent from './ParagraphComponent';

export default {
    fields: {
        content: {
            type: 'textarea',
            label: 'Content',
        },
    },
    render: ({ content }) => <ParagraphComponent>{content}</ParagraphComponent>,
} satisfies Config['components']['key'];
