import React from 'react';
import type { SafariNode } from '../../types';
import type { BaseInputProps } from '../types';
import { useClassName, useProps } from '../../../../react-digital';
import './InputSwitch.styles.css';

export interface InputSwitchProps extends BaseInputProps, SafariNode {
    name?: string;
    value: boolean;
    onChange: (checked: boolean) => void;
}

export default function InputSwitch({ id, ...props }: InputSwitchProps) {
    const className = useClassName(props, 'DigitalUi-InputSwitch');
    const { mapHtmlProps } = useProps(props);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (props.disabled || props.loading) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div id={id} className={className}>
            <label className="DigitalUi-InputSwitch-label" htmlFor={props.name}>
                {mapHtmlProps(
                    <input
                        id={props.name}
                        className="DigitalUi-InputSwitch-input"
                        type="checkbox"
                        value={JSON.stringify(props.value)}
                        checked={props.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.checked)}
                        onClick={handleClick}
                    />,
                )}
                <span className="DigitalUi-InputSwitch-slider"></span>
            </label>
        </div>
    );
}
