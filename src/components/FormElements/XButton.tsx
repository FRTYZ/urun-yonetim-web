import { ReactElement } from 'react'
import { Link } from 'react-router-dom';

interface FireButtonProps {
    href?: string;
    label?: ReactElement | string;
    disabled?: boolean;
    backgroundColor?:string;
    textStyle?:string;
    padding?:string;
    margin?:string;
    radius?:string;
    addStyle?:string;
    onClick?: () => void;
    [key: string]: any;
}

export default function XButton({
    href,
    icon: Icon,
    label,
    disabled,
    backgroundColor = '',
    textStyle = '',
    padding = '',
    margin = '',
    radius = '',
    addStyle = '',
    onClick,
    ...rest
}: FireButtonProps) {
    const hoverStyle = backgroundColor == 'white' ? 'opacity-80' : 'bg-gray-800'

    return (
        <>
            {href ? (
                <Link 
                    to={href}
                    onClick={onClick}
                    className={`
                        w-full ${margin} ${padding} ${backgroundColor} ${textStyle}
                        hover:${hoverStyle} ${radius}
                        ${disabled && 'opacity-50 cursor-not-allowed'}
                        ${addStyle}
                    `}
                    {...rest}
                >{label}</Link>
            ): (
                <button
                    disabled={disabled}
                    onClick={onClick}
                    className={`
                        w-full ${margin} ${padding} ${backgroundColor} ${textStyle}
                        hover:bg-gray-600 ${radius}
                        ${disabled && 'opacity-50 cursor-not-allowed'}
                        ${addStyle}
                    `}
                    {...rest}
                >{label}</button>
            )}
        </>
       
    )
}
