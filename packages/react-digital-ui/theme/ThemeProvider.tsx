import React, { createContext, type PropsWithChildren } from 'react';
import { LocalStorage } from '../../react-digital';

export type ThemeOption = 'dark' | 'light';

export const ThemeContext = createContext({
    theme: undefined as ThemeOption | undefined,
    switchTheme: () => {},
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

    const switchTheme = () => {
        const newTheme = value === 'light' ? 'dark' : 'light';
        LocalStorage.set(lsKey, newTheme);
    };

    return <ThemeContext.Provider {...props} value={{ theme: value, switchTheme }} />;
}
