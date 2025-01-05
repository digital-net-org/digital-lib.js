import React from 'react';
import { useLocalStorage } from '../../react-digital';
import type { StoredDigitalUser } from './StoredDigitalUser';

export default function useStoredDigitalUser(accessor: string) {
    const [storedUser, setStoredUser] = useLocalStorage<StoredDigitalUser>(accessor);
    const deleteStoredUser = React.useCallback(
        () => setStoredUser({}),
        [setStoredUser],
    );
    const updateStoredUser = React.useCallback(
        (user: StoredDigitalUser) => setStoredUser(user),
        [setStoredUser],
    );
    return { storedUser, deleteStoredUser, updateStoredUser };
}
