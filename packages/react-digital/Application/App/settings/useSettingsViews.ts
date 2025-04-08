import React from 'react';

export interface SettingsViewsProps {
    views: Record<string, React.ReactNode>;
    onLabelTranslation: (key: string) => string;
    defaultKey: string;
}

export default function useSettingsViews({ views, defaultKey }: Omit<SettingsViewsProps, 'onLabelTranslation'>) {
    const [selected, setSelected] = React.useState<keyof typeof views>(defaultKey);

    const keys = React.useMemo(() => Object.keys(views), [views]);

    const renderView = React.useCallback(() => (views[selected] ? views[selected] : null), [selected, views]);

    return {
        value: selected,
        options: keys,
        onSelect: setSelected,
        renderView,
    };
}
