using EPiServer;
using EPiServer.Commerce.Catalog.ContentTypes;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;
using Optimizely.ContentGraph.Cms.Core.ContentApiModelProperties.Internal;

namespace GraphCommerceIntegration
{
    [ServiceConfiguration(typeof(IContentApiModelProperty), Lifecycle = ServiceInstanceScope.Singleton)]

    public class ProductIds : CommerceTypedContentApiModelPropertyBase<List<int>>
    {
        public ProductIds(ContentTypeModelRepository contentTypeModelRepository, IContentLoader contentLoader) : base(contentTypeModelRepository, contentLoader)
        {
        }

        public override string Name => "ProductIDs";

        public override List<int> NoValue => [];

        public override IEnumerable<Type> GetSupportedTypes()
        {
            return new List<Type> { typeof(VariationContent) };
        }

        public override List<int> GetValue(IContent content)
        {
            var variationContent = content as VariationContent;
            return variationContent.GetParentProducts().Select(x => x.ID).ToList();
        }
    }
}
