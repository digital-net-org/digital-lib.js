import React from 'react';
import { Icon } from '../../Icon';
import { type ControlledState } from '../../types';
import InputBox from '../InputBox';
import { type SafariInputNode } from '../types';
import useInputPattern, { type InputPatternProps } from '../useInputPattern';
import useInputRef from '../useInputRef';
import './InputText.styles.css';
import { useClassName } from '@digital-lib/core';

export interface InputTextProps extends SafariInputNode, InputPatternProps, ControlledState<string | undefined> {
    onSelect?: () => void;
    onBlur?: () => void;
    type?: 'text' | 'password' | 'email';
    disableAdornment?: boolean;
}

export default function InputText({
    type = 'text',
    pattern,
    patternMessage,
    name,
    label,
    disableAdornment,
    ...props
}: InputTextProps) {
    const className = useClassName(props, 'DigitalUi-InputText');
    const [selected, setSelected] = React.useState(false);
    const [hidden, setHidden] = React.useState(type === 'password');
    const ref = useInputRef<HTMLInputElement>(props);

    const { handleChange, handleError, handleInvalid, error } = useInputPattern({ ...props, pattern, patternMessage });

    const resolvedType = React.useMemo(() => {
        if (type !== 'password') {
            return type;
        }
        return hidden ? 'password' : 'text';
    }, [hidden, type]);

    const handleSelect = () => {
        props.onSelect?.();
        setSelected(true);
    };

    const handleBlur = () => {
        props.onBlur?.();
        setSelected(false);
    };

    const handleHidden = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setHidden(!hidden);
    };

    return (
        <InputBox id={props.id} label={label} error={error} selected={selected} {...props}>
            <div className={className}>
                <input
                    ref={ref}
                    value={props.value}
                    name={name}
                    pattern={pattern}
                    disabled={props.disabled}
                    type={resolvedType}
                    onChange={handleChange}
                    onSelect={handleSelect}
                    onBlur={handleBlur}
                    onError={handleError}
                    onInvalid={handleInvalid}
                />
                {type === 'password' && !disableAdornment && (
                    <button onClick={handleHidden} type="button" disabled={props.disabled}>
                        {hidden ? <Icon.EyeSlashedIcon variant="filled" /> : <Icon.EyeIcon variant="filled" />}
                    </button>
                )}
            </div>
        </InputBox>
    );
}
