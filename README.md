# Example repository for integrating Optimizely Customizable Commerce with Optimizely Graph
This repository is an example implementation for integrating Customizable Commerce with Optimizely Graph. The repository contains mostly base classes, where you will have to create a concreat implementation on top of the base classes to get functionality in place (see examples using Foundation site below).

## Try our pre-configured Graph account for Foundation site
Product listing, with facets and search functionality, is an important peice on Commerce sites. The following query is an example for the Foundation site (see more information how it was added below) that solves product listing using Graph:

https://cg.optimizely.com/app/graphiql?auth=5m4F2pBpXPWehc3QGqFfvohgNtgYxHQOxfmKsnqhRYDpZTBU
```
query ProductListing(
  $languages: [Locales] = en, 
  $searchText: String, 
  $brands: [String!], 
  $sizes: [String!], 
  $colors: [String!], 
  $minPrice: Float, 
  $maxPrice: Float, 
  $skip: Int = 0, 
  $limit: Int = 10, 
  $order: GenericProductOrderByInput = { _ranking: SEMANTIC, DefaultMarketPrice: ASC }
) {
  GenericProduct(
    locale: $languages
    where: {
      _fulltext: { match: $searchText }
      DefaultMarketPrice: { gte: $minPrice, lte: $maxPrice }
    }
    skip: $skip
    limit: $limit
    orderBy: $order
  ) {
    total
    items {
      Name
      Code
      ProductTeaser
      DefaultMarketPrice
      Brand
      DefaultImageUrl
    }
    facets {
      Brand(filters: $brands) {
        name
        count
      }
      Sizes(filters: $sizes, orderType: COUNT) {
        name
        count
      }
      Colors(filters: $colors, orderType: COUNT) {
        name
        count
      }
      DefaultMarketPrice(
        ranges: [
          { to: 100 }
          { from: 100, to: 200 }
          { from: 200, to: 300 }
          { from: 300, to: 400 }
          { from: 400, to: 500 }
          { from: 500, to: 600 }
          { from: 600, to: 700 }
          { from: 700, to: 800 }
          { from: 800, to: 900 }
          { from: 900, to: 1000 }
          { from: 1000 }
        ]
      ) {
        name
        count
      }
    }
  }
}
```

You can test using different variable values, for example
```
{
  "colors": [
    "BLACK",
    "WHITE",
    "NAVY"
  ],
  "brands": [
    "Eurostep",
    "Bonus"
  ]
}
```
![image](https://github.com/jonasbergqvist/GraphCommerceIntegration/assets/1702570/6539b422-5b8e-4187-8c6c-910bc1130957)

## Classes in the repository

### ServiceCollectionExtensions
Contains the method 'AddCommerceGraph', which will register services in 'IServiceCollection'. This needs to be registered in Startup.cs in the site that will use the integration.

#### Example of register ServiceCollectionExtensions
```
    public class Startup
    {
        ...
        
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
          ...
            services.AddContentGraph(x =>
            {
                x.IncludeInheritanceInContentType = true;
                x.PreventFieldCollision = true;
            });
        }

        ...
      }
```

### CommerceIndexTarget
Makes the 'Optimizely Graph content synchronization job' include Commerce content when sending all content from the site to Graph

### GraphCommerceLanguagesResolver
Includes languages, that has been configured on catalog level, when pushing language information to Graph.

### CommerceTypedContentApiModelPropertyBase
Base type for adding custom logic to content. Other base classes in the repository is inheriting from this class.

### ContentApiModelPriceBase
Base class for prices. This base class makes it easy to include price information to Graph.

#### Example
```
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
```
### ProductAggregationContentApiModelBase
Base class for aggregating values in variation content to product content

#### Examples
```
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
```

```
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
```

### CommerceAssetApiModelBase
Base class for commerce assets.

#### Example
```
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
```

## Examples when using Foundation site
I have created some examples using the Foundation project (https://github.com/episerver/Foundation), where I'm using this repository to get commerce content and prices send to Graph. I have also added aggregated values for "Color" and "Size" from variations to products, which makes it possible to create a great product listing page.

The Foundation site must be configured with a Graph account to make it work (https://docs.developers.optimizely.com/content-management-system/docs/install-and-configure-optimizely-graph-on-your-site). You can start with trying to query content using a Graph account I have created, and where I have already pushed content from the Foundation site to Graph.

### Try it yourself using Foundation site
1. Clone this repository
2. Add a dependency to this repository from the Foundation project
3. Add the following classes (below) to the Foundation project
4. Start the Foundation site
5. Configure the Foundation site to use a Graph account
6. Run the "Optimizely Graph content synchronization job"}

#### Add Commerce Graph in Startup.cs
Add the following to ConfigureServices method in Startup.cs
```
services.AddCommerceGraph();
```

#### Default price for current market
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

#### Default image url for products and variations
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

#### Aggregated Colors on Product
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

#### Aggregated Sizes on Product
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
