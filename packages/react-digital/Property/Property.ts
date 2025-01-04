import React from 'react';

export default class Property {
    /**
     * Map properties to children.
     * @param children - The children to map
     * @param properties - The properties to map
     * @returns The mapped children
     */
    public static mapProps(children: React.ReactNode, properties: Record<string, unknown>) {
        const mapChild = (child: React.ReactNode): React.ReactNode => {
            if (!React.isValidElement(child)) return child;
            return child.type === React.Fragment
                ? React.cloneElement(child, { key: child.key }, React.Children.map(child.props.children, mapChild))
                : React.cloneElement(child, { ...properties, key: child.key });
        };
        return React.Children.map(children, mapChild);
    }

    /**
     * Convert JSX props to HTML props.
     * @param props - The props to convert
     * @returns The converted props
     */
    public static toHtml(props: Record<string, unknown>) {
        for (const key in { ...props }) {
            if (typeof props[key] === 'boolean' && props[key] === true) {
                props[key] = '';
            }
            if (typeof props[key] === 'boolean' && props[key] !== true) {
                delete props[key];
                continue;
            }
            if (!/(class|on)([A-Z]).*/g.test(key) && /([a-z0-9])([A-Z])/g.test(key)) {
                props[key.toLowerCase()] = props[key];
                delete props[key];
            }
        }
        return props;
    }
}
