import React from 'react';
import { Avatar, InputNavButton } from '../../../../react-digital-ui';
import { useUser } from '../../../User';
import { useLocalization } from '../../../Localization';

export default function UserActions() {
    const { translate } = useLocalization();
    const { isLoading, logout, username } = useUser();

    const options = React.useMemo(
        () => [
            {
                label: translate('global:actions.auth.logout'),
                callback: logout,
            },
        ],
        [logout, translate]
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
