import React from 'react';
import { Box } from '../Box';
import { InputText, type InputTextProps } from '../Input';
import type { ControlledHandler } from '../types';
import { useClassName } from '../../../react-digital';
import './Form.styles.css';

export interface FormFieldProps extends Omit<InputTextProps, 'value' | 'onChange'> {
    value: string;
    onChange: ControlledHandler<string>;
    label?: string;
}

const FormField = React.forwardRef(
    ({ label, type, className, id, ...inputProps }: FormFieldProps, ref: React.Ref<HTMLDivElement>) => {
        const resolvedClassName = useClassName({ type, className }, 'DigitalUi-FormField');
        return (
            <Box
                id={id}
                ref={ref}
                className={resolvedClassName}
            >
                <InputText type={type} name={id} label={label} {...inputProps} />
            </Box>
        );
    },
);

export default FormField;
