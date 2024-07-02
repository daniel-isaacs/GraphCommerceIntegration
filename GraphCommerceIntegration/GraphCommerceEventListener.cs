using EPiServer.Core;
using Mediachase.Commerce.Catalog;
using Mediachase.Commerce.Engine.Events;
using Optimizely.ContentGraph.Cms.Core.Internal;

namespace GraphCommerceIntegration
{
    public class GraphCommerceEventListener
    {
        private readonly CatalogKeyEventBroadcaster _catalogKeyEventBroadcaster;
        private readonly ReferenceConverter _referenceConverter;
        private readonly IContentIndexer _contentIndexer;

        public GraphCommerceEventListener(
            CatalogKeyEventBroadcaster catalogKeyEventBroadcaster,
            ReferenceConverter referenceConverter,
            IContentIndexer contentIndexer)
        {
            _catalogKeyEventBroadcaster = catalogKeyEventBroadcaster;
            _referenceConverter = referenceConverter;
            _contentIndexer = contentIndexer;
        }

        public void AddEventListeners()
        {
            _catalogKeyEventBroadcaster.PriceUpdated += PriceUpdated;
        }

        public void RemoveEventListeners()
        {
            _catalogKeyEventBroadcaster.PriceUpdated -= PriceUpdated;
        }

        private void PriceUpdated(object? sender, PriceUpdateEventArgs e)
        {
            var contentLinks = new HashSet<ContentReference>(e.CatalogKeys.Select(catalogKey => _referenceConverter.GetContentLink(catalogKey.CatalogEntryCode)));
            _contentIndexer.IndexAsync(contentLinks);
        }
    }
}
