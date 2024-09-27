import { ReactElement } from "react";


interface XInputProp {
    type: string;
    name?: string;
    label?: string;
    labelType?: | 'normal' | 'top';
    value?: string | number;
    placeholder?: string;
    errorMessage?: string;
    helperText?: string;
    disabled?: boolean;
    sideContent?: ReactElement | null;
    sideContentPosition?: string;
    addStyle?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any;
}

export default function XInput({
    type = 'text',
    name,
    label,
    labelType = 'normal',
    value,
    placeholder,
    errorMessage,
    helperText,
    disabled,
    sideContent,
    sideContentPosition = 'right',
    addStyle = '',
    onChange,
    ...rest
}: XInputProp) {
  return (

    <div>
        <label
            htmlFor={name}
            className={`
                relative block rounded-md border border-gray-200 
                shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black
                ${sideContentPosition == 'left' ? 'px-10' : 'px-3'} 
                ${disabled ? 'bg-slate-50 ring-1 ring-black' : 'bg-white'} 
                ${!label && '!py-2' }
                ${labelType == 'top' ? 'py-2' : 'pt-4'}
            `}
        >
            <input
                type={type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                onChange={onChange}
                className={`
                    ${addStyle}
                    peer h-7 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:text-black
                `}
                {...rest}
            />
            {label && (
                <span
                    className={`
                        absolute -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:text-xs
                        ${sideContentPosition == 'left' ? 'px-7' : 'px-0'}
                        ${labelType == 'top' ? 'px-1 top-0 start-2 bg-inherit peer-focus:-top-0' : 'start-3 top-3 peer-focus:top-3'}
                    `}
                >
                    {label}
                </span>
            )}
            {sideContent && (
                <span
                    className={`
                        absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500
                        ${sideContentPosition == 'left' && 'start-0'}
                    `}
                >
                    {sideContent}
                </span>
            )}
        </label>
        {helperText && <p className="mt-2 text-gray-400">{helperText}</p>}
        {errorMessage && <p className="mt-2 text-red-400">{errorMessage}</p>}
    </div>
  )
}