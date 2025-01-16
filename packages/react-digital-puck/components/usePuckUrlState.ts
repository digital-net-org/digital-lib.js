import React from 'react';
import { useUrlParams } from '../../react-digital';
import { type Entity } from '../../core';
import { type PuckUrlState } from '../PuckUrlState';
import { Tools } from './Tools';

export default function usePuckUrlState() {
    const [urlState, setUrlState] = useUrlParams<PuckUrlState>();

    const resetState = React.useCallback(() => {
        setUrlState({ entity: undefined, tool: Tools.find(e => e.isDefault)?.id });
    }, [setUrlState]);

    const selectEntity = React.useCallback((payload: Entity['id']) => {
        const entity = String(payload) === urlState.entity ? undefined : String(payload);
        setUrlState(prev => ({ ...prev, entity }));
    }, [setUrlState, urlState.entity]);

    const selectTool = React.useCallback((payload: PuckUrlState['tool']) => {
        const tool = payload === urlState.tool ? undefined : payload;
        setUrlState(prev => ({ ...prev, tool }));
    }, [setUrlState, urlState.tool]);

    const currentTool = React.useMemo(() => {
        return Tools.find(e => e.id === urlState.tool);
    }, [urlState.tool]);

    const currentEntity = React.useMemo(() => {
        return urlState.entity;
    }, [urlState.entity]);

    return {
        resetState,
        currentEntity,
        currentTool,
        selectEntity,
        selectTool,
    };
}
