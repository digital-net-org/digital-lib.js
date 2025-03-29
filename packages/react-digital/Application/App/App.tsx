import React, { type PropsWithChildren } from 'react';
import { AppBar, type AppBarProps } from '../AppBar';
import { useDigitalRouter } from '../../../react-digital';
import { useDigitalUser } from '../../../react-digital-user';
import './fontsources';
import './digital-net.default.css';
import './App.styles.css';

export interface AppProps extends PropsWithChildren, AppBarProps {}

export default function App({ children, ...appBarProps }: AppProps) {
    const { current } = useDigitalRouter();
    const { isLogged } = useDigitalUser();

    return (
        <main className="Page">
            {isLogged && !current?.isPublic ? <AppBar {...appBarProps} /> : null}
            {children}
        </main>
    );
}
