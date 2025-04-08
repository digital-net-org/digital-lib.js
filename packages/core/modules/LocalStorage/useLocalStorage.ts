import React from 'react';
import LocalStorage from './LocalStorage';
import { useFirstRender } from '../Effect';

/**
 * Accessor to local storage. It will automatically update the state when the value changes.
 * @param key - local storage key
 * @param defaultValue - value to set if storage is empty
 * @returns state and setter
 */
export default function useLocalStorage<T>(key: string, defaultValue?: T) {
    const [state, setState] = React.useState<T | undefined | null>(LocalStorage.get<T>(key));

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
        LocalStorage.onSet<T>(key, value => setState(value));
        return () => LocalStorage.clearListeners(key);
    }, [key]);

    const handleSetState = (value: T | undefined) =>
        value === undefined ? LocalStorage.remove(key) : LocalStorage.set(key, value);

    return [state as T, handleSetState] as const;
}
