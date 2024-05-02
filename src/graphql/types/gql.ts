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
    "\n  query Categories {\n    productCategories {\n      nodes {\n        id: databaseId\n        name\n        parentId: parentDatabaseId\n      }\n    }\n  }\n": types.CategoriesDocument,
    "\n  query GetAllProducts(\n    $stockStatus: [StockStatusEnum]\n    $orderBy: [ProductsOrderbyInput]\n    $categoryIdIn: [Int]\n    $q: String\n  ) {\n    products(\n      first: 10\n      where: {\n        stockStatus: $stockStatus\n        orderby: $orderBy\n        categoryIdIn: $categoryIdIn\n        search: $q\n      }\n    ) {\n      pageInfo {\n        total\n        hasNextPage\n        hasPreviousPage\n      }\n      nodes {\n        __typename\n        ... on VariableProduct {\n          databaseId\n          name\n          onSale\n          type\n          averageRating\n          slug\n          image {\n            sourceUrl\n          }\n          price\n          regularPrice\n          salePrice\n          stockStatus\n        }\n      }\n    }\n  }\n": types.GetAllProductsDocument,
    "\n  query GetHomePageSliders {\n    sliderCategories(where: { slug: \"homepage\" }) {\n      nodes {\n        sliders {\n          edges {\n            node {\n              id: databaseId\n              title\n              featuredImage {\n                node {\n                  id: databaseId\n                  url: sourceUrl\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetHomePageSlidersDocument,
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
export function graphql(source: "\n  query Categories {\n    productCategories {\n      nodes {\n        id: databaseId\n        name\n        parentId: parentDatabaseId\n      }\n    }\n  }\n"): (typeof documents)["\n  query Categories {\n    productCategories {\n      nodes {\n        id: databaseId\n        name\n        parentId: parentDatabaseId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllProducts(\n    $stockStatus: [StockStatusEnum]\n    $orderBy: [ProductsOrderbyInput]\n    $categoryIdIn: [Int]\n    $q: String\n  ) {\n    products(\n      first: 10\n      where: {\n        stockStatus: $stockStatus\n        orderby: $orderBy\n        categoryIdIn: $categoryIdIn\n        search: $q\n      }\n    ) {\n      pageInfo {\n        total\n        hasNextPage\n        hasPreviousPage\n      }\n      nodes {\n        __typename\n        ... on VariableProduct {\n          databaseId\n          name\n          onSale\n          type\n          averageRating\n          slug\n          image {\n            sourceUrl\n          }\n          price\n          regularPrice\n          salePrice\n          stockStatus\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllProducts(\n    $stockStatus: [StockStatusEnum]\n    $orderBy: [ProductsOrderbyInput]\n    $categoryIdIn: [Int]\n    $q: String\n  ) {\n    products(\n      first: 10\n      where: {\n        stockStatus: $stockStatus\n        orderby: $orderBy\n        categoryIdIn: $categoryIdIn\n        search: $q\n      }\n    ) {\n      pageInfo {\n        total\n        hasNextPage\n        hasPreviousPage\n      }\n      nodes {\n        __typename\n        ... on VariableProduct {\n          databaseId\n          name\n          onSale\n          type\n          averageRating\n          slug\n          image {\n            sourceUrl\n          }\n          price\n          regularPrice\n          salePrice\n          stockStatus\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetHomePageSliders {\n    sliderCategories(where: { slug: \"homepage\" }) {\n      nodes {\n        sliders {\n          edges {\n            node {\n              id: databaseId\n              title\n              featuredImage {\n                node {\n                  id: databaseId\n                  url: sourceUrl\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetHomePageSliders {\n    sliderCategories(where: { slug: \"homepage\" }) {\n      nodes {\n        sliders {\n          edges {\n            node {\n              id: databaseId\n              title\n              featuredImage {\n                node {\n                  id: databaseId\n                  url: sourceUrl\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;