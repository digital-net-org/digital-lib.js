import { type ValueOf } from '../../../core';
import { Icon } from '../../../react-digital-ui';
import Tree from './Tree';
import Components from './Components';
import Selector from './Selector';

export interface Tool {
    id: 'model-selector' | 'tree' | 'components';
    icon: ValueOf<typeof Icon>;
    isDefault: boolean;
}

export const Tools = Object.assign(
    [
        {
            id: 'model-selector' as const,
            icon: Icon.FolderIcon,
            isDefault: true,
        },
        {
            id: 'components' as const,
            icon: Icon.DiamondIcon,
            isDefault: false,
        },
        {
            id: 'tree' as const,
            icon: Icon.DiagramIcon,
            isDefault: false,
        },
    ],
    {
        Tree,
        Components,
        Selector,
    },
);
