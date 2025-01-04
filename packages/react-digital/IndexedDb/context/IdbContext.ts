import React from 'react';
import { type IDbConfig } from '../types/IDbConfig';

export interface IdbContextState extends IDbConfig {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const defaultIdbConfig: IDbConfig = {
    name: 'null',
    stores: [],
    version: undefined,
};

export const IdbContext = React.createContext<IdbContextState>({
    ...defaultIdbConfig,
    isLoading: false,
    setIsLoading: () => {},
});
