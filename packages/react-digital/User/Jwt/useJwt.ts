import { useLocalStorage } from '../../../core';

export default function useJwt() {
    return useLocalStorage<string | undefined>(STORAGE_KEY_AUTH);
}
