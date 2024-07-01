using EPiServer;
using EPiServer.Commerce.Catalog.ContentTypes;
using EPiServer.Commerce.SpecializedProperties;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Web.Routing;

namespace GraphCommerceIntegration
{
    public abstract class CommerceAssetApiModelBase<T> : CommerceTypedContentApiModelPropertyBase<T>
    {
        private readonly IUrlResolver _urlResolver;

        protected CommerceAssetApiModelBase(ContentTypeModelRepository contentTypeModelRepository, IContentLoader contentLoader, IUrlResolver urlResolver)
            : base(contentTypeModelRepository, contentLoader)
        {
            _urlResolver = urlResolver;
        }

        protected abstract T GetAssets(IEnumerable<CommerceMedia> commerceMediaItems);

        public override IEnumerable<Type> GetSupportedTypes()
        {
            yield return typeof(ProductContent);
            yield return typeof(VariationContent);
        }

        public override T GetValue(IContent content)
        {
            var assetContainer = content as IAssetContainer;
            if(assetContainer == null)
            {
                return NoValue;
            }

            if(assetContainer.CommerceMediaCollection == null)
            {
                return NoValue;
            }

            return GetAssets(assetContainer.CommerceMediaCollection);
        }

        protected string GetUrl(CommerceMedia commeceMedia)
        {
            return _urlResolver.GetUrl(commeceMedia.AssetLink);
        }
    }
}
