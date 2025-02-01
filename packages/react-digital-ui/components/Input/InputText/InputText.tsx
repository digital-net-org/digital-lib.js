import React from 'react';
import type { ControlledHandler } from '../../types';
import type { SafariInputNode } from '../types';
import { Icon } from '../../Icon';
import useInputPattern, { type InputPatternProps } from '../useInputPattern';
import useInputRef from '../useInputRef';
import InputBox from '../InputBox';
import './InputText.styles.css';

export interface InputTextProps extends SafariInputNode, InputPatternProps {
    value: string;
    onChange: ControlledHandler<string>;
    onSelect?: ControlledHandler<string>;
    onBlur?: ControlledHandler<string>;
    type?: 'text' | 'password' | 'email';
}

export default function InputText({ type = 'text', pattern, patternMessage, name, label, ...props }: InputTextProps) {
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
        props.onSelect?.(props.value);
        setSelected(true);
    };

    const handleBlur = () => {
        props.onBlur?.(props.value);
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
