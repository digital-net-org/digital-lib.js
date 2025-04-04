import React from 'react';
import { type UserModel } from '../../../../dto';
import { Avatar, InputNavButton } from '../../../../react-digital-ui';
import { useDigitalUser } from '../../../../react-digital-user';
import { useGetById } from '../../../../react-digital-client';
import { Localization } from '../../../Localization';

export default function UserActions() {
    const { logout, id } = useDigitalUser();
    const { isQuerying, entity } = useGetById<UserModel>(`${CORE_API_URL}/user`, id);

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
            loading={isQuerying}
            direction="right"
        >
            {entity?.username}
        </InputNavButton>
    );
}
