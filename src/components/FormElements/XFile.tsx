import { useState, useRef } from 'react';

export interface XFileProps {
    label: string;
    name: string;
    oldFileName: string;
    type: string;
    handleFormik: any;
    [key: string]: any
}

interface FileViewSectionProps {
    file: any[];
    type: string;
    removeFunc: (param: number) => void;
    isOld: boolean;
}

interface OldFileInputProps {
    name: string;
    value: any[];
    type: string;
    handleFormik: any;
}

const XFileViewSection= ({file, type, removeFunc, isOld}: FileViewSectionProps) => {
    const EndPoint = import.meta.env.VITE_ENDPOINT;

    return (
        <>
        {file.length > 0 && file.map((item, key) => (
            <>
            <div
                className='relative m-1 inline-block border border-gray-300' 
                key={key}
            >
                {isOld ? (
                    (type == 'image' ? (
                        <img 
                            src={EndPoint + item?.url}
                            style={{ objectFit: 'cover' }} 
                            width={100} 
                            height={100} 
                            alt="Files" 
                        />
                    ): (
                        <p className='p-2 mr-4'>{item.name}</p>
                    ))
                ): (
                    (type == 'image' ? (
                        <img 
                            src={URL.createObjectURL(item)}
                            style={{ objectFit: 'cover' }} 
                            width={100} 
                            height={100} 
                            alt="Files"
                        />
                    ): (
                        <p className='p-2 mr-4'>{item.name}</p>
                    ))
                )}             
                    <div className='absolute flex top-0 right-0 p-2 flex-col bg-white'>
                        <button 
                            aria-label="remove to todo" 
                            onClick={() => removeFunc(key)}
                            className='border-2 border-gray-400 rounded-lg'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-xl text-black font-semibold" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                        </button>
                    </div>
            </div>
            </>
        ))}
        </>
    )
}

export const OldFileInput = ({name, value, type, handleFormik}: OldFileInputProps) => {
    const removeSelectFile = (imageKey: number) => {
        const newList = value?.filter((veri, key) => key !== imageKey && veri);
        handleFormik.setFieldValue(name, newList.length == 0 && undefined);
    }
    
    return (
        <>
            {value.length > 0 && (
                <XFileViewSection 
                    file={value[0]}
                    type={type}
                    removeFunc={removeSelectFile}
                    isOld={true}
                />
            )}
        </>
    )
}

export const XFile = ({label, name, oldFileName, type, setAlert, handleFormik, hasError, ...rest}: XFileProps) => {
    const [file, setFile] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLDivElement | any>(null);

    const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const getfileList = event.target.files;

        if(getfileList){
            const files: File[] = Array.from(getfileList);
            
            if(type == 'image'){
                if(new RegExp("image/*").test(files[0].type)){
                    handleFormik.setFieldValue(name, files[0]);
                    setFile(files)
                }else{
                    setAlert({
                        type: 'error',
                        message: 'Seçtiğiniz dosya image olmalı'
                    })
                    fileInputRef.current.value! = null
                }
            }else{
                handleFormik.setFieldValue(name, files[0]);
                setFile(files)
            }
            handleFormik.setFieldValue(oldFileName, undefined)
            
        }
    }

    const removeSelectFile = (imageKey: number) => {
        const newList = file.filter((veri, key) => key !== imageKey && veri);
        setFile(newList);
        handleFormik.setFieldValue(name, '');
        fileInputRef.current.value! = ''
    }

    const renderFileInput = (
        <div className='my-2'>
            <label htmlFor={name}>
                <input
                    ref={fileInputRef}
                    type="file"
                    name={name}
                    id={name}
                    onChange={(event) => { 
                        handleFormik.handleChange(event);
                        handleUploadFiles(event)
                    }}
                    style={{ display: 'none' }}
                    {...rest}
                />
                    <div
                        className="flex w-20 h-10 p-3 items-center bg-red-600 text-white rounded-full hover:bg-red-700 active:shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                        </svg>
                        <p>Yükle</p>
                    </div>
            </label>
            {hasError && <p className="mt-2 text-red-400">{hasError}</p>}
        </div>
            
    )

    return (
        <div className='my-4'>
            <label htmlFor={name} >{label}</label>
             {renderFileInput}
             <div className='container block mt-4'>
                {handleFormik.values[name] && (
                    <XFileViewSection 
                        file={file}
                        type={type}
                        removeFunc={removeSelectFile}
                        isOld={false}
                    />
                )}
             </div>
        </div>
    )
}

