using EPiServer;
using EPiServer.Commerce.Catalog.ContentTypes;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using System.Linq.Expressions;
using System.Reflection;

namespace GraphCommerceIntegration
{
    public abstract class ProductAggregationContentApiModelBase<TPropertyType, TProductContent, TVariationContent> : CommerceTypedContentApiModelPropertyBase<List<TPropertyType>>
        where TPropertyType : class
        where TProductContent : ProductContent
        where TVariationContent : VariationContent
    {
        protected ProductAggregationContentApiModelBase(ContentTypeModelRepository contentTypeModelRepository, IContentLoader contentLoader)
            : base(contentTypeModelRepository, contentLoader)
        {
        }

        protected abstract Expression<Func<TVariationContent, TPropertyType>> VariationProperty { get; }

        public override IEnumerable<Type> GetSupportedTypes()
        {
            yield return typeof(TProductContent);
        }

        public override List<TPropertyType> NoValue => [];

        public override List<TPropertyType> GetValue(IContent content)
        {
            if (content is not ProductContent productContent)
            {
                return NoValue;
            }

            var variationRelations = productContent.GetVariants();

            var variationsHashset = new List<TPropertyType>();
            foreach (var variationRelation in variationRelations)
            {
                try
                {
                    var variation = ContentLoader.Get<VariationContent>(variationRelation);

                    var variationPropertyName = GetPropertyName(VariationProperty);
                    if (variation.Property.Contains(variationPropertyName))
                    {
                        var variationValue = variation.Property[variationPropertyName].Value as TPropertyType;
                        if (variationValue != null)
                        {
                            variationsHashset.Add(variationValue);
                        }

                    }
                }
                catch (ContentNotFoundException) { }
            }

            return variationsHashset;
        }

        private PropertyInfo GetPropertyInfo<TType, TReturn>(Expression<Func<TType, TReturn>> property)
        {
            LambdaExpression lambda = property;
            var memberExpression = lambda.Body is UnaryExpression expression
                ? (MemberExpression)expression.Operand
                : (MemberExpression)lambda.Body;

            return (PropertyInfo)memberExpression.Member;
        }

        private string GetPropertyName<TType, TReturn>(Expression<Func<TType, TReturn>> property) => GetPropertyInfo(property).Name;
    }
}
