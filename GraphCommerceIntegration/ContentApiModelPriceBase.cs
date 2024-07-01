using EPiServer;
using EPiServer.Commerce.Catalog.ContentTypes;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using Mediachase.Commerce;
using Mediachase.Commerce.Catalog;
using Mediachase.Commerce.Pricing;

namespace GraphCommerceIntegration
{
    public abstract class ContentApiModelPriceBase : CommerceTypedContentApiModelPropertyBase<double>
    {
        private readonly IPriceService _priceService;

        public ContentApiModelPriceBase(
            ContentTypeModelRepository contentTypeModelRepository,
            IContentLoader contentLoader,
            IPriceService priceService)
            : base(contentTypeModelRepository, contentLoader)
        {
            _priceService = priceService;
        }

        protected abstract IMarket GetMarket();

        public override IEnumerable<Type> GetSupportedTypes()
        {
            yield return typeof(ProductContent);
            yield return typeof(VariationContent);
        }

        public override double NoValue => 0;

        public override double GetValue(IContent content)
        {
            if (content is not EntryContentBase entryContentBase)
            {
                return NoValue;
            }

            var currentMarket = GetMarket();
            var currency = currentMarket?.DefaultCurrency ?? Currency.Empty;

            if (currentMarket != null)
            {
                var variationContent = entryContentBase as VariationContent;
                if (variationContent != null)
                {
                    var catalogKey = new CatalogKey(variationContent.Code);
                    return GetPrice(currentMarket.MarketId, catalogKey, currency);
                }

                var productContent = entryContentBase as ProductContent;
                if (productContent != null)
                {
                    var variationRelations = productContent.GetVariants();
                    var minPrice = double.MaxValue;
                    foreach (var variationRelation in variationRelations)
                    {
                        try
                        {
                            var variation = ContentLoader.Get<VariationContent>(variationRelation);

                            var catalogKey = new CatalogKey(variation.Code);
                            var variationPrice = GetPrice(currentMarket.MarketId, catalogKey, currency);
                            if (variationPrice > 0 && variationPrice < minPrice)
                            {
                                minPrice = variationPrice;
                            }
                        }
                        catch (ContentNotFoundException) { }
                    }

                    if (minPrice != double.MaxValue)
                    {
                        return minPrice;
                    }
                }
            }

            return NoValue;
        }

        private double GetPrice(MarketId marketId, CatalogKey catalogKey, Currency currency)
        {
            var price = _priceService.GetDefaultPrice(marketId, DateTime.UtcNow, catalogKey, currency);
            var amount = price?.UnitPrice.Amount;
            if (amount != null && amount.HasValue)
            {
                return (double)amount.Value;
            }

            return 0;
        }
    }
}
