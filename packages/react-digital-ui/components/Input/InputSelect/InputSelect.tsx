import React from 'react';
import type { ControlledHandler } from '../../types';
import type { SafariInputNode } from '../types';
import { useClassName } from '../../../../react-digital';
import useInputRef from '../useInputRef';
import './InputSelect.styles.css';
import InputBox from '../InputBox';

export interface InputSelectProps<T = any> extends SafariInputNode {
    value: T | undefined;
    options: Array<T>;
    onAccess: (value: T) => string;
    onRender: (value: T | undefined) => React.ReactNode;
    onChange: ControlledHandler<T | undefined>;
    onSelect?: ControlledHandler<T>;
    onBlur?: ControlledHandler<T>;
}

export default function InputSelect<T>({
    className,
    name,
    label,
    onAccess,
    onRender,
    onChange,
    ...props
}: InputSelectProps<T>) {
    const ref = useInputRef<HTMLSelectElement>(props);
    const resolvedClassName = useClassName(props, 'SafariUi-InputSelect');

    const options = React.useMemo(
        () => [...props.options, ...(!props.required ? [undefined] : [])],
        [props.options, props.required],
    );

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (props.loading) {
            return;
        }
        const resolved = props.options.find(opt => onAccess(opt) === e.currentTarget.value);
        onChange(resolved);
    };

    return (
        <InputBox
            id={props.id}
            className={className}
            label={label}
            {...props}
        >
            <div className={resolvedClassName}>
                <label>
                    <select
                        ref={ref}
                        value={props.value ? onAccess(props.value) : 'null'}
                        onChange={handleChange}
                        name={name}
                        disabled={props.disabled || props.loading}
                    >
                        {options.map(option => (
                            <option
                                key={option ? onAccess(option) : 'null'}
                                value={option ? onAccess(option) : 'null'}
                            >
                                {onRender(option)}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </InputBox>
    );
}
