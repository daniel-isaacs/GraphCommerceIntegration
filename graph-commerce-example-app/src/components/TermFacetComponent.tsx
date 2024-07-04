import { StringFacet } from "@/graphql/graphql"
import { Dispatch, FC, SetStateAction } from "react"

interface TermFacetProps {
    headingText: string
    values: string[]
    facet: StringFacet[] | null
    setValues: Dispatch<SetStateAction<string[]>>;
}

const TermFacetComponent: FC<TermFacetProps> = ({ headingText, values, facet, setValues }) => {

    const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        let localValues = Array.from(values)
        if(event.target.checked) {
            localValues.push(event.target.id);
        }
        else {
            localValues = localValues.filter(x => x !== event.target.id);
        }
        setValues(localValues);
    };

    return (
      <div className="border-b border-gray-200 py-6">
        <h3 className="-my-3 flow-root">{ headingText }</h3>
        <div className="pt-6" id="filter-section-0">
          <div className="space-y-4">
            
              { facet?.map((item, idx) => {
                  return (
                    <div className="flex items-center" key={idx}>
                      <input id={item?.name ?? ''} name="color[]" value={item?.name ?? ''} checked={values.indexOf(item?.name ?? '') > -1 } onChange={handleSelection} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                      <label htmlFor="filter-color-0" className="ml-3 text-sm text-gray-600">{ item?.name } ({ item?.count })</label>
                    </div>
                  )
              }) }
          </div>
        </div>
      </div>
    )
}

export default TermFacetComponent