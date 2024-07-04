import { FragmentType, graphql, useFragment } from "@/graphql"

export const GenericProductTeaserFragment = graphql(/* GraphQL */ `
    fragment GenericProductTeaser on GenericProduct {
        Name
        Code
        ProductTeaser
        DefaultMarketPrice
        Brand
        DefaultImageUrl
        _score
    }
`)
 
const GenericProductTeaserComponent = (props: {
    GenericProductTeaser: FragmentType<typeof GenericProductTeaserFragment>
}) => {
    const item = useFragment(GenericProductTeaserFragment, props.GenericProductTeaser)
    const imageUrl = 'https://localhost:44397' + item.DefaultImageUrl
        return (
            <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src={imageUrl} alt={item.Name ?? ''} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                </div>
                <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                    <a href="#">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {item.Name}
                    </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{item.Brand}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${item.DefaultMarketPrice}</p>
                </div>
            </div>
        )
}
 
export default GenericProductTeaserComponent