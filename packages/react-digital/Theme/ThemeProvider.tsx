import React, { createContext, type PropsWithChildren } from 'react';
import { LocalStorage } from '../LocalStorage';

export type ThemeOption = 'dark' | 'light';

export const ThemeContext = createContext({
    theme: undefined as ThemeOption | undefined,
    switchTheme: () => {
        return;
    },
});

const lsKey = 'data-theme';

export default function ThemeProvider(props: PropsWithChildren) {
    const [value, setValue] = React.useState(LocalStorage.get<ThemeOption>(lsKey));

    React.useEffect(() => {
        LocalStorage.onSet<ThemeOption>(lsKey, theme => setValue(theme));
        LocalStorage.onRemove(lsKey, () => setValue(undefined));
        return () => LocalStorage.clearListeners(lsKey);
    }, []);

    React.useEffect(() => {
        if (value === undefined) {
            const defaultValue = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            LocalStorage.set(lsKey, defaultValue);
        }
    }, [value]);

    React.useEffect(() => (value ? document.documentElement.setAttribute(lsKey, value) : void 0), [value]);

    const switchTheme = React.useCallback(() => {
        LocalStorage.set(lsKey, value === 'light' ? 'dark' : 'light');
    }, [value]);

    return <ThemeContext.Provider {...props} value={{ theme: value, switchTheme }} />;
}
