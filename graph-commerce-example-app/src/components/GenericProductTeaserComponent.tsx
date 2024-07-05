import { FragmentType, graphql, useFragment } from "@/graphql"
import { Dispatch, FC, SetStateAction, useState } from "react"; 

export const GenericProductTeaserFragment = graphql(/* GraphQL */ `
    fragment GenericProductTeaser on GenericProduct {
        Name
        Code
        DefaultMarketPrice
        Brand
        DefaultImageUrl
        _score
    }
`)

interface GenericProductTeaserProps {
    GenericProductTeaser: FragmentType<typeof GenericProductTeaserFragment>
    setSelectedCode: Dispatch<SetStateAction<string>>;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}
 
const GenericProductTeaserComponent: FC<GenericProductTeaserProps> = ({ GenericProductTeaser, setSelectedCode, setShowModal}) => {
    const setSelected = (event: any) => {
        if(event?.target?.id) {
            setSelectedCode(event?.target?.id)
            setShowModal(true)
        }
      }

    const item = useFragment(GenericProductTeaserFragment, GenericProductTeaser)
    const imageUrl = 'https://localhost:44397' + item.DefaultImageUrl
        return (
            <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img src={imageUrl} alt={item.Name ?? ''} id={item.Code ?? ''} onClick={setSelected} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                </div>
                <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" id={item.Code ?? ''} onClick={setSelected} className="inline-flex items-center text-blue-400">
                            {item.Name}
                        </button>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{item.Brand}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${item.DefaultMarketPrice}</p>
                </div>
            </div>
        )
}
 
export default GenericProductTeaserComponent