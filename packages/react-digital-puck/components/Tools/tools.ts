import type React from 'react';
import type { ValueOf } from '../../../core';
import { Icon } from '../../../react-digital-ui';
import Selector from './Selector';
import Components from './Components';
import Tree from './Tree';

export interface Tool {
    component: React.FunctionComponent<any>;
    id: 'model-selector' | 'tree' | 'components';
    icon: ValueOf<typeof Icon>;
    isDefault: boolean;
};

export const tools: Array<Tool> = [
    {
        component: Selector,
        id: 'model-selector',
        icon: Icon.FolderIcon,
        isDefault: true,
    },
    {
        component: Components,
        id: 'components',
        icon: Icon.DiamondIcon,
        isDefault: false,
    },
    {
        component: Tree,
        id: 'tree',
        icon: Icon.DiagramIcon,
        isDefault: false,
    },
];
