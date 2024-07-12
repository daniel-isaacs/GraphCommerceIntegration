using Optimizely.ContentGraph.Cms.NetCore.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphCommerceIntegration
{
    public class ProductVariationLink : IGraphLink
    {
        public string Name => "ProductVariation";

        public string From => "VariationIDs";

        public string To => "ContentLink.Id";
    }
}
