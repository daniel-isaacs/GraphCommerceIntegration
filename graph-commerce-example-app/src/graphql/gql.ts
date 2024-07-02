/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    fragment GenericProductTeaser on GenericProduct {\n        Name\n        Code\n        ProductTeaser\n        DefaultMarketPrice\n        Brand\n        DefaultImageUrl\n    }\n": types.GenericProductTeaserFragmentDoc,
    "\n    query ProductListing(\n        $languages: [Locales] = en\n        $searchText: String,\n        $brands: [String!],\n        $sizes: [String!],\n        $colors: [String!],\n        $minPrice: Float,\n        $maxPrice: Float,\n        $skip: Int = 0,\n        $limit: Int = 10,\n        $order: GenericProductOrderByInput = {       \n            _ranking: SEMANTIC,\n            DefaultMarketPrice: ASC \n        }\n        )\n        {\n        GenericProduct(\n            locale: $languages\n            where:{\n                _fulltext: {\n                    match: $searchText\n                }\n                DefaultMarketPrice: {\n                    gte: $minPrice\n                    lte: $maxPrice\n                }\n            }\n            skip: $skip,\n            limit: $limit\n            orderBy: $order\n        ) {\n            total\n            items {\n                ...GenericProductTeaser\n            }\n            facets {\n                Brand(filters: $brands) {\n                    name\n                    count\n                }\n                Sizes(filters:$sizes) {\n                    name\n                    count\n                }\n                Colors(filters:$colors) {\n                    name\n                    count\n                }\n                DefaultMarketPrice(ranges: [\n                    { to: 100 },\n                    { from: 100, to: 200 },\n                    { from: 200, to: 300 },\n                    { from: 300, to: 400 },\n                    { from: 400, to: 500 },\n                    { from: 500, to: 600 },\n                    { from: 600, to: 700 },\n                    { from: 700, to: 800 },\n                    { from: 800, to: 900 },\n                    { from: 900, to: 1000 },\n                    { from: 1000 },\n                ]) {\n                    name\n                    count\n                }\n            }\n        }\n    }\n": types.ProductListingDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment GenericProductTeaser on GenericProduct {\n        Name\n        Code\n        ProductTeaser\n        DefaultMarketPrice\n        Brand\n        DefaultImageUrl\n    }\n"): (typeof documents)["\n    fragment GenericProductTeaser on GenericProduct {\n        Name\n        Code\n        ProductTeaser\n        DefaultMarketPrice\n        Brand\n        DefaultImageUrl\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ProductListing(\n        $languages: [Locales] = en\n        $searchText: String,\n        $brands: [String!],\n        $sizes: [String!],\n        $colors: [String!],\n        $minPrice: Float,\n        $maxPrice: Float,\n        $skip: Int = 0,\n        $limit: Int = 10,\n        $order: GenericProductOrderByInput = {       \n            _ranking: SEMANTIC,\n            DefaultMarketPrice: ASC \n        }\n        )\n        {\n        GenericProduct(\n            locale: $languages\n            where:{\n                _fulltext: {\n                    match: $searchText\n                }\n                DefaultMarketPrice: {\n                    gte: $minPrice\n                    lte: $maxPrice\n                }\n            }\n            skip: $skip,\n            limit: $limit\n            orderBy: $order\n        ) {\n            total\n            items {\n                ...GenericProductTeaser\n            }\n            facets {\n                Brand(filters: $brands) {\n                    name\n                    count\n                }\n                Sizes(filters:$sizes) {\n                    name\n                    count\n                }\n                Colors(filters:$colors) {\n                    name\n                    count\n                }\n                DefaultMarketPrice(ranges: [\n                    { to: 100 },\n                    { from: 100, to: 200 },\n                    { from: 200, to: 300 },\n                    { from: 300, to: 400 },\n                    { from: 400, to: 500 },\n                    { from: 500, to: 600 },\n                    { from: 600, to: 700 },\n                    { from: 700, to: 800 },\n                    { from: 800, to: 900 },\n                    { from: 900, to: 1000 },\n                    { from: 1000 },\n                ]) {\n                    name\n                    count\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query ProductListing(\n        $languages: [Locales] = en\n        $searchText: String,\n        $brands: [String!],\n        $sizes: [String!],\n        $colors: [String!],\n        $minPrice: Float,\n        $maxPrice: Float,\n        $skip: Int = 0,\n        $limit: Int = 10,\n        $order: GenericProductOrderByInput = {       \n            _ranking: SEMANTIC,\n            DefaultMarketPrice: ASC \n        }\n        )\n        {\n        GenericProduct(\n            locale: $languages\n            where:{\n                _fulltext: {\n                    match: $searchText\n                }\n                DefaultMarketPrice: {\n                    gte: $minPrice\n                    lte: $maxPrice\n                }\n            }\n            skip: $skip,\n            limit: $limit\n            orderBy: $order\n        ) {\n            total\n            items {\n                ...GenericProductTeaser\n            }\n            facets {\n                Brand(filters: $brands) {\n                    name\n                    count\n                }\n                Sizes(filters:$sizes) {\n                    name\n                    count\n                }\n                Colors(filters:$colors) {\n                    name\n                    count\n                }\n                DefaultMarketPrice(ranges: [\n                    { to: 100 },\n                    { from: 100, to: 200 },\n                    { from: 200, to: 300 },\n                    { from: 300, to: 400 },\n                    { from: 400, to: 500 },\n                    { from: 500, to: 600 },\n                    { from: 600, to: 700 },\n                    { from: 700, to: 800 },\n                    { from: 800, to: 900 },\n                    { from: 900, to: 1000 },\n                    { from: 1000 },\n                ]) {\n                    name\n                    count\n                }\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;