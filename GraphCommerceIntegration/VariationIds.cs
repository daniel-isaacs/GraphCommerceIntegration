using EPiServer;
using EPiServer.Commerce.Catalog.ContentTypes;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;
using Optimizely.ContentGraph.Cms.Core.ContentApiModelProperties.Internal;

namespace GraphCommerceIntegration
{
    [ServiceConfiguration(typeof(IContentApiModelProperty), Lifecycle = ServiceInstanceScope.Singleton)]

    public class VariationIds : CommerceTypedContentApiModelPropertyBase<List<int>>
    {
        public VariationIds(ContentTypeModelRepository contentTypeModelRepository, IContentLoader contentLoader) : base(contentTypeModelRepository, contentLoader)
        {
        }

        public override string Name => "VariationIDs";

        public override List<int> NoValue => [];

        public override IEnumerable<Type> GetSupportedTypes()
        {
            return new List<Type> { typeof(ProductContent) };
        }

        public override List<int> GetValue(IContent content)
        {
            var productContent = content as ProductContent;
            return productContent.GetVariantRelations().Select(x => x.Child.ID).ToList();
        }
    }
}
