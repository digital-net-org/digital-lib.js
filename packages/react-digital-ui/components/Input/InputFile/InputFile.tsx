import React from 'react';
import { StringResolver, useClassName } from '@digital-lib/core';
import { Localization } from '@digital-lib/react-digital/Localization';
import type { ControlledHandler } from '../../types';
import { IconButton } from '../../Button';
import { Box } from '../../Box';
import { Text } from '../../Text';
import type { SafariInputNode } from '../types';
import type { MimeType } from './types';
import InputBox from '../InputBox';
import './InputFile.styles.css';
import { Loader } from '@digital-lib/react-digital-ui';

export interface InputFileProps extends SafariInputNode {
    value: Array<File> | undefined;
    onChange: ControlledHandler<Array<File> | undefined>;
    accept?: Array<MimeType>;
    multiple?: boolean;
}

const baseClassName = 'DigitalUi-InputFile';

export default function InputFile({ className, name, label, value, onChange, ...props }: InputFileProps) {
    const resolvedClassName = useClassName(props, baseClassName);
    const ref = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (!ref.current) {
            return;
        }
        const data = new DataTransfer();
        if (!value) {
            ref.current.files = data.files;
            return;
        }
        for (const file of value) {
            data.items.add(file);
        }
        ref.current.files = data.files;
    }, [value]);

    const resolvedFileName = React.useMemo(() => {
        const name = value?.[0].name;
        if (!name) {
            return Localization.translate('ui-input:file.empty');
        }
        return StringResolver.truncateWithEllipsis(name, 28);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.loading || props.disabled) {
            return;
        }
        const resolved: Array<File> = [];
        for (const file of e.target.files ?? []) {
            resolved.push(file);
        }
        onChange(resolved.length > 0 ? resolved : undefined);
    };

    const handleClick = () => {
        if (props.loading || props.disabled) {
            return;
        }
        if (ref.current) {
            ref.current.click();
        }
    };

    const handleDelete = () => onChange(undefined);

    return (
        <InputBox id={props.id} className={baseClassName + className ? ` ${className}` : ''} label={label} {...props}>
            <div className={resolvedClassName}>
                <label className={`${baseClassName}-label`} htmlFor={name} onClick={handleClick}>
                    <Text size="small">{resolvedFileName}</Text>
                </label>
                <input
                    className={`${baseClassName}-input`}
                    ref={ref}
                    type="file"
                    name={name}
                    onChange={handleChange}
                    disabled={props.disabled || props.loading}
                    multiple={props.multiple}
                />
                {props.loading ? (
                    <Loader size="small" />
                ) : (
                    <Box direction="row" align="center" gap={1}>
                        {(value?.length ?? 0) > 0 ? (
                            <IconButton variant="icon-filled" icon="CloseIcon" onClick={handleDelete} critical />
                        ) : null}
                        <IconButton variant="icon-filled" icon="AddFileIcon" onClick={handleClick} />
                    </Box>
                )}
            </div>
        </InputBox>
    );
}
