import { useLocalStorage } from '@digital-lib/core';

export default function useJwt() {
    return useLocalStorage<string | undefined>(STORAGE_KEY_AUTH);
}
