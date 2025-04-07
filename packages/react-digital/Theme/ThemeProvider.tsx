import React, { createContext, type PropsWithChildren } from 'react';
import { LocalStorage } from '../../core/modules/LocalStorage';

export type ThemeOption = 'dark' | 'light';

export const ThemeContext = createContext({
    theme: undefined as ThemeOption | undefined,
    switchTheme: () => {
        return;
    },
});

export default function ThemeProvider(props: PropsWithChildren) {
    const [value, setValue] = React.useState(LocalStorage.get<ThemeOption>(STORAGE_KEY_THEME));

    React.useEffect(() => {
        LocalStorage.onSet<ThemeOption>(STORAGE_KEY_THEME, theme => setValue(theme));
        LocalStorage.onRemove(STORAGE_KEY_THEME, () => setValue(undefined));
        return () => LocalStorage.clearListeners(STORAGE_KEY_THEME);
    }, []);

    React.useEffect(() => {
        if (value === undefined) {
            const defaultValue = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            LocalStorage.set(STORAGE_KEY_THEME, defaultValue);
        }
    }, [value]);

    React.useEffect(() => (value ? document.documentElement.setAttribute(STORAGE_KEY_THEME, value) : void 0), [value]);

    const switchTheme = React.useCallback(() => {
        LocalStorage.set(STORAGE_KEY_THEME, value === 'light' ? 'dark' : 'light');
    }, [value]);

    return <ThemeContext.Provider {...props} value={{ theme: value, switchTheme }} />;
}
