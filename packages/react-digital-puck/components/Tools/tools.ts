import type { ValueOf } from '../../../core';
import { Icon } from '../../../react-digital-ui';

export interface Tool {
    id: 'model-selector' | 'tree' | 'components';
    icon: ValueOf<typeof Icon>;
    isDefault: boolean;
};

export const tools: Array<Tool> = [
    {
        id: 'model-selector',
        icon: Icon.FolderIcon,
        isDefault: true,
    },
    {
        id: 'components',
        icon: Icon.DiamondIcon,
        isDefault: false,
    },
    {
        id: 'tree',
        icon: Icon.DiagramIcon,
        isDefault: false,
    },
];
