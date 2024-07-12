using Optimizely.ContentGraph.Cms.NetCore.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphCommerceIntegration
{
    public class VariationProductLink : IGraphLink
    {
        public string Name => "VariationProduct";

        public string From => "ContentLink.Id";

        public string To => "ProductIDs";
    }
}
