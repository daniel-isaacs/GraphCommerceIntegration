using EPiServer.Core;
using Mediachase.Commerce.Catalog;
using Optimizely.ContentGraph.Cms.Services.Internal;

namespace GraphCommerceIntegration
{
    public class CommerceIndexTarget : IIndexTarget
    {
        private readonly ReferenceConverter _referenceConverter;

        public CommerceIndexTarget(ReferenceConverter referenceConverter)
        {
            _referenceConverter = referenceConverter;
        }

        ContentReference IIndexTarget.ContentRoot => _referenceConverter.GetRootLink();
    }
}
