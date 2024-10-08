import { useMemo, useState, useEffect } from 'react'
import { ColumnDef } from "@tanstack/react-table";

// Helpers
import { Request } from '../../helpers/Request';

// Components
import Table from '../../components/Datatable/Table';
import TableLazy from '../../components/TableLazy';
import Drawer from '../../components/Drawer';

// Form Elements
import XButton from '../../components/FormElements/XButton';
import XInput from '../../components/FormElements/XInput';
import { OldFileInput, XFile } from '../../components/FormElements/XFile';

// Utils
import { NumberInput } from '../../utils/numberInput';

// Other npm packages
import { useQuery, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import Swal from 'sweetalert2'

// Interfaces
export interface ProductsProps {
    _id: string;
    name: string
    description: string;
    price: number;
    stock: number;
    featuredImage: {
      url: string;
      name: string;
      pathName: string;
      mimeType: string
    }
    created_at: string;
}

function index() {
    // useStates
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerUpdateFormOpen, setIsDrawerFormOpen] = useState(false);
    const [selectData, setSelectData] = useState<ProductsProps>();
    const [queryUrl, setQueryUrl] = useState<string>('/product/list');

    // useEffects
    useEffect(() => {
        if(queryUrl !== ''){
            getProducts();
        }
    }, [queryUrl]);

    const getProducts = async() => {
        const products = await Request({
          method: 'GET',
          url: queryUrl
        });

        return products
    } 

    const { 
        data: products, 
        isLoading, 
        isError, 
        error
      } = useQuery<ProductsProps[]>(['products', queryUrl], () => getProducts(), {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchInterval: false,
    });

    const queryClient = useQueryClient();

  
    const columns: ColumnDef<ProductsProps>[] = useMemo(
        () => [
            {
                Header: '#',
                accessorKey: "_id",
                header: () => {
                    return (
                        <div  className="flex items-center gap-2 cursor-pointer hover:text-zinc-700">
                            Ürün Fotoğrafı
                        </div>
                    );
                },
                cell: ({ row }) => {
                    const thumbnail =  import.meta.env.VITE_ENDPOINT + row.original.featuredImage.url;

                    return thumbnail ? (
                        <img
                            alt="Product image"
                            className="aspect-square rounded-md object-cover mr-4"
                            height="64"
                            src={thumbnail}
                            width="64"
                        />
                    ) : (
                        <div  className="size-16 rounded-md bg-slate-300 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-camera text-slate-100" viewBox="0 0 16 16">
                                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
                                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "name",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Ürün Adı
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
                cell: ({ row }) => {
                    const name = row.original.name;
                    return name;
                },
            },
            {
                accessorKey: "description",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Ürün Açıklaması
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "price",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 cursor-pointer whitespace-nowrap hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Ürün Fiyatı
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },

            },
            {
                accessorKey: "stock",
                
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 cursor-pointer whitespace-nowrap hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Stok Miktarı
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
                cell: ({ row }) => {
                    const stockStatus = row.original.stock;

                    return stockStatus > 0 ? (
                        stockStatus
                    ) : (
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Stokta Yok</span>
                    );
                },
            },
            {
                id: "actions",
                header: () => <span  className="whitespace-nowrap hover:text-zinc-700">İşlemler</span>,
                cell: ({ row }) => {
                    const data = row.original
                    return (
                        <div  className="flex items-center justify-end gap-4">
                            <XButton 
                                label={
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square w-4 h-4" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                        Düzenle
                                    </>
                                }
                                backgroundColor='bg-black'
                                textStyle='text-white text-[16px] font-[600]'
                                padding='px-4 py-2 lg:px-8 lg:py-3'
                                radius='rounded-lg'
                                addStyle="!w-fit flex items-center gap-2"
                                onClick={() => 
                                    {
                                        setSelectData(data)
                                        setIsDrawerFormOpen(!isDrawerUpdateFormOpen)
                                    }
                                }
                            />
                            <XButton 
                                label={
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-trash3 w-4 h-4" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                        Sil
                                    </>
                                }
                                backgroundColor='bg-red-500'
                                textStyle='text-white text-[16px] font-[600]'
                                padding='px-4 py-2 lg:px-8 lg:py-3'
                                radius='rounded-lg'
                                addStyle="!w-fit flex items-center gap-2"
                                onClick={() => handleDeleteProduct(data)}
                            />
                        </div>
                    );
                },
            },
        ],
        []
    );

                        // Function

    // CRUD Functions
    const addFormik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            stock: '',
            addFeaturedImage: ''
        },
        validate: (values) => {
            const errors: { [key: string]: string } = {};

            const {name, description, price, stock } = values;

            if (name == '') {
              errors.name = "Ürün adı doldurmalısınız";
            }
            if (description == '') {
              errors.description = "Ürün açıklamasını doldurmalısınız";
            }
            if (price == '') {
              errors.price = "Ürün fiyatı belirlemelisiniz";
            }
            if (stock == '') {
              errors.stock = "Ürün stok durumunu belirlemelisiniz";
            }

            return errors;
        },
        onSubmit: async (values, { resetForm }) => {
            const {name, description, price, stock, addFeaturedImage } = values;

            if(name == '' || description == '' || price == '' || stock == '' || addFeaturedImage == ''){
             
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: 'Gerekli alanları doldurmalısınız.',
                })
            }
            else{
                const formdata: FormData = new FormData();
                formdata.append("name", name!);
                formdata.append("description", description!);
                formdata.append("price", price!);
                formdata.append("stock", stock!);
                formdata.append('featuredImage', addFeaturedImage);
                
                const url = '/product/list';

                const response = await Request({
                    method: 'POST',
                    url: url,
                    formData: formdata
                });
                
                const responseCheck = Object.keys(response).filter(item => item == 'success')
                if (responseCheck) {
                    Swal.fire({
                        icon: 'success',
                        title: 'İşlem Başarılı',
                        html: 'Ürün başarıyla eklendi',
                        confirmButtonText: 'Tamam'
                    });

                    queryClient.invalidateQueries('products'); 
                    setIsDrawerOpen(false);
                    resetForm();
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hata',
                        text: 'Bir sorun oluştu',
                    })
                } 
            }
        }
    })

    const updateFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: (selectData && selectData.name) || '',
            description: (selectData && selectData.description) || '',
            price: (selectData ? selectData.price : ''),
            stock: (selectData ? selectData.stock : ''),
            oldImage: (selectData?.featuredImage ? [selectData?.featuredImage] : ''),
            featuredImage: ''
        },
        validate: (values) => {
            const errors: { [key: string]: string } = {};

            const {name, description, price, stock } = values;

            if (name == '') {
              errors.name = "Ürün adı doldurmalısınız";
            }
            if (description == '') {
              errors.description = "Ürün açıklamasını doldurmalısınız";
            }
            if (price == '') {
              errors.price = "Ürün fiyatı belirlemelisiniz";
            }
            if (stock == '') {
              errors.stock = "Ürün stok durumunu belirlemelisiniz";
            }

            return errors;
        },
        onSubmit: async (values, { resetForm }) => {
            const {name, description, price, stock, featuredImage, oldImage } = values;

            if(name == '' || description == '' || price == '' || (!oldImage && featuredImage == '' )){
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: 'Gerekli alanları doldurmalısınız.',
                })
            }
            else{
                const formdata = new FormData();

                formdata.append("name", name!);
                formdata.append("description", description!);
                formdata.append("price", price.toString());
                formdata.append("stock", stock.toString());
                featuredImage !== '' && formdata.append('featuredImage', featuredImage);
                
                const url = '/product/list/' + selectData?._id ;

                const response = await Request({
                    method: 'PUT',
                    url: url,
                    formData: formdata
                });
                
                const responseCheck = Object.keys(response).filter(item => item == 'success')
                if (responseCheck) {
                    Swal.fire({
                        icon: 'success',
                        title: 'İşlem Başarılı',
                        html: 'Ürün başarıyla güncellendi',
                        confirmButtonText: 'Tamam'
                    });

                    queryClient.invalidateQueries('products'); 
                    setIsDrawerFormOpen(false);
                    resetForm();
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hata',
                        text: 'Bir sorun oluştu',
                    })
                }
            }
        }
    })

    const handleDeleteProduct = async(productValue: ProductsProps) => {
        const {value} = await Swal.fire({
            title: 'Ürün Silme İşlemi',
            text: `"${productValue._id}" numaralı "${productValue.name}" adlı ürünü silmek istediğinizden emin misiniz ?`,
            html: `
                Ürünü silmek istediğinizden emin misiniz ? <br/>
                ID:  <b>${productValue._id}</b> <br/>
                Ürün Adı:  <b>${productValue.name}</b> <br/>
            `,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Vazgeç',
            confirmButtonText: 'Silinsin, Kabul ediyorum',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        })

        if(value){
            const url = '/product/list/' + productValue?._id;

            const result = await Request({
                method: 'DELETE',
                url: url
            });

            const responseCheck = Object.keys(result).filter(item => item == 'success')

            if(responseCheck){
                Swal.fire({
                    icon: 'success',
                    title: 'İşlem Başarılı',
                    html: 'Ürün başarıyla silindi.',
                    confirmButtonText: 'Tamam'
                });
                queryClient.invalidateQueries('products');
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: 'Gerekli alanları doldurmalısınız.',
                })
            }
        }
    }

    // Forms
    const addProductForm = (
        <div className="bg-white text-left px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600 mb-4">
                    <p className="font-medium text-lg">Yeni Ürün Ekleme</p>
                    <p>Lütfen gerekli alanları doldurun</p>
                </div>
                <form
                    method='POST'
                    onSubmit={addFormik.handleSubmit}
                    encType='multipart/form-data'
                    className="lg:col-span-2 block space-y-6"
                >
                    <XFile 
                        label='Ürün fotoğrafı'
                        name="addFeaturedImage"
                        oldFileName=''
                        type='image'
                        handleFormik={addFormik}
                        accept='image/png, image/jpeg'
                        tabIndex={1}
                        hasError={Boolean(addFormik.values.addFeaturedImage == '' && addFormik.touched.addFeaturedImage) ? 'Ürün fotoğrafını seçmelisiniz.' : ''}
                    />
                    <XInput
                        type='text'
                        name='name'
                        placeholder='Ürün Adı'
                        labelType='top'
                        label='Ürün Adı'
                        errorMessage={addFormik.errors.name}
                        value={addFormik.values.name}
                        onChange={addFormik.handleChange}
                        tabIndex={2}
                    />
                    <XInput
                        type='text'
                        name='description'
                        placeholder='Ürün Açıklaması'
                        labelType='top'
                        label='Ürün Açıklaması'
                        errorMessage={addFormik.errors.description}
                        value={addFormik.values.description}
                        onChange={addFormik.handleChange}
                        tabIndex={3}
                    />
                    <XInput
                        type='number'
                        name='price'
                        placeholder='Ürün Fiyatı'
                        labelType='top'
                        label='Ürün Fiyatı'
                        errorMessage={addFormik.errors.price}
                        value={addFormik.values.price}
                        onChange={(event) =>{
                            const filterValue = NumberInput(event, 1);
                            filterValue && addFormik.setFieldValue('price', filterValue && filterValue);
                        }}
                        tabIndex={4}
                        helperText='Ürün fiyatı pozitif değer olmalıdır.'
                    />
                    <XInput
                        type='number'
                        name='stock'
                        placeholder='Stok miktarı'
                        labelType='top'
                        label='Stok miktarı'
                        errorMessage={addFormik.errors.stock}
                        value={addFormik.values.stock}
                        onChange={(event) =>{
                            const filterValue =  NumberInput(event);
                            filterValue && addFormik.setFieldValue('stock', filterValue);
                        }}
                        tabIndex={5}
                        helperText="Ürün stok durumunu 0'dan büyük değer olmalıdır. 0 değeri stok yok durumunu temsil eder. "
                    />
                    <div className="md:col-span-5 text-right">
                        <XButton 
                            label="Ürünü Ekle"
                            backgroundColor='bg-black'
                            textStyle='text-white text-[16px] font-[600]'
                            padding='px-8 py-3'
                            radius='rounded-lg'
                            addStyle="!w-fit"
                            tabIndex={6}
                            disabled={!addFormik.isValid}
                        />
                    </div>
                </form>
            </div>
        </div>
    )

    const updateProductForm = (
        <div className="bg-white text-left px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600 mb-4">
                    <p className="font-medium text-lg">Ürün Güncelleme</p>
                    <p>Lütfen gerekli alanları doldurun</p>
                </div>
                <form
                    method='PUT'
                    onSubmit={updateFormik.handleSubmit}
                    className="lg:col-span-2 block space-y-6"
                >
                    <XFile 
                        label='Ürün fotoğrafı'
                        name="featuredImage"
                        oldFileName='oldImage'
                        type='image'
                        handleFormik={updateFormik}
                        accept='image/png, image/jpeg'
                        tabIndex={1}
                        hasError={Boolean(!(updateFormik.values.oldImage) && updateFormik.values.featuredImage == '' && updateFormik.touched.featuredImage) ? 'Ürün fotoğrafını seçmelisiniz.' : ''}
                    />
                    <OldFileInput 
                        name="oldImage"
                        value={updateFormik.values.oldImage ? [updateFormik.values.oldImage]: []}
                        type="image"
                        handleFormik={updateFormik}
                    />
                    <XInput
                        type='text'
                        name='name'
                        placeholder='Ürün Adı'
                        labelType='top'
                        label='Ürün Adı'
                        errorMessage={updateFormik.errors.name}
                        value={updateFormik.values.name}
                        onChange={updateFormik.handleChange}
                        tabIndex={2}
                    />
                    <XInput
                        type='text'
                        name='description'
                        placeholder='Ürün Açıklaması'
                        labelType='top'
                        label='Ürün Açıklaması'
                        errorMessage={updateFormik.errors.description}
                        value={updateFormik.values.description}
                        onChange={updateFormik.handleChange}
                        tabIndex={3}
                    />
                    <XInput
                        type='number'
                        name='price'
                        placeholder='Ürün Fiyatı'
                        labelType='top'
                        label='Ürün Fiyatı'
                        errorMessage={updateFormik.errors.price}
                        value={String(updateFormik.values.price)}
                        onChange={(event) =>{
                            const filterValue =  NumberInput(event, 1);
                            
                            filterValue && updateFormik.setFieldValue('price', filterValue);
                        }}
                        tabIndex={4}
                        helperText='Ürün fiyatı pozitif değer olmalıdır.'
                    />
                    <XInput
                        type='number'
                        name='stock'
                        placeholder='Stok miktarı'
                        labelType='top'
                        label='Stok miktarı'
                        errorMessage={updateFormik.errors.stock}
                        value={String(updateFormik.values.stock)}
                        helperText="Ürün stok durumunu 0'dan büyük değer olmalıdır. 0 değeri stok yok durumunu temsil eder. "
                        onChange={(event) =>{
                            const filterValue =  NumberInput(event);
                            
                            filterValue && updateFormik.setFieldValue('stock', filterValue);
                        }}
                        tabIndex={5}
                    />
                    <div className="md:col-span-5 text-right">
                        <XButton 
                            type='submit'
                            label="Ürünü Güncelle"
                            backgroundColor='bg-black'
                            textStyle='text-white text-[16px] font-[600]'
                            padding='px-8 py-3'
                            disabled={!updateFormik.dirty || !updateFormik.isValid}
                            radius='rounded-lg'
                            addStyle="!w-fit"
                            tabIndex={6}
                        />
                    </div>
                </form>
            </div>
        </div>
    )

    return (
        <div  className="w-full mx-auto bg-white rounded-sm ">
            <Drawer
                buttonContent={null}
                isOpen={isDrawerUpdateFormOpen}
                onOpenChange={(open) => setIsDrawerFormOpen(open)}
                backgroundColor='bg-white dark:bg-primary-dark'
                side='right'
                padding='px-8 pt-12'
                width='w-[100vw] lg:w-[80vw]'
            >
                {updateProductForm}
            </Drawer>
            <header  className="grid grid-cols-2 py-4 items-center border-b border-gray-100">
                <h2  className="font-semibold text-gray-800">Ürünler</h2>
                <div  className="text-end">
                    <Drawer
                        buttonContent={
                            <XButton 
                                label="Yeni Ürün Ekle"
                                backgroundColor='bg-white'
                                textStyle='text-black text-[16px] font-[600]'
                                padding='px-4 py-2 lg:px-8 lg:py-3'
                                radius='rounded-lg'
                                addStyle="!w-fit border border-gray-500"
                            />
                        }
                        isOpen={isDrawerOpen}
                        onOpenChange={(open) => setIsDrawerOpen(open)}
                        backgroundColor='bg-white dark:bg-primary-dark'
                        side='right'
                        padding='px-8 pt-12'
                        width='!w-[100vw] lg:w-[80vw]'
                    >
                        {addProductForm}
                    </Drawer>
                </div>
            </header>
            {!isLoading && products ? (
                <Table
                    data={products}
                    columns={columns}
                    searchFilter={true}
                    setQueryUrl={setQueryUrl}
                />
            ): (
                <TableLazy />
            )}
        </div>
    )
}

export default index