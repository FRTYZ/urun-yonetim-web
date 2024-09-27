import { useEffect, useState } from "react"

// Form Elements
import XInput from "../../FormElements/XInput";
import XSelectBox from "../../FormElements/XSelectBox";
import XButton from "../../FormElements/XButton";

import Drawer from "../../Drawer";

// utils
import { NumberInput } from "../../../utils/numberInput";

import { useSearchParams } from 'react-router-dom';

interface FiltersProps {
    pageSize: number,
    setPageSize: (param: number) => void,
    globalFilter: string,
    setGlobalFilter: (param: string) => void,
    setQueryUrl:  (url: string) => void;
}

const Filters = ({
    pageSize,
    setPageSize,
    globalFilter,
    setGlobalFilter,
    setQueryUrl
}: FiltersProps) => {

    // React Router
    const [searchParams, setSearchParams] = useSearchParams();
    const hasStockParam = searchParams.get('has_stock');
    const minStockParam = searchParams.get('min_price');
    const maxStockParam = searchParams.get('max_price');

    const [selectStock, setSelectStock] = useState<string>(hasStockParam ? hasStockParam : '');
    const [minPrice, setMinPrice] = useState<string>(minStockParam ? minStockParam : '');
    const [maxPrice, setMaxPrice] = useState<string>(maxStockParam ? maxStockParam : '');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    const pageSizeSelect = (
         <XSelectBox
            name="selectCause"
            label="Sayfa başı"
            labelType="top"
            inputClassName="h-5"
            placeholder="Gösterim sayısı"
            value={pageSize}
            values={[
                {
                    value: 10,
                    label: 'Varsayılan',
                },
                {
                    value: 20,
                    label: 20,
                },
                {
                    value: 30,
                    label: 30,
                },
                {
                    value: 40,
                    label: 40,
                },
            ]}
            onChange={(e) => {
                setPageSize(
                    Number(e.target.value)
                );
            }}
            tabIndex={1}
        />
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
              tabIndex={2}
              addStyle="!h-5 placeholder-gray-500"
            />
        );
    }

    const hasStokSelect = (
        <XSelectBox
            name="selectCause"
            label="Stok durumu"
            labelType="top"
            inputClassName="h-5"
            placeholder="İletişime geçmenizin sebebi nedir?"
            values={[
                {
                    value: "",
                    label: "Tümü",
                },
                {
                    value: "in-stock",
                    label: "Stokta",
                },
                {
                    value: "out-stock",
                    label: "Stokta Yok",
                },
            ]}
            onChange={(e) => {
                setSelectStock(
                    e.target.value
                );
            }}
            tabIndex={3}
        />
    )

    const minPriceInput = (
        <XInput
            type='text'
            value={minPrice}
            onChange={(event) => {
                const value = NumberInput(event);
                value && setMinPrice(value)
            }}
            label="Minimum fiyat"
            placeholder="Min fiyat"
            labelType="top"
            tabIndex={4}
            addStyle="!h-5 placeholder-gray-500"
        />
    )

    const maxPriceInput = (
        <XInput
            type='text'
            value={maxPrice}
            onChange={(event) => {
                const value = NumberInput(event);
                setMaxPrice(value ? value : '')
            }}
            label="Maximum fiyat"
            placeholder="Maximum fiyat"
            labelType="top"
            tabIndex={5}
            addStyle="!h-5 placeholder-gray-500"
        />
    )

    const rightButtonFilter = (
        <XButton 
            label="Filtrele"
            backgroundColor='bg-green-400'
            textStyle='text-white text-[16px] font-[600]'
            padding='px-8 py-2'
            radius='rounded-lg'
            addStyle="lg:!w-fit"
            onClick={() => handleRightFilters()}
            tabIndex={6}
        />
    )

    const rightButtonClear = (
        <XButton 
            label="Temizle"
            backgroundColor='bg-gray-500'
            textStyle='text-white text-[16px] font-[600]'
            padding='px-8 py-2'
            radius='rounded-lg'
            addStyle="lg:!w-fit"
            onClick={() => handleResetFilters()}
            tabIndex={7}
        />
    )

    const handleRightFilters = () => {
        const updateParams = [];
        if(selectStock !== ''){
            updateParams.push("has_stock=" + selectStock);

            setSearchParams((prev) => {
                prev.set("has_stock", selectStock);
                return prev;
            });
        }
        if(minPrice !== ''){
            updateParams.push("min_price=" + minPrice)

            setSearchParams((prev) => {
                prev.set("min_price", minPrice);
                return prev;
            });
        }

        if(maxPrice !== ''){
            updateParams.push("max_price=" + maxPrice)

            setSearchParams((prev) => {
                prev.set("max_price", maxPrice);
                return prev;
            });
        }

        const fullUrl = '/product/list' + (updateParams.length > 0 ? "?" + updateParams.join('&'): "")
            
        setQueryUrl(fullUrl)
        setIsDrawerOpen(false)
    }

    const handleResetFilters = () => {
        setMaxPrice('')
        setMinPrice('')
        setSelectStock('')
        setQueryUrl('/product/list')
        setSearchParams('');
        setIsDrawerOpen(false)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center px-3 py-4 border-y border-gray-400">
            <div className="flex gap-4 justify-start col-span-12 lg:col-span-4 lg:border-r lg:border-gray-300">
                {pageSizeSelect}
                <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value) =>
                        setGlobalFilter(String(value))
                    }
                />
            </div>
            <div className="grid lg:flex gap-4 justify-end col-span-12 lg:col-span-8">
                <div className="hidden lg:flex gap-4 lg:grid-cols-5">
                    {hasStokSelect}
                    {minPriceInput}
                    {maxPriceInput}
                    {rightButtonFilter}
                    {rightButtonClear}
                </div>
                <div className="flex lg:hidden">
                    <Drawer
                        buttonContent={
                            <XButton 
                                label={
                                    <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill w-4 h-4" viewBox="0 0 16 16">
                                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
                                    </svg>
                                    
                                    </>
                                }
                                backgroundColor='bg-white'
                                textStyle='text-black text-[16px] font-[600]'
                                padding='px-4 py-2'
                                radius='rounded-lg'
                                addStyle="!w-fit border border-gray-500"
                            />
                        }
                        isOpen={isDrawerOpen}
                        onOpenChange={(open) => setIsDrawerOpen(open)}
                        backgroundColor='bg-white dark:bg-primary-dark'
                        side='right'
                        padding='px-8 pt-12'
                        width='w-[100vw] lg:w-[80vw]'
                    >
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                            {hasStokSelect}
                            {minPriceInput}
                            {maxPriceInput}
                            {rightButtonFilter}
                            {rightButtonClear}
                        </div>
                    </Drawer>
                </div>
            </div>
        </div>
    )

}

export default Filters