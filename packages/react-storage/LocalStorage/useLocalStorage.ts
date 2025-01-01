import React from 'react';
import LocalStorage from './LocalStorage';
import { useFirstRender } from '../../react-elements';

/**
 * Accessor to local storage. It will automatically update the state when the value changes.
 * @param key - local storage key
 * @returns state and setter
 */
export default function useLocalStorage<T>(key: string, defaultValue?: T) {
    const [state, setState] = React.useState<T | undefined>();

    useFirstRender(() => {
        const currentValue = LocalStorage.get<T>(key);
        if ((currentValue === null || currentValue === undefined) && defaultValue !== undefined) {
            LocalStorage.set(key, defaultValue);
            setState(defaultValue);
        } else {
            setState(currentValue);
        }
    });

    React.useEffect(() => {
        LocalStorage.onSet<T>(key, value => value !== undefined ? setState(value) : void 0);
        return () => LocalStorage.clearListeners(key);
    }, [key]);

    return [state as T, (value: T) => LocalStorage.set(key, value)] as const;
}
