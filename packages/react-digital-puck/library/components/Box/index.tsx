import { type Config } from '@measured/puck';
import BoxComponent from './BoxComponent';

export default {
    render: ({ puck: { renderDropZone } }) => <BoxComponent>{renderDropZone({ zone: 'page-content' })}</BoxComponent>,
} satisfies Config['components']['key'];
