import React from 'react';

export interface DevToolContextState {
    isActive: boolean | undefined;
    setIsActive: (isActive: boolean) => void;
}

export const defaultDevToolConfig: DevToolContextState = {
    isActive: false,
    setIsActive: () => {},
};

export const DevToolContext = React.createContext<DevToolContextState>({
    ...defaultDevToolConfig,
});
