import React, { FC, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { graphql } from '@/graphql'
import { GenericProductOrderByInput, NumberFacet, OrderBy, Ranking, StringFacet } from '@/graphql/graphql'
import TermFacetComponent from './TermFacetComponent'
import SearchTextComponent from './SearchTextComponent'
import GenericProductTeaserComponent from './GenericProductTeaserComponent'
import OrderByComponent from './OrderByCompontent'
import RangeFacetComponent from './RangeFacetComponent'
 
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
                _or:[
                    {
					    _fulltext: {
                            match: $searchText
                        }
                    },
                    {
						Name: {
                            match: $searchText
                            boost: 20
                        }
                    }
                ]
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
                    { to: 50 },
                    { from: 51, to: 100 },
                    { from: 101, to: 150 },
                    { from: 151, to: 200 },
                    { from: 201, to: 250 },
                    { from: 251, to: 300 },
                    { from: 301, to: 350 },
                    { from: 351, to: 400 },
                    { from: 401, to: 450 },
                    { from: 451, to: 500 },
                    { from: 501 },
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
    const [orderByInput, setOrderByInput] = useState(() => 'DefaultMarketPrice');
    const [orderByDirection, setOrderByDirection] = useState(() => OrderBy.Asc);

    const [brands, setBrands] = useState(() => new Array<string>());
    const [brandFacet, setBrandFacet] = useState(() => new Array<StringFacet>())

    const [colors, setColors] = useState(() => new Array<string>());
    const [colorFacet, setColorFacet] = useState(() => new Array<StringFacet>())

    const [sizes, setSizes] = useState(() => new Array<string>());
    const [sizeFacet, setSizeFacet] = useState(() => new Array<StringFacet>())

    const [lowPrice, setLowPrice] = useState(() => 0);
    const [highPrice, setHighPrice] = useState(() => 600)

    const { data } = useQuery(ProductListing, { 
        variables: { 
            searchText, 
            brands, 
            colors, 
            sizes,
            minPrice: lowPrice,
            maxPrice: highPrice,
            order: getOrder()
        } 
    })

    function getOrder(): GenericProductOrderByInput {
        if(orderByInput === "Name") {
            return { _ranking: Ranking.Semantic, Name: orderByDirection }
        } else if (orderByInput === "Brand") {
            return { _ranking: Ranking.Semantic, Brand: orderByDirection }
        } else {
            return { _ranking: Ranking.Semantic, DefaultMarketPrice: orderByDirection }
        }
    }

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
        <main>
            <div className="flex">
            <div className="relative hidden lg:block w-80">
                <div className="h-full rounded-2xl ml-4 bg-slate-50">
                    
                    <nav className="mt-2 ml-4 mr-4">
                        <div>
                            <RangeFacetComponent
                                headingText='Price range'
                                currentHighValue={highPrice}
                                setHighValue={setHighPrice}
                                setLowValue={setLowPrice}
                                currentLowValue={lowPrice}
                                minValue={0}
                                maxValue={600}
                                facet={data?.GenericProduct?.facets?.DefaultMarketPrice as NumberFacet[]}
                            />
                        </div>
                    </nav>

                    <nav className="mt-2 ml-4">
                        <div>
                            <TermFacetComponent
                                headingText='Brands'
                                facet={brandFacet}
                                values={brands}
                                setValues={setBrands}
                            />
                        </div>
                    </nav>

                    <nav className="mt-2 ml-4">
                        <div>
                            <TermFacetComponent
                                headingText='Colors'
                                facet={colorFacet}
                                values={colors}
                                setValues={setColors}
                            />
                        </div>
                    </nav>

                    <nav className="mt-2 ml-4">
                        <div>
                            <TermFacetComponent
                                headingText='Sizes'
                                facet={sizeFacet}
                                values={sizes}
                                setValues={setSizes}
                            />
                        </div>
                    </nav>
                </div>
            </div>
            
            <div className="w-full pl-0 md:p-2">
                <header className="z-40 items-center w-full h-16 shadow-lg rounded-2xl bg-slate-50">
                    <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center"  style={{ background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"}}>
                        <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0 ">
                            <SearchTextComponent 
                                searchText={searchText}
                                setSearchText={setSearchText}
                             />
                            <div className='mt-2 ml-4'>
                                <OrderByComponent 
                                    orderBy={orderByInput} 
                                    setorderBy={setOrderByInput}
                                    orderByDirection={orderByDirection}
                                    setorderByDirection={setOrderByDirection}
                                />
                            </div>
                        </div>
                    </div>
                </header>
                <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
                    <div className="tracking-widest text-lg title-font font-medium  mb-1">Hits: { data?.GenericProduct?.total }</div>  
                    
                    <div className="custom-screen ">
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