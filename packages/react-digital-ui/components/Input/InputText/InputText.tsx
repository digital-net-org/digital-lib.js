import React from 'react';
import { type ControlledState } from '../../types';
import { type SafariInputNode } from '../types';
import { Icon } from '../../Icon';
import useInputPattern, { type InputPatternProps } from '../useInputPattern';
import useInputRef from '../useInputRef';
import InputBox from '../InputBox';
import './InputText.styles.css';

export interface InputTextProps extends SafariInputNode, InputPatternProps, ControlledState<string> {
    onSelect?: () => void;
    onBlur?: () => void;
    type?: 'text' | 'password' | 'email';
    defaultValue?: string;
}

export default function InputText(
    {
        type = 'text',
        pattern,
        patternMessage,
        name,
        label,
        ...props
    }: InputTextProps,
) {
    const [selected, setSelected] = React.useState(false);
    const [hidden, setHidden] = React.useState(type === 'password');
    const ref = useInputRef<HTMLInputElement>(props);

    const {
        handleChange,
        handleError,
        handleInvalid,
        error,
    } = useInputPattern({ ...props, pattern, patternMessage });

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
        <InputBox
            id={props.id}
            label={label}
            error={error}
            selected={selected}
            {...props}
        >
            <div className="DigitalUi-InputText">
                <input

                    ref={ref}
                    value={props.value}
                    defaultValue={props.defaultValue}
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
                {type === 'password' && (
                    <button onClick={handleHidden} type="button">
                        {hidden ? <Icon.EyeSlashedIcon variant="filled" /> : <Icon.EyeIcon variant="filled" />}
                    </button>
                )}
            </div>
        </InputBox>
    );
}
