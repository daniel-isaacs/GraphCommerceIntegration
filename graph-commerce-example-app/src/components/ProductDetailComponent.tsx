import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { graphql } from '@/graphql'
import parse from 'html-react-parser';
import Image from 'next/image';
const cmsImageHost = process.env.OPTIMIZELY_CMS_URL ?? "https://localhost:44397"

export const ProductDetail = graphql(/* GraphQL */ `
    query ProductDetail(
    $locale: Locales = en
    $code: String!
    ) {
    GenericProduct(
        locale: [$locale]
        where:{
        Code: { eq: $code }
        }
        limit:1
    ) {
        items {
            Name
            Code
            DefaultImageUrl
            DefaultMarketPrice
            Brand
            LongDescription
            ProductTeaser
        }
    }
    }
`)

interface ProductDetailProps {
    code: string
    setOpen: Dispatch<SetStateAction<boolean>>;
}
 
const ProductDetailComponent: FC<ProductDetailProps> = ({code, setOpen}) => {
    const { data, loading, error } = useQuery(ProductDetail, { 
        variables: { 
            code
        } 
    })
    if (loading) {return "Loading product details..."}
    if (error) return `Error! ${error.message}`;

    const item = data?.GenericProduct?.items![0]
    const imageUrl = cmsImageHost + "/" + item?.DefaultImageUrl
    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold dark:text-slate-800">
                    { item?.Name }
                </h3>
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setOpen(false)}
                    >
                        Close
                    </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <div className="relative overflow-hidden rounded-md bg-gray-200 lg:h-80">
                    <Image src={imageUrl} alt={item?.Name ?? ''} fill className="rounded-t-lg object-contain object-center" />
                </div>
                    <span className="my-4 text-slate-500 text-lg leading-relaxed">
                        { parse(item?.ProductTeaser ?? '')}
                    </span>
                    <div className="flex items-center justify-between">
                        <p className="my-4 text-slate-800 text-lg leading-relaxed">
                            From: {item?.Brand}
                        </p>
                        <span className="font-bold text-lg dark:text-slate-800">${item?.DefaultMarketPrice?.toFixed(2)}</span>
                    </div>
                </div>
                {/*footer*/}
            </div>
            </div>
        </div>
    )
}
 
export default ProductDetailComponent