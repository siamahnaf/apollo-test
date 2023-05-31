import { useMemo } from "react";
import {
    ApolloClient,
    InMemoryCache,
    type NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash-es/isEqual';

const API_URL = "https://jv6hfhcmdby7cq2biaf6jnlehy.srv.us/ecampus";

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        uri: API_URL,
        cache: new InMemoryCache(),
        credentials: 'include'
    });
}

export function initializeApollo(initialState?: any) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        const existingCache = _apolloClient.cache.extract();

        const data = merge(initialState, existingCache, {
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        });
        console.log("beforeRestore", data);
        _apolloClient.cache.restore(data);
    }

    if (typeof window === 'undefined') {
        return _apolloClient;
    }

    if (!apolloClient) {
        apolloClient = _apolloClient;
    }

    return _apolloClient;
}

export function addApolloState(
    client: ApolloClient<NormalizedCacheObject>,
    pageProps: any
) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(pageProps: any) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const client = useMemo(() => initializeApollo(state), [state]);
    return client;
}