import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GRAPH_SINGLE_KEY = process.env.GRAPH_SINGLE_KEY
const OPTIMIZELY_CMS_URL = process.env.OPTIMIZELY_CMS_URL

let client: ApolloClient<any> | undefined = undefined;

if (typeof window !== "undefined" && window.location !== undefined) {
    const queryString = window?.location?.search;
    const urlParams = new URLSearchParams(queryString);
    const preview_token = urlParams.get('preview_token') ?? undefined;

    if (preview_token) {
        const httpLink = createHttpLink({
            uri: 'https://cg.optimizely.com/content/v2',
        });

        const authLink = setContext((_, { headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${preview_token}`
                }
            };
        });

        client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        });

        const communicationScript = document.createElement('script');
        communicationScript.src = `${OPTIMIZELY_CMS_URL}/Util/javascript/communicationinjector.js`;
        communicationScript.setAttribute('data-nscript', 'afterInteractive')
        document.body.appendChild(communicationScript);
    }
}

if (client === undefined) {
    const httpLink = createHttpLink({
        uri: `https://cg.optimizely.com/content/v2?auth=${GRAPH_SINGLE_KEY}`,
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers
            }
        };
    });

    client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });
}

export default client;

