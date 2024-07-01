using EPiServer;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using Optimizely.ContentGraph.Cms.Core.ContentApiModelProperties.Internal;

namespace GraphCommerceIntegration
{
    public abstract class CommerceTypedContentApiModelPropertyBase<T> : ITypedContentApiModelProperty
    {
        private readonly ContentTypeModelRepository _contentTypeModelRepository;
        private readonly Lazy<IEnumerable<Type>> _supportedTypes;

        protected IContentLoader ContentLoader { get; private set; }

        public CommerceTypedContentApiModelPropertyBase(
            ContentTypeModelRepository contentTypeModelRepository,
            IContentLoader contentLoader)
        {
            ContentLoader = contentLoader;
            _contentTypeModelRepository = contentTypeModelRepository;
            _supportedTypes = new Lazy<IEnumerable<Type>>(ResolveSupportedTypes);
        }

        private IEnumerable<Type> ResolveSupportedTypes()
        {
            var types = new HashSet<Type>();
            foreach (var contentTypeModel in _contentTypeModelRepository.List())
            {
                foreach (var item in GetSupportedTypes())
                {
                    if (item.IsAssignableFrom(contentTypeModel.ModelType))
                    {
                        types.Add(contentTypeModel.ModelType);
                        break;
                    }
                }
            }

            return types;
        }

        public abstract string Name { get; }

        public abstract IEnumerable<Type> GetSupportedTypes();

        public abstract T GetValue(IContent content);

        public abstract T NoValue { get; }

        public Type[] ContentTypes => _supportedTypes.Value.ToArray();

        public object GetValue(ContentApiModel contentApiModel)
        {
            Guid? guid = contentApiModel.ContentLink?.GuidValue;
            if (!guid.HasValue)
            {
                return NoValue;
            }

            IContent content;
            try
            {
                content = ContentLoader.Get<IContent>(guid.Value);
            }
            catch (ContentNotFoundException)
            {
                return NoValue;
            }

            var value = GetValue(content);
            if (value == null)
            {
                return NoValue;
            }

            return value;
        }
    }
}
