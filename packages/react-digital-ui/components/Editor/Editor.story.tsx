import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../../react-digital-ui';
import Editor, { type EditorProps } from './Editor';

const meta: Meta<EditorProps> = {
    title: 'Editor',
    component: Editor,
};
type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    argTypes: {
        isLoading: { control: { type: 'boolean' } },
        disabled: { control: { type: 'boolean' } },
    },
    args: {
        actions: [
            { action: () => null, disabled: true, icon: Icon.FloppyIcon },
            { action: () => null, disabled: false, icon: Icon.TrashIcon },
        ],
        tools: [
            {
                id: 'model-selector',
                icon: Icon.FolderIcon,
                onSelect: () => null,
                selected: true,
                isDefault: true,
            },
            {
                id: 'something-else',
                icon: Icon.BoxIcon,
                onSelect: () => null,
                selected: false,
            },
        ],
        renderName: () => '0000-0000-0000-0000',
        disabled: false,
        isLoading: false,
    },
};
