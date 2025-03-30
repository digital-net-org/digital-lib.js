import React, { type PropsWithChildren } from 'react';
import type { UserModel } from '../../../dto';
import { useDigitalUser } from '../../../react-digital-user';
import { useGetById } from '../../../react-digital-client';
import { useDigitalRouter } from '../../../react-digital';
import { AppBar } from './AppBar';
import './fontsources';
import './digital-net.default.css';
import './App.styles.css';

export interface AppProps extends PropsWithChildren {}

export default function App({ children }: AppProps) {
    const { current } = useDigitalRouter();
    const { isLogged, logout, id } = useDigitalUser();
    const { isQuerying, entity } = useGetById<UserModel>(`${CORE_API_URL}/user`, id);

    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

    return (
        <main className="Page">
            {isLogged && !current?.isPublic && (
                <AppBar
                    user={entity}
                    isLoading={isQuerying}
                    onLogout={logout}
                    onSettings={() => setIsSettingsOpen(true)}
                />
            )}
            {children}
        </main>
    );
}
