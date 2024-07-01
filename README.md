# Examples when using Foundation site
1. Clone this repository
2. Add a dependency to this repository from the Foundation project
3. Add the following classes (below) to the Foundation project
4. Start the Foundation site
5. Configure the Foundation site to use a Graph account
6. Run the "Optimizely Graph content synchronization job"

## Default price for current market
    [ServiceConfiguration(typeof(IContentApiModelProperty), Lifecycle = ServiceInstanceScope.Singleton)]
    public class DefaultPriceContentApiModel : ContentApiModelPriceBase
    {
        private readonly ICurrentMarket _currentMarketService;

        public DefaultPriceContentApiModel(
            ContentTypeModelRepository contentTypeModelRepository,
            IContentLoader contentLoader,
            IPriceService priceService,
            ICurrentMarket currentMarketService)
            : base(contentTypeModelRepository, contentLoader, priceService)
        {
            _currentMarketService = currentMarketService;
        }

        public override string Name => "DefaultMarketPrice";

        protected override IMarket GetMarket()
        {
            return _currentMarketService.GetCurrentMarket();
        }
    }

## Default image url for products and variations
    [ServiceConfiguration(typeof(IContentApiModelProperty), Lifecycle = ServiceInstanceScope.Singleton)]
    public class DefaultImageUrlContentApiModel : CommerceAssetApiModelBase<string>
    {
        public DefaultImageUrlContentApiModel(ContentTypeModelRepository contentTypeModelRepository, IContentLoader contentLoader, IUrlResolver urlResolver)
            : base(contentTypeModelRepository, contentLoader, urlResolver)
        {
        }

        public override string Name => "DefaultImageUrl";

        public override string NoValue => string.Empty;

        protected override string GetAssets(IEnumerable<CommerceMedia> commerceMediaItems)
        {
            foreach(CommerceMedia media in commerceMediaItems.OrderBy(x => x.SortOrder))
            {
                if (ContentLoader.TryGet<IContentImage>(media.AssetLink, out var contentMedia))
                {
                    return GetUrl(media);
                }
            }

            return NoValue;
        }
    }

## Aggregated Colors on Product
    [ServiceConfiguration(typeof(IContentApiModelProperty), Lifecycle = ServiceInstanceScope.Singleton)]
    public class ColorContentApiModel : ProductAggregationContentApiModelBase<string, GenericProduct, GenericVariant>
    {
        public ColorContentApiModel(ContentTypeModelRepository contentTypeModelRepository, IContentLoader contentLoader)
            : base(contentTypeModelRepository, contentLoader)
        {
        }

        public override string Name => "Colors";

        protected override Expression<Func<GenericVariant, string>> VariationProperty => (x) => x.Color;
    }

## Aggregated Sizes on Product
    [ServiceConfiguration(typeof(IContentApiModelProperty), Lifecycle = ServiceInstanceScope.Singleton)]
    public class SizeContentApiModel : ProductAggregationContentApiModelBase<string, GenericProduct, GenericVariant>
    {
        public SizeContentApiModel(ContentTypeModelRepository contentTypeModelRepository, IContentLoader contentLoader)
            : base(contentTypeModelRepository, contentLoader)
        {
        }

        public override string Name => "Sizes";

        protected override Expression<Func<GenericVariant, string>> VariationProperty => (x) => x.Size;
    }
