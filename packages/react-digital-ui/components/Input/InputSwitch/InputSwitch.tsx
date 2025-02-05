import React from 'react';
import type { ControlledState, SafariNode } from '../../types';
import type { BaseInputProps } from '../types';
import { useClassName, useProps } from '../../../../react-digital';
import './InputSwitch.styles.css';

export interface InputSwitchProps extends BaseInputProps, SafariNode, ControlledState<boolean> {
    name?: string;
    defaultChecked?: boolean;
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
                        defaultChecked={props.defaultChecked}
                    />,
                )}
                <span className="DigitalUi-InputSwitch-slider"></span>
            </label>
        </div>
    );
}
