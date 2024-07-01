using EPiServer;
using EPiServer.Commerce.Catalog.ContentTypes;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using Mediachase.Commerce.Catalog;
using Microsoft.Extensions.Options;
using Optimizely.ContentGraph.Cms.Configuration;
using Optimizely.ContentGraph.Cms.Core.Internal;

namespace GraphCommerceIntegration
{
    public class GraphCommerceLanguagesResolver : ILanguagesResolver
    {
        private readonly LanguagesResolver _defaultLanguageResolver;
        private readonly ReferenceConverter _referenceConverter;
        private readonly IContentLoader _contentLoader;

        public GraphCommerceLanguagesResolver(
            ReferenceConverter referenceConverter, 
            IContentLoader contentLoader,
            ILanguageBranchRepository languageBranchRepository, 
            IContentProviderManager contentProviderManager, 
            IContentVersionRepository contentVersionRepository, 
            IOptions<QueryOptions> ogOptionsAccessor)
        {
            _defaultLanguageResolver = new LanguagesResolver(languageBranchRepository, contentProviderManager, contentVersionRepository, ogOptionsAccessor);
            _referenceConverter = referenceConverter;
            _contentLoader = contentLoader;
        }

        public IEnumerable<string> GetUsedLanguages()
        {
            var languages = new HashSet<string>(_defaultLanguageResolver.GetUsedLanguages());

            var rootCatalogLink = _referenceConverter.GetRootLink();
            var catalogs = _contentLoader.GetChildren<CatalogContent>(rootCatalogLink);
            foreach(var catalog in catalogs)
            {
                foreach (var catalogLanguage in catalog.CatalogLanguages)
                {
                    languages.Add(catalogLanguage);
                }
            }

            return languages.ToList();
        }
    }
}
