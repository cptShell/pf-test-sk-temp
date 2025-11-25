import type { HTMLAttributes, ReactNode } from 'react';
import './Typography.css';
type Variant = 'eyebrow' | 'display' | 'title' | 'body' | 'caption';
type Color = 'default' | 'muted' | 'accent' | 'success' | 'danger' | 'inverse';
type Align = 'start' | 'center' | 'end';
type Weight = 'regular' | 'medium' | 'bold';
type AllowedTag = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div' | 'label';
export type TypographyProps = HTMLAttributes<HTMLElement> & {
    as?: AllowedTag;
    variant?: Variant;
    color?: Color;
    align?: Align;
    weight?: Weight;
    transform?: 'none' | 'uppercase';
    children: ReactNode;
    className?: string;
};
export declare const Typography: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & {
    as?: AllowedTag;
    variant?: Variant;
    color?: Color;
    align?: Align;
    weight?: Weight;
    transform?: "none" | "uppercase";
    children: ReactNode;
    className?: string;
} & import("react").RefAttributes<HTMLElement>>;
export default Typography;
