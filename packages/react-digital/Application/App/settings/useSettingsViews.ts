import React from 'react';
import { type RenderSettingsViews } from './AppSettings';

export interface SettingsViewsProps {
    views: RenderSettingsViews;
    onLabelTranslation: (key: string) => string;
    defaultKey: string;
}

export type SettingsViews = Array<{ options: Array<string>; label: string }>;

export default function useSettingsViews({ views, defaultKey }: Omit<SettingsViewsProps, 'onLabelTranslation'>) {
    const [selected, setSelected] = React.useState<keyof typeof views>(defaultKey);

    const navProps = React.useMemo(
        () =>
            Object.entries(views).reduce((acc, [key, { label }]) => {
                const existingEntry = acc.find(entry => entry.label === label);
                if (existingEntry) {
                    existingEntry.options.push(key);
                } else {
                    acc.push({ options: [key], label });
                }
                return acc;
            }, [] as SettingsViews),
        [views]
    );

    const renderView = React.useCallback(() => (views[selected] ? views[selected].view : null), [selected, views]);

    return {
        value: selected,
        onSelect: setSelected,
        navProps,
        renderView,
    };
}
