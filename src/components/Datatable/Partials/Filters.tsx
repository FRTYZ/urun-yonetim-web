import { useEffect, useState } from "react"

// Form Elements
import XInput from "../../FormElements/XInput"

interface FiltersProps {
    pageSize: number,
    setPageSize: (param: number) => void,
    globalFilter: string,
    setGlobalFilter: (param: string) => void,
}

const Filters = ({
    pageSize,
    setPageSize,
    globalFilter,
    setGlobalFilter
}: FiltersProps) => {

    const pageSizeSelect = (
        <select
            value={pageSize}
            className="block rounded-md border-gray-300 focus:!border-transparent focus:!ring-black focus:!outline-black float-right mr-3"
            onChange={(e) => {
                setPageSize(
                    Number(e.target.value)
                );
            }}
        >
            {[10, 20, 30, 40, 50].map(
                (pageSize) => (
                    <option
                        key={pageSize}
                        value={pageSize}
                    >
                        {pageSize}
                    </option>
                )
            )}
        </select>
    )

    function DebouncedInput({
        value: initialValue,
        onChange,
        debounce = 500,
    }: {
        value: string | number;
        onChange: (value: string | number) => void;
        debounce?: number;
    } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
        const [value, setValue] = useState(initialValue);
    
        useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);
    
        useEffect(() => {
            const timeout = setTimeout(() => {
                onChange(value);
            }, debounce);
    
            return () => clearTimeout(timeout);
        }, [value]);
    
        return (
            <XInput
              type='text'
              value={String(value)}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search..."
              labelType="top"
              tabIndex={1}
              addStyle="!h-5 placeholder-gray-500"
            />
        );
    }
    

    return (
        <div className="flex gap-4 justify-end">
            <DebouncedInput
                value={globalFilter ?? ""}
                onChange={(value) =>
                    setGlobalFilter(String(value))
                }
            />
            {pageSizeSelect}
        </div>
    )

}

export default Filters