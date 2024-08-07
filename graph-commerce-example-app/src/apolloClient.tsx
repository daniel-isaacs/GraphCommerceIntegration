import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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
        communicationScript.src = `https://app-ocxcjobe11znb7p003.cms.optimizely.com/Util/javascript/communicationinjector.js`;
        communicationScript.setAttribute('data-nscript', 'afterInteractive')
        document.body.appendChild(communicationScript);
    }
}

if (client === undefined) {
    const httpLink = createHttpLink({
        uri: 'https://cg.optimizely.com/content/v2?auth=5m4F2pBpXPWehc3QGqFfvohgNtgYxHQOxfmKsnqhRYDpZTBU',
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

