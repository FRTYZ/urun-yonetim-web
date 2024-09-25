import {useState} from 'react'

export interface FileUploadInputProps {
    label: string;
    name: string;
    oldFileName: string;
    type: string;
    handleFormik: any;
    [key: string]: any
}

const XFile = ({ label, name, oldFileName, type, handleFormik, ...rest }: FileUploadInputProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;

        if (fileList && fileList.length > 0) {
            const file = fileList[0]; // Yalnızca ilk dosyayı al
            handleFormik.setFieldValue(name, file);

            // Preview için URL oluştur
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
        }
    };

    const renderFileInput = (
       
            <input
                className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
                type="file"
                name={name}
                id={name}
                onChange={(event) => {
                    handleFormik.handleChange(event);
                    handleUploadFile(event);
                }}
                {...rest}
            />
        
    );

    return (
        <div>
            <label className="py-20" htmlFor={name}>
                {label}
            </label>
            {renderFileInput}
            {previewUrl && (
                <div className="mt-4">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-40 h-50 h-auto max-w-xs rounded-lg border border-gray-300"
                    />
                </div>
            )}
        </div>
    );
};

export default XFile
