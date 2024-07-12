using Microsoft.Extensions.DependencyInjection;
using Optimizely.ContentGraph.Cms.Core.Internal;
using Optimizely.ContentGraph.Cms.NetCore.Core;
using Optimizely.ContentGraph.Cms.Services.Internal;

namespace GraphCommerceIntegration
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCommerceGraph(
            this IServiceCollection services)
        {
            services.AddSingleton<IIndexTarget, CommerceIndexTarget>();
            services.AddSingleton<ILanguagesResolver, GraphCommerceLanguagesResolver>();

            services.AddSingleton<IGraphLink, VariationProductLink>();
            services.AddSingleton<IGraphLink, ProductVariationLink>();

            services.AddSingleton<GraphCommerceEventListener>();

            return services;
        }
    }
}
