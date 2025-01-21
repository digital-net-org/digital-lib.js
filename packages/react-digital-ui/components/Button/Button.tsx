import React from 'react';
import { Loader } from '../Loader';
import { useClassName, useProps } from '../../../react-digital';
import './Button.styles.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    variant?: 'primary' | 'secondary' | 'text' | 'icon';
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    selected?: boolean;
    href?: string;
    isModified?: boolean;
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(({ children, variant = 'primary', isModified, ...props }, ref) => {
    const className = useClassName({ ...props, variant }, 'SafariUi-Button');
    const { mapHtmlProps } = useProps({ ...props, variant, className });

    return mapHtmlProps(
        React.createElement(props.href ? 'a' : 'button', {
            ref,
            children: (
                <React.Fragment>
                    {props.loading && <Loader color={props.disabled ? 'disabled' : 'text'} size="small" />}
                    <span className="SafariUi-Button-content">{children}</span>
                    {isModified && (
                        <span className="SafariUi-Button-text-modified">
                            &nbsp;(modifié)
                        </span>
                    )}
                </React.Fragment>
            ),
        }),
    );
});

export default Button;
