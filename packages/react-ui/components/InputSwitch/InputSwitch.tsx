import React from 'react';
import type { SafariInputNode } from '../types';
import { useClassName, useProps } from '../../../react-digital';
import './InputSwitch.styles.css';

export interface InputSwitchProps extends SafariInputNode {
    name?: string;
    value: boolean;
    onChange: (checked: boolean) => void;
}

export default function InputSwitch({ id, ...props }: InputSwitchProps) {
    const className = useClassName(props, 'SafariUi-InputSwitch');
    const { mapHtmlProps } = useProps(props);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (props.disabled || props.loading) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div id={id} className={className}>
            <label className="SafariUi-InputSwitch-label" htmlFor={props.name}>
                {mapHtmlProps(
                    <input
                        id={props.name}
                        className="SafariUi-InputSwitch-input"
                        type="checkbox"
                        value={JSON.stringify(props.value)}
                        checked={props.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.checked)}
                        onClick={handleClick}
                    />,
                )}
                <span className="SafariUi-InputSwitch-slider"></span>
            </label>
        </div>
    );
}
