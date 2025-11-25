import './TextInput.css';
export type TextInputProps = {
    value: string;
    placeholder?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    onSubmit?: () => void;
};
export declare const TextInput: import("react").ForwardRefExoticComponent<TextInputProps & import("react").RefAttributes<HTMLInputElement>>;
export default TextInput;
