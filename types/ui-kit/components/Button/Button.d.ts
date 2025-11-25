import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';
type Variant = 'primary' | 'ghost';
type Size = 'md' | 'sm';
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
    icon?: ReactNode;
    fullWidth?: boolean;
};
export declare const Button: import("react").ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
    icon?: ReactNode;
    fullWidth?: boolean;
} & import("react").RefAttributes<HTMLButtonElement>>;
export default Button;
