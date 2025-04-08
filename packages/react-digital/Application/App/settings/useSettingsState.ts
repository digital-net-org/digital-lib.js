import React from 'react';
import { Localization } from '../../../Localization';
import { UserView, PreferencesView } from './views';

const views = {
    Preferences: PreferencesView,
    User: UserView,
};

const keys = Object.keys(views);

export default function useSettingsState() {
    const [selected, setSelected] = React.useState<string>('Preferences');

    const renderLabel = React.useCallback(
        (value?: string) =>
            Localization.translate(
                `app:settings.menu.${(value ? (keys.find(x => x == value) ?? '') : selected).toLowerCase()}`
            ),
        [selected]
    );

    const renderView = React.useCallback(
        () => (views[selected] ? React.createElement(views[selected], {}) : null),
        [selected]
    );

    return {
        value: selected,
        options: keys,
        onSelect: setSelected,
        renderView,
        renderLabel,
    };
}
