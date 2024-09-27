
export type SelectBoxValueProps = {
    value: string | number;
    label: string | number;
}

interface XSelectBoxProp {
    name?: string;
    label?: string;
    labelType?: | 'normal' | 'top';
    values?: SelectBoxValueProps[];
    value?:string | number;
    errorMessage?: string;
    disabled?: boolean;
    labelClassName?:string;
    inputClassName?:string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    [key: string]: any;
}

export default function XSelectBox({
    name,
    label,
    labelType = 'normal',
    values,
    value,
    errorMessage,
    disabled,
    labelClassName = '',
    inputClassName = '',
    onChange,
    ...rest
}: XSelectBoxProp) {
  return (
    <>
        <label 
            htmlFor={name} 
            className={`
                relative block rounded-md border border-gray-200 
                shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black
                ${disabled ? 'bg-slate-50 ring-1 ring-black' : 'bg-white' } 
                ${!label && '!pt-3'} 
                ${labelType == 'top' ? 'py-2' : 'pt-4'}
                ${labelClassName}
            `}
        >
            <select 
                id={name}
                name={name}
                disabled={disabled}
                onChange={onChange}
                value={value}
                className={`
                    peer h-10 px-3 w-full border-none bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:text-black
                ${inputClassName}
                `}
                {...rest}
            >
              {values?.map((item, index) => (
                  <option 
                    key={index}
                    value={item.value}
                  >{item.label}</option>
              ))}
            </select>
            <span
                className={`
                    absolute -translate-y-1/2 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:text-xs
                    ${labelType == 'top' ? 'px-1 top-0 start-2 bg-inherit peer-focus:-top-0 peer-has-[:checked]:-top-0' : 'start-3 top-3 peer-focus:top-3'}
                `}
            >
                {label}
            </span>
        </label>
        {errorMessage && <p className="mt-2 text-red">{errorMessage}</p>}
    </>
  )
}
