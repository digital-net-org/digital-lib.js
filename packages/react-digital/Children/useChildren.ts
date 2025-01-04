import React from 'react';

export default function useChildren(children: React.ReactNode) {
    const getByType = React.useCallback(
        (type: React.ElementType, id?: string | null) =>
            React.Children.toArray(children).find(
                c =>
                    React.isValidElement(c)
                    && c.type === type
                    && (id === undefined || id === null || (id && c.props.id === id)),
            ),
        [children],
    );

    const mapByType = React.useCallback(
        (type: React.ElementType, id?: string | null, props?: Record<string, any>) => {
            const child = getByType(type, id);
            if (!React.isValidElement(child)) return null;
            return React.cloneElement(child, props);
        },
        [getByType],
    );

    return { getByType, mapByType };
}
