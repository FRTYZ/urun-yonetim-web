
import React, { useState, useEffect, ReactElement,ReactNode, MouseEvent } from "react";
import { clsx } from "clsx";

type classNameTypes = {
    right: string;
    left: string;
    top: string;
    bottom: string;
}

type drawerClassNameType = {
    open: classNameTypes;
    close: classNameTypes;
    main: classNameTypes;
}

interface DrawerProps {
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    backgroundColor?: string;
    width?: string;
    padding?: string;
    margin?: string;
    side: string;
    hiddenCloseIcon?: boolean;
    colorCloseIcon?: string;
    buttonContent: ReactElement | null;
    children: ReactNode;
}

export default function Drawer({
        isOpen,
        onOpenChange,
        backgroundColor = '',
        width = 'lg:w-auto',
        padding = 'p-5',
        margin = 'm-0',
        side = "right",
        colorCloseIcon = 'black',
        hiddenCloseIcon = false,
        buttonContent,
        children
    }: DrawerProps ){

    const [localOpen, setLocalOpen] = useState(isOpen ?? false);
    const open = isOpen !== undefined ? isOpen : localOpen;

    const handleOpenChange = (open: boolean) => {
        if (onOpenChange) {
            onOpenChange(open);
        } else {
            setLocalOpen(open);
        }
    };

    useEffect(() => {
        // Drawer açıldığında body'yi kaydırmadan kapatma
        document.body.style.overflow = open ? "hidden" : "auto";
    
        // Cleanup: Drawer kapatıldığında overflow'ü eski haline döndürme
        return () => {
          document.body.style.overflow = "auto";
        };
    }, [open]);

    const drawerClassNames: drawerClassNameType = {
        open: {
            right: "translate-x-0",
            left: "translate-x-0",
            top: "translate-y-0",
            bottom: "translate-y-0"
        },
        close: {
            right: "translate-x-full",
            left: "-translate-x-full",
            top: "-translate-y-full",
            bottom: "translate-y-full"
        },
        main: {
            right: "inset-y-0 right-0",
            left: "inset-y-0 left-0",
            top: "inset-x-0 top-0",
            bottom: "inset-x-0 bottom-0"
        }
    }

    const findValue = (object: object) => {
        return Object.entries(object).find(([key, val]) => key === side)?.[1];
    }

    return (
        <>
            <div
                onClick={() => handleOpenChange(!open)}
            >
                {buttonContent}
            </div>
            <div
                id={`dialog-${side}`}
                className={`
                    relative z-10
                    ${open ? 'opacity-100 duration-500 ease-in-out visible' : 'opacity-0 duration-500 ease-in-out invisible'}
                `}
                aria-labelledby="slide-over"
                role="dialog"
                aria-modal="true"
                onClick={(event) => {
                    const target = event.target as HTMLElement;
                    if (target.id === `dialog-${side}`) {
                        handleOpenChange(!open);
                    }
                }}
            >
                <div
                    className={clsx(
                    "fixed inset-0 bg-black bg-opacity-80 transition-all",
                    {
                        "opacity-100 duration-500 ease-in-out visible": open
                    },
                    { "opacity-0 duration-500 ease-in-out invisible": !open }
                    )}
                ></div>
                <div className={clsx({ "fixed inset-0 overflow-hidden": open })}>
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className={clsx(
                                "pointer-events-none fixed max-w-full",
                                findValue(drawerClassNames.main)
                            )}
                        >
                            <div
                                className={clsx(
                                    "pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500",
                                    { [findValue(drawerClassNames.close)]: !open },
                                    { [findValue(drawerClassNames.open)]: open },
                                )}
                            >
                                <div
                                    className={` overflow-y-scroll
                                        ${width} flex flex-col h-full ${backgroundColor} ${padding} shadow-xl
                                    `}
                                >
                                    {!hiddenCloseIcon && 
                                        <button className="absolute top-2 right-4 lg:right-6" onClick={() => handleOpenChange(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-x-lg w-8 h-8 text-black text-${colorCloseIcon}`} viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                            </svg>
                                        </button>
                                    }
                                    <div className={`${margin}`}>
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};