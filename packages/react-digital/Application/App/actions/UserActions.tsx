import React from 'react';
import { Avatar, InputNavButton } from '@digital-lib/react-digital-ui';
import { Localization } from '../../../Localization';
import { useUser } from '../../../User';

export function UserActions() {
    const { isLoading, logout, username } = useUser();

    const options = React.useMemo(
        () => [
            {
                label: Localization.translate('global:actions.auth.logout'),
                callback: logout,
            },
        ],
        [logout]
    );

    return (
        <InputNavButton
            options={options.map(({ label }) => label)}
            onSelect={label => options.find(x => x.label === label)?.callback()}
            icon={<Avatar size="small" />}
            loading={isLoading}
            direction="right"
        >
            {username}
        </InputNavButton>
    );
}
