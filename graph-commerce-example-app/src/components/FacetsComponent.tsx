import { StringFacet } from "@/graphql/graphql"
import { Dispatch, FC, SetStateAction } from "react"

interface FacetsProps {
    brands: string[]
    brandFacet: StringFacet[] | null
    setBrands: Dispatch<SetStateAction<string[]>>;
}

const FacetsComponent: FC<FacetsProps> = ({ brands, brandFacet, setBrands }) => {

    const handleGenreSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        let localBrands = Array.from(brands)
        if(event.target.checked) {
            localBrands.push(event.target.id);
        }
        else {
            localBrands = localBrands.filter(x => x !== event.target.id);
        }
        setBrands(localBrands);
    };

    return (
        <div className="" style={{ background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"}}>
            <div className="p-8">
              <h3 className="bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto" style={{ backgroundImage: "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)" }}>
                  Genre
              </h3>
             </div>
            <div className="pl-8">
              <ul className="list-disc pl-5">
                { brandFacet?.map((item, idx) => {
                  return (
                    <li className="flex items-center mb-4" key={idx}>
                        <input id={item?.name ?? ''} checked={brands.indexOf(item?.name ?? '') > -1 } onChange={handleGenreSelection} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label className="ml-2 text-sm font-medium text-gray-300 dark:text-gray-300">{ item?.name } ({ item?.count })</label>
                      </li>
                  )
                }) }
              </ul>
            </div>
        </div>
    )
}

export default FacetsComponent