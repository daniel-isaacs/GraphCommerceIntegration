import { FragmentType, graphql, useFragment } from "@/graphql"

export const GenericProductTeaserFragment = graphql(/* GraphQL */ `
    fragment GenericProductTeaser on GenericProduct {
        Name
        Code
        ProductTeaser
        DefaultMarketPrice
        Brand
        DefaultImageUrl
    }
`)
 
const GenericProductTeaserComponent = (props: {
    GenericProductTeaser: FragmentType<typeof GenericProductTeaserFragment>
}) => {
    const item = useFragment(GenericProductTeaserFragment, props.GenericProductTeaser)
        return (
            <li className="" key={item.Code} style={{ background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"}}>
            
                <div className="p-8">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{ item.Brand }</h2>
                <h3 className="text-gray-50 text-xl font-semibold">
                    <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" id={item.Code ?? ''} className="inline-flex items-center text-blue-400">
                    {item.Name}
                    </button>
                </h3>
                </div>
                <div className="pl-8">

                </div>
            </li>
        )
}
 
export default GenericProductTeaserComponent