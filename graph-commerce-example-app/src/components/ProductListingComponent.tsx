import React, { FC, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { graphql } from '@/graphql'
import { StringFacet } from '@/graphql/graphql'
import FacetsComponent from './FacetsComponent'
import SearchTextComponent from './SearchTextComponent'
import GenericProductTeaserComponent from './GenericProductTeaser'
 
export const ProductListing = graphql(/* GraphQL */ `
    query ProductListing(
        $languages: [Locales] = en
        $searchText: String,
        $brands: [String!],
        $sizes: [String!],
        $colors: [String!],
        $minPrice: Float,
        $maxPrice: Float,
        $skip: Int = 0,
        $limit: Int = 10,
        $order: GenericProductOrderByInput = {       
            _ranking: SEMANTIC,
            DefaultMarketPrice: ASC 
        }
        )
        {
        GenericProduct(
            locale: $languages
            where:{
                _fulltext: {
                    match: $searchText
                }
                DefaultMarketPrice: {
                    gte: $minPrice
                    lte: $maxPrice
                }
            }
            skip: $skip,
            limit: $limit
            orderBy: $order
        ) {
            total
            items {
                ...GenericProductTeaser
            }
            facets {
                Brand(filters: $brands) {
                    name
                    count
                }
                Sizes(filters:$sizes) {
                    name
                    count
                }
                Colors(filters:$colors) {
                    name
                    count
                }
                DefaultMarketPrice(ranges: [
                    { to: 100 },
                    { from: 100, to: 200 },
                    { from: 200, to: 300 },
                    { from: 300, to: 400 },
                    { from: 400, to: 500 },
                    { from: 500, to: 600 },
                    { from: 600, to: 700 },
                    { from: 700, to: 800 },
                    { from: 800, to: 900 },
                    { from: 900, to: 1000 },
                    { from: 1000 },
                ]) {
                    name
                    count
                }
            }
        }
    }
`)
 
const ProductListingComponent: FC = () => {

    const [searchText, setSearchText] = useState(() => '');

    const [brands, setBrands] = useState(() => new Array<string>());
    const [brandFacet, setBrandFacet] = useState(() => new Array<StringFacet>())

    const [colors, setColors] = useState(() => new Array<string>());
    const [colorFacet, setColorFacet] = useState(() => new Array<StringFacet>())

    const [sizes, setSizes] = useState(() => new Array<string>());
    const [sizeFacet, setSizeFacet] = useState(() => new Array<StringFacet>())

    const { data } = useQuery(ProductListing, { variables: { searchText, brands, colors, sizes } })

    function facetOptionChanged(fasetQueryResult: StringFacet[], faset: StringFacet[]): boolean {
        if(fasetQueryResult.length != faset.length) {
            return true
        }

        for (let i = 0; i < fasetQueryResult.length; i++) {
            if(fasetQueryResult[i]?.name !== faset[i]?.name) {
                return true
            }

            if(fasetQueryResult[i]?.count !== faset[i]?.count) {
                return true
            }
        }

        return false
    }

    useEffect(() => {
        if(data?.GenericProduct?.facets?.Brand != undefined && data?.GenericProduct?.facets?.Brand) {
          if(facetOptionChanged(data?.GenericProduct?.facets?.Brand as StringFacet[], brandFacet)) {
            setBrandFacet(data.GenericProduct.facets?.Brand as StringFacet[])
          }
        }

        if(data?.GenericProduct?.facets?.Colors != undefined && data?.GenericProduct?.facets?.Colors) {
            if(facetOptionChanged(data?.GenericProduct?.facets?.Colors as StringFacet[], colorFacet)) {
              setColorFacet(data.GenericProduct.facets?.Colors as StringFacet[])
            }
        }

        if(data?.GenericProduct?.facets?.Sizes != undefined && data?.GenericProduct?.facets?.Sizes) {
            if(facetOptionChanged(data?.GenericProduct?.facets?.Sizes as StringFacet[], sizeFacet)) {
              setSizeFacet(data.GenericProduct.facets?.Sizes as StringFacet[])
            }
        }
      }, [brandFacet, colorFacet, sizeFacet, data?.GenericProduct?.facets]);

    return (
        <main className="overflow-hidden rounded-2xl">
            <div className="flex">
            <div className="relative hidden h-screen ml-4 shadow-lg lg:block w-80">
                <div className="h-full rounded-2xl dark:bg-gray-700">
                    
                    <nav className="mt-6">
                        <div>
                            <FacetsComponent
                                headingText='Brands'
                                facet={brandFacet}
                                values={brands}
                                setValues={setBrands}
                            />
                        </div>
                    </nav>

                    <nav className="mt-6">
                        <div>
                            <FacetsComponent
                                headingText='Colors'
                                facet={colorFacet}
                                values={colors}
                                setValues={setColors}
                            />
                        </div>
                    </nav>

                    <nav className="mt-6">
                        <div>
                            <FacetsComponent
                                headingText='Sizes'
                                facet={sizeFacet}
                                values={sizes}
                                setValues={setSizes}
                            />
                        </div>
                    </nav>

                </div>
            </div>
            
            <div className="w-full pl-0 md:p-6">
                <header className="z-40 items-center w-full h-16 shadow-lg dark:bg-gray-700 rounded-2xl">
                    <SearchTextComponent 
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />
                </header>
                <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
                    <div className="tracking-widest text-xs title-font font-medium text-blue-300 mb-1">Hits: { data?.GenericProduct?.total }</div>  
                    <div className="custom-screen text-gray-300">
                        <div className="mt-12">
                            <ul className="grid grid-cols-3 gap-10">
                                { data?.GenericProduct?.items?.map((item) => {
                                    return <GenericProductTeaserComponent key="" GenericProductTeaser={item!} />
                                })}
                            </ul>
                        </div>
                    </div>
                 </main>
                </div>
            </div>
        </main>
    )
}
 
export default ProductListingComponent