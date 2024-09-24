import { useMemo } from 'react'
import { ColumnDef } from "@tanstack/react-table";

// Helpers
import { Request } from '../../helpers/Request';

// Components
import DataTable from '../../components/DataTable';
import TableLazy from '../../components/TableLazy';

// React Query
import { useQuery } from 'react-query';

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

    const getProducts = async() => {
        const productUrl = "/product/list";

        const products = await Request({
          method: 'GET',
          url: productUrl
        });

        return products
    } 

    const { 
        data: products, 
        isLoading, 
        isError, 
        error 
    } = useQuery<ProductsProps[]>('products', getProducts,
        {
            staleTime: 1000 * 60 * 5, // 5 dakika boyunca veri taze kabul edilir
            cacheTime: 1000 * 60 * 30, // 30 dakika boyunca veri cache'de tutulur
            refetchOnWindowFocus: false, // Pencere odağa geldiğinde yeniden fetch etmez
            refetchOnMount: false, // Bileşen her mount edildiğinde yeniden fetch etmez
            refetchOnReconnect: true, // Bağlantı yeniden kurulduğunda fetch eder
            refetchInterval: false, // Otomatik yenileme kapalı
        }
    );

    const columns: ColumnDef<ProductsProps>[] = useMemo(
        () => [
            {
                Header: '#',
                accessorKey: "_id",
                header: ({ column }) => {
                    return (
                        <div className="flex items-center gap-2 cursor-pointer hover:text-zinc-700">
                            Product Image
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
                        <div className="size-16 rounded-md bg-slate-300 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera text-slate-100" viewBox="0 0 16 16">
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
                            Name
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
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
                            Ürün Özeti
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
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
                            Price
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
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
                        Stock
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                        </svg>
                    </div>
                );
            },
            },
            {
                id: "actions",
                header: () => <span className="sr-only">Actions</span>,
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center justify-end gap-4">
                            <button
                                className="items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square w-4 h-4" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                                Update
                            </button>

                            <button
                                className="items-center gap-2"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3 w-4 h-4" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                                Remove
                            </button>
                        </div>
                    );
                },
            },
        ],
        []
    );

  return (
    <div>
        {products && products.length > 0 ? (
            <DataTable
                data={products!}
                columns={columns}
                header="Ürünler"
                subHeader="Ürünlerinizi yönetin ve satış performanslarını görüntüleyin."
                className="px-0"
                searchFilter={true}
            />
        ): (
            <TableLazy />
        )}
    </div>
  )
}

export default index