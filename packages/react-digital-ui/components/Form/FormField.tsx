import React from 'react';
import { Box } from '../Box';
import { InputText, type InputTextProps } from '../InputText';
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
        const resolvedClassName = useClassName({ type, className }, 'SafariUi-FormField');
        return (
            <Box
                id={id}
                ref={ref}
                className={resolvedClassName}
                direction="row"
                mt={1}
                gap={2}
                justify="space-between"
                align="center"
            >
                <React.Fragment>
                    {label && <label className="SafariUi-FormField-label">{label}</label>}
                    <InputText type={type} name={id} {...inputProps} />
                </React.Fragment>
            </Box>
        );
    },
);

export default FormField;
