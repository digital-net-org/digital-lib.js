import React from 'react';
import type { SafariNode } from '../../types';
import type { BaseInputProps } from '../types';
import { useClassName, useProps } from '../../../../react-digital';
import './InputSwitch.styles.css';

export interface InputSwitchProps extends BaseInputProps, SafariNode {
    name?: string;
    value?: boolean;
    onChange?: (value: boolean) => void;
}

export default function InputSwitch({ id, value, onChange, ...props }: InputSwitchProps) {
    const className = useClassName(props, 'DigitalUi-InputSwitch');
    const { mapHtmlProps } = useProps(props);

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        if (props.disabled || props.loading) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const handleChange = (_: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(!value);
    };

    return (
        <div id={id} className={className}>
            <label className="DigitalUi-InputSwitch-label" htmlFor={props.name}>
                {mapHtmlProps(
                    <input
                        id={props.name}
                        className="DigitalUi-InputSwitch-input"
                        name={props.name}
                        type="checkbox"
                        checked={value}
                        onClick={handleClick}
                        onChange={handleChange}
                    />,
                )}
                <span className="DigitalUi-InputSwitch-slider"></span>
            </label>
        </div>
    );
}
