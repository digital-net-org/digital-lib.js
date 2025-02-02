import React from 'react';
import { useUrlParams } from '../../react-digital';
import { Tools } from './Tools';

export default function usePuckUrlState() {
    const [urlState, setUrlState] = useUrlParams();

    const dispatchUrlState = React.useCallback((
        action: 'setEntity' | 'setTool' | 'reset',
        payload?: string | number | undefined,
    ) => {
        if (action === 'reset') {
            return setUrlState({ entity: undefined, tool: Tools.find(e => e.isDefault)?.id });
        }
        const value = payload ? String(payload) : undefined;
        const accessor = action.split('set')[1].toLowerCase();
        setUrlState(prev => ({ ...prev, [accessor]: prev[accessor] === value ? undefined : value }));
    }, [setUrlState]);

    const currentTool = React.useMemo(() => Tools.find(e => e.id === urlState.tool), [urlState.tool]);

    const currentEntity = React.useMemo(() => urlState.entity, [urlState.entity]);

    return {
        dispatchUrlState,
        currentEntity,
        currentTool,
    };
}
