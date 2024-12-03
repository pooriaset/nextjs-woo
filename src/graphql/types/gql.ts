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
    "\n  mutation LoginUser($username: String!, $password: String!) {\n    login(input: { username: $username, password: $password }) {\n      accessToken: authToken\n      refreshToken\n      user {\n        id\n        name\n      }\n    }\n  }\n": types.LoginUserDocument,
    "\n  fragment ProductContentSlice on Product {\n    id\n    databaseId\n    name\n    slug\n    type\n    image {\n      id\n      sourceUrl(size: WOOCOMMERCE_THUMBNAIL)\n      altText\n    }\n    ... on SimpleProduct {\n      price\n      regularPrice\n      soldIndividually\n    }\n    ... on VariableProduct {\n      price\n      regularPrice\n      soldIndividually\n    }\n  }\n": types.ProductContentSliceFragmentDoc,
    "\n  fragment ProductVariationContentSlice on ProductVariation {\n    id\n    databaseId\n    name\n    slug\n    attributes {\n      nodes {\n        id\n        label\n        value\n        name\n      }\n    }\n    image {\n      id\n      sourceUrl(size: WOOCOMMERCE_THUMBNAIL)\n      altText\n    }\n    price\n    regularPrice\n    salePrice\n    discountAmount\n    discountPercentage\n    stockStatus\n  }\n": types.ProductVariationContentSliceFragmentDoc,
    "\n  fragment CartItemContent on CartItem {\n    key\n    product {\n      node {\n        ...ProductContentSlice\n      }\n    }\n    variation {\n      node {\n        ...ProductVariationContentSlice\n      }\n    }\n    quantity\n    total\n    subtotal\n    subtotalTax\n    totalOnSaleDiscount\n    extraData {\n      key\n      value\n    }\n  }\n  \n  \n": types.CartItemContentFragmentDoc,
    "\n  fragment CartContent on Cart {\n    contents(first: 100) {\n      itemCount\n      nodes {\n        ...CartItemContent\n      }\n    }\n    appliedCoupons {\n      code\n      discountAmount\n      discountTax\n    }\n    needsShippingAddress\n    availableShippingMethods {\n      rates {\n        id\n        instanceId\n        methodId\n        label\n        cost\n      }\n    }\n    chosenShippingMethods\n    subtotal(format: RAW)\n    subtotalTax(format: RAW)\n    shippingTax(format: RAW)\n    shippingTotal(format: RAW)\n    total(format: RAW)\n    totalTax(format: RAW)\n    feeTax(format: RAW)\n    feeTotal(format: RAW)\n    discountTax(format: RAW)\n    discountTotal(format: RAW)\n    fees {\n      id\n      name\n      total\n    }\n    appliedCoupons {\n      description\n      code\n      description\n      discountAmount\n    }\n  }\n  \n": types.CartContentFragmentDoc,
    "\n  mutation AddToCart(\n    $productId: Int!\n    $variationId: Int\n    $quantity: Int\n    $extraData: String\n  ) {\n    addToCart(\n      input: {\n        productId: $productId\n        variationId: $variationId\n        quantity: $quantity\n        extraData: $extraData\n      }\n    ) {\n      cart {\n        ...CartContent\n      }\n      cartItem {\n        ...CartItemContent\n      }\n    }\n  }\n  \n  \n": types.AddToCartDocument,
    "\n  mutation ApplyCoupon($code: String!) {\n    applyCoupon(input: { code: $code }) {\n      clientMutationId\n      applied {\n        description\n        code\n        discountAmount\n      }\n    }\n  }\n": types.ApplyCouponDocument,
    "\n  mutation UpdateShippingMethod($shippingMethods: [String]) {\n    updateShippingMethod(input: { shippingMethods: $shippingMethods }) {\n      clientMutationId\n    }\n  }\n": types.UpdateShippingMethodDocument,
    "\n  mutation RemoveCoupons($codes: [String]) {\n    removeCoupons(input: { codes: $codes }) {\n      clientMutationId\n    }\n  }\n": types.RemoveCouponsDocument,
    "\n  mutation RemoveItemsFromCart($keys: [ID], $all: Boolean) {\n    removeItemsFromCart(input: { keys: $keys, all: $all }) {\n      cart {\n        ...CartContent\n      }\n      cartItems {\n        ...CartItemContent\n      }\n    }\n  }\n  \n  \n": types.RemoveItemsFromCartDocument,
    "\n  query GetCart {\n    cart {\n      ...CartContent\n    }\n  }\n  \n": types.GetCartDocument,
    "\n  mutation UpdateCartItemQuantities($items: [CartItemQuantityInput]) {\n    updateItemQuantities(input: { items: $items }) {\n      cart {\n        ...CartContent\n      }\n      items {\n        ...CartItemContent\n      }\n    }\n  }\n  \n  \n": types.UpdateCartItemQuantitiesDocument,
    "\n  mutation EmptyCart {\n    emptyCart(input: {}) {\n      cart {\n        contents {\n          nodes {\n            key\n          }\n        }\n      }\n    }\n  }\n": types.EmptyCartDocument,
    "\n  query Categories {\n    productCategories(first: 1000) {\n      nodes {\n        id: databaseId\n        name\n        parentId: parentDatabaseId\n      }\n    }\n  }\n": types.CategoriesDocument,
    "\n  query GetMainCategories {\n    productCategories(where: { parent: null, orderby: TERM_ORDER }) {\n      edges {\n        node {\n          id: databaseId\n          name\n          image {\n            id: databaseId\n            sourceUrl\n          }\n        }\n      }\n    }\n  }\n": types.GetMainCategoriesDocument,
    "\n  query GetCustomerBilling {\n    customer {\n      billing {\n        firstName\n        lastName\n        address1\n        state\n        city\n        phone\n        postcode\n      }\n    }\n  }\n": types.GetCustomerBillingDocument,
    "\n  query GetCustomerProfile {\n    customer {\n      id\n      firstName\n      lastName\n      username\n      orderCount\n    }\n  }\n": types.GetCustomerProfileDocument,
    "\n  query GetCustomerOrders($count: Int!, $statuses: [OrderStatusEnum]) {\n    customer {\n      orders(last: $count, where: { statuses: $statuses }) {\n        edges {\n          node {\n            id: databaseId\n            total(format: RAW)\n            subtotal(format: RAW)\n            status\n            date\n          }\n        }\n      }\n    }\n  }\n": types.GetCustomerOrdersDocument,
    "\n  query GetGeneralSettings {\n    generalSettings {\n      title\n      description\n      timezone\n      language\n    }\n  }\n": types.GetGeneralSettingsDocument,
    "\n  query GetPage($slug: String) {\n    pages(where: { name: $slug, status: PUBLISH }) {\n      edges {\n        node {\n          title\n          content\n        }\n      }\n    }\n  }\n": types.GetPageDocument,
    "\n  query GetPublishedPagesList {\n    pages(where: { status: PUBLISH }) {\n      edges {\n        node {\n          title\n          slug\n        }\n      }\n    }\n  }\n": types.GetPublishedPagesListDocument,
    "\n  query GetAllProducts(\n    $stockStatus: [StockStatusEnum]\n    $orderBy: [ProductsOrderbyInput]\n    $categoryIdIn: [Int]\n    $q: String\n    $first: Int\n  ) {\n    products(\n      first: $first\n      where: {\n        stockStatus: $stockStatus\n        orderby: $orderBy\n        categoryIdIn: $categoryIdIn\n        search: $q\n      }\n    ) {\n      pageInfo {\n        total\n        hasNextPage\n        hasPreviousPage\n      }\n      nodes {\n        __typename\n        ... on VariableProduct {\n          databaseId\n          name\n          onSale\n          type\n          averageRating\n          slug\n          image {\n            sourceUrl\n          }\n          price\n          regularPrice\n          salePrice\n          stockStatus\n          discountAmount\n          discountPercentage\n        }\n      }\n    }\n  }\n": types.GetAllProductsDocument,
    "\n  query GetSingleProduct($id: ID!) {\n    product(id: $id, idType: DATABASE_ID) {\n      description\n      content\n      commentCount\n      image {\n        id: databaseId\n        sourceUrl\n        altText\n      }\n      customAttributes {\n        nodes {\n          id\n          label\n          name\n          optionNames\n          variation\n        }\n      }\n      productCategories(where: { order: ASC, orderby: TERM_ORDER }) {\n        nodes {\n          id: databaseId\n          name\n          slug\n          menuOrder\n          parentId\n        }\n      }\n      galleryImages {\n        nodes {\n          id\n          sourceUrl\n          altText\n        }\n      }\n      ... on VariableProduct {\n        id: databaseId\n        name\n        title\n        stockStatus\n        slug\n        averageRating\n        price\n        regularPrice\n        salePrice\n        discountPercentage\n        discountAmount\n        variations(where: { stockStatus: IN_STOCK }) {\n          nodes {\n            ...ProductVariationContentSlice\n          }\n        }\n      }\n    }\n  }\n  \n": types.GetSingleProductDocument,
    "\n  query GetHomePageSliders {\n    sliderCategories(where: { slug: \"MAIN_HOMEPAGE_SLIDERS\" }) {\n      nodes {\n        sliders {\n          edges {\n            node {\n              id: databaseId\n              title\n              url\n              featuredImage {\n                node {\n                  id: databaseId\n                  url: sourceUrl\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetHomePageSlidersDocument,
    "\n  query GetTopBanner {\n    sliderCategories(where: { slug: \"TOP_BANNER\" }) {\n      nodes {\n        sliders {\n          edges {\n            node {\n              id: databaseId\n              title\n              url\n              featuredImage {\n                node {\n                  id: databaseId\n                  url: sourceUrl\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetTopBannerDocument,
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
export function graphql(source: "\n  mutation LoginUser($username: String!, $password: String!) {\n    login(input: { username: $username, password: $password }) {\n      accessToken: authToken\n      refreshToken\n      user {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($username: String!, $password: String!) {\n    login(input: { username: $username, password: $password }) {\n      accessToken: authToken\n      refreshToken\n      user {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductContentSlice on Product {\n    id\n    databaseId\n    name\n    slug\n    type\n    image {\n      id\n      sourceUrl(size: WOOCOMMERCE_THUMBNAIL)\n      altText\n    }\n    ... on SimpleProduct {\n      price\n      regularPrice\n      soldIndividually\n    }\n    ... on VariableProduct {\n      price\n      regularPrice\n      soldIndividually\n    }\n  }\n"): (typeof documents)["\n  fragment ProductContentSlice on Product {\n    id\n    databaseId\n    name\n    slug\n    type\n    image {\n      id\n      sourceUrl(size: WOOCOMMERCE_THUMBNAIL)\n      altText\n    }\n    ... on SimpleProduct {\n      price\n      regularPrice\n      soldIndividually\n    }\n    ... on VariableProduct {\n      price\n      regularPrice\n      soldIndividually\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductVariationContentSlice on ProductVariation {\n    id\n    databaseId\n    name\n    slug\n    attributes {\n      nodes {\n        id\n        label\n        value\n        name\n      }\n    }\n    image {\n      id\n      sourceUrl(size: WOOCOMMERCE_THUMBNAIL)\n      altText\n    }\n    price\n    regularPrice\n    salePrice\n    discountAmount\n    discountPercentage\n    stockStatus\n  }\n"): (typeof documents)["\n  fragment ProductVariationContentSlice on ProductVariation {\n    id\n    databaseId\n    name\n    slug\n    attributes {\n      nodes {\n        id\n        label\n        value\n        name\n      }\n    }\n    image {\n      id\n      sourceUrl(size: WOOCOMMERCE_THUMBNAIL)\n      altText\n    }\n    price\n    regularPrice\n    salePrice\n    discountAmount\n    discountPercentage\n    stockStatus\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CartItemContent on CartItem {\n    key\n    product {\n      node {\n        ...ProductContentSlice\n      }\n    }\n    variation {\n      node {\n        ...ProductVariationContentSlice\n      }\n    }\n    quantity\n    total\n    subtotal\n    subtotalTax\n    totalOnSaleDiscount\n    extraData {\n      key\n      value\n    }\n  }\n  \n  \n"): (typeof documents)["\n  fragment CartItemContent on CartItem {\n    key\n    product {\n      node {\n        ...ProductContentSlice\n      }\n    }\n    variation {\n      node {\n        ...ProductVariationContentSlice\n      }\n    }\n    quantity\n    total\n    subtotal\n    subtotalTax\n    totalOnSaleDiscount\n    extraData {\n      key\n      value\n    }\n  }\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CartContent on Cart {\n    contents(first: 100) {\n      itemCount\n      nodes {\n        ...CartItemContent\n      }\n    }\n    appliedCoupons {\n      code\n      discountAmount\n      discountTax\n    }\n    needsShippingAddress\n    availableShippingMethods {\n      rates {\n        id\n        instanceId\n        methodId\n        label\n        cost\n      }\n    }\n    chosenShippingMethods\n    subtotal(format: RAW)\n    subtotalTax(format: RAW)\n    shippingTax(format: RAW)\n    shippingTotal(format: RAW)\n    total(format: RAW)\n    totalTax(format: RAW)\n    feeTax(format: RAW)\n    feeTotal(format: RAW)\n    discountTax(format: RAW)\n    discountTotal(format: RAW)\n    fees {\n      id\n      name\n      total\n    }\n    appliedCoupons {\n      description\n      code\n      description\n      discountAmount\n    }\n  }\n  \n"): (typeof documents)["\n  fragment CartContent on Cart {\n    contents(first: 100) {\n      itemCount\n      nodes {\n        ...CartItemContent\n      }\n    }\n    appliedCoupons {\n      code\n      discountAmount\n      discountTax\n    }\n    needsShippingAddress\n    availableShippingMethods {\n      rates {\n        id\n        instanceId\n        methodId\n        label\n        cost\n      }\n    }\n    chosenShippingMethods\n    subtotal(format: RAW)\n    subtotalTax(format: RAW)\n    shippingTax(format: RAW)\n    shippingTotal(format: RAW)\n    total(format: RAW)\n    totalTax(format: RAW)\n    feeTax(format: RAW)\n    feeTotal(format: RAW)\n    discountTax(format: RAW)\n    discountTotal(format: RAW)\n    fees {\n      id\n      name\n      total\n    }\n    appliedCoupons {\n      description\n      code\n      description\n      discountAmount\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddToCart(\n    $productId: Int!\n    $variationId: Int\n    $quantity: Int\n    $extraData: String\n  ) {\n    addToCart(\n      input: {\n        productId: $productId\n        variationId: $variationId\n        quantity: $quantity\n        extraData: $extraData\n      }\n    ) {\n      cart {\n        ...CartContent\n      }\n      cartItem {\n        ...CartItemContent\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  mutation AddToCart(\n    $productId: Int!\n    $variationId: Int\n    $quantity: Int\n    $extraData: String\n  ) {\n    addToCart(\n      input: {\n        productId: $productId\n        variationId: $variationId\n        quantity: $quantity\n        extraData: $extraData\n      }\n    ) {\n      cart {\n        ...CartContent\n      }\n      cartItem {\n        ...CartItemContent\n      }\n    }\n  }\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ApplyCoupon($code: String!) {\n    applyCoupon(input: { code: $code }) {\n      clientMutationId\n      applied {\n        description\n        code\n        discountAmount\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ApplyCoupon($code: String!) {\n    applyCoupon(input: { code: $code }) {\n      clientMutationId\n      applied {\n        description\n        code\n        discountAmount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateShippingMethod($shippingMethods: [String]) {\n    updateShippingMethod(input: { shippingMethods: $shippingMethods }) {\n      clientMutationId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateShippingMethod($shippingMethods: [String]) {\n    updateShippingMethod(input: { shippingMethods: $shippingMethods }) {\n      clientMutationId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCoupons($codes: [String]) {\n    removeCoupons(input: { codes: $codes }) {\n      clientMutationId\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCoupons($codes: [String]) {\n    removeCoupons(input: { codes: $codes }) {\n      clientMutationId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveItemsFromCart($keys: [ID], $all: Boolean) {\n    removeItemsFromCart(input: { keys: $keys, all: $all }) {\n      cart {\n        ...CartContent\n      }\n      cartItems {\n        ...CartItemContent\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  mutation RemoveItemsFromCart($keys: [ID], $all: Boolean) {\n    removeItemsFromCart(input: { keys: $keys, all: $all }) {\n      cart {\n        ...CartContent\n      }\n      cartItems {\n        ...CartItemContent\n      }\n    }\n  }\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCart {\n    cart {\n      ...CartContent\n    }\n  }\n  \n"): (typeof documents)["\n  query GetCart {\n    cart {\n      ...CartContent\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCartItemQuantities($items: [CartItemQuantityInput]) {\n    updateItemQuantities(input: { items: $items }) {\n      cart {\n        ...CartContent\n      }\n      items {\n        ...CartItemContent\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  mutation UpdateCartItemQuantities($items: [CartItemQuantityInput]) {\n    updateItemQuantities(input: { items: $items }) {\n      cart {\n        ...CartContent\n      }\n      items {\n        ...CartItemContent\n      }\n    }\n  }\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EmptyCart {\n    emptyCart(input: {}) {\n      cart {\n        contents {\n          nodes {\n            key\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation EmptyCart {\n    emptyCart(input: {}) {\n      cart {\n        contents {\n          nodes {\n            key\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Categories {\n    productCategories(first: 1000) {\n      nodes {\n        id: databaseId\n        name\n        parentId: parentDatabaseId\n      }\n    }\n  }\n"): (typeof documents)["\n  query Categories {\n    productCategories(first: 1000) {\n      nodes {\n        id: databaseId\n        name\n        parentId: parentDatabaseId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMainCategories {\n    productCategories(where: { parent: null, orderby: TERM_ORDER }) {\n      edges {\n        node {\n          id: databaseId\n          name\n          image {\n            id: databaseId\n            sourceUrl\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMainCategories {\n    productCategories(where: { parent: null, orderby: TERM_ORDER }) {\n      edges {\n        node {\n          id: databaseId\n          name\n          image {\n            id: databaseId\n            sourceUrl\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCustomerBilling {\n    customer {\n      billing {\n        firstName\n        lastName\n        address1\n        state\n        city\n        phone\n        postcode\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCustomerBilling {\n    customer {\n      billing {\n        firstName\n        lastName\n        address1\n        state\n        city\n        phone\n        postcode\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCustomerProfile {\n    customer {\n      id\n      firstName\n      lastName\n      username\n      orderCount\n    }\n  }\n"): (typeof documents)["\n  query GetCustomerProfile {\n    customer {\n      id\n      firstName\n      lastName\n      username\n      orderCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCustomerOrders($count: Int!, $statuses: [OrderStatusEnum]) {\n    customer {\n      orders(last: $count, where: { statuses: $statuses }) {\n        edges {\n          node {\n            id: databaseId\n            total(format: RAW)\n            subtotal(format: RAW)\n            status\n            date\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCustomerOrders($count: Int!, $statuses: [OrderStatusEnum]) {\n    customer {\n      orders(last: $count, where: { statuses: $statuses }) {\n        edges {\n          node {\n            id: databaseId\n            total(format: RAW)\n            subtotal(format: RAW)\n            status\n            date\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGeneralSettings {\n    generalSettings {\n      title\n      description\n      timezone\n      language\n    }\n  }\n"): (typeof documents)["\n  query GetGeneralSettings {\n    generalSettings {\n      title\n      description\n      timezone\n      language\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPage($slug: String) {\n    pages(where: { name: $slug, status: PUBLISH }) {\n      edges {\n        node {\n          title\n          content\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPage($slug: String) {\n    pages(where: { name: $slug, status: PUBLISH }) {\n      edges {\n        node {\n          title\n          content\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPublishedPagesList {\n    pages(where: { status: PUBLISH }) {\n      edges {\n        node {\n          title\n          slug\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPublishedPagesList {\n    pages(where: { status: PUBLISH }) {\n      edges {\n        node {\n          title\n          slug\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllProducts(\n    $stockStatus: [StockStatusEnum]\n    $orderBy: [ProductsOrderbyInput]\n    $categoryIdIn: [Int]\n    $q: String\n    $first: Int\n  ) {\n    products(\n      first: $first\n      where: {\n        stockStatus: $stockStatus\n        orderby: $orderBy\n        categoryIdIn: $categoryIdIn\n        search: $q\n      }\n    ) {\n      pageInfo {\n        total\n        hasNextPage\n        hasPreviousPage\n      }\n      nodes {\n        __typename\n        ... on VariableProduct {\n          databaseId\n          name\n          onSale\n          type\n          averageRating\n          slug\n          image {\n            sourceUrl\n          }\n          price\n          regularPrice\n          salePrice\n          stockStatus\n          discountAmount\n          discountPercentage\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllProducts(\n    $stockStatus: [StockStatusEnum]\n    $orderBy: [ProductsOrderbyInput]\n    $categoryIdIn: [Int]\n    $q: String\n    $first: Int\n  ) {\n    products(\n      first: $first\n      where: {\n        stockStatus: $stockStatus\n        orderby: $orderBy\n        categoryIdIn: $categoryIdIn\n        search: $q\n      }\n    ) {\n      pageInfo {\n        total\n        hasNextPage\n        hasPreviousPage\n      }\n      nodes {\n        __typename\n        ... on VariableProduct {\n          databaseId\n          name\n          onSale\n          type\n          averageRating\n          slug\n          image {\n            sourceUrl\n          }\n          price\n          regularPrice\n          salePrice\n          stockStatus\n          discountAmount\n          discountPercentage\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSingleProduct($id: ID!) {\n    product(id: $id, idType: DATABASE_ID) {\n      description\n      content\n      commentCount\n      image {\n        id: databaseId\n        sourceUrl\n        altText\n      }\n      customAttributes {\n        nodes {\n          id\n          label\n          name\n          optionNames\n          variation\n        }\n      }\n      productCategories(where: { order: ASC, orderby: TERM_ORDER }) {\n        nodes {\n          id: databaseId\n          name\n          slug\n          menuOrder\n          parentId\n        }\n      }\n      galleryImages {\n        nodes {\n          id\n          sourceUrl\n          altText\n        }\n      }\n      ... on VariableProduct {\n        id: databaseId\n        name\n        title\n        stockStatus\n        slug\n        averageRating\n        price\n        regularPrice\n        salePrice\n        discountPercentage\n        discountAmount\n        variations(where: { stockStatus: IN_STOCK }) {\n          nodes {\n            ...ProductVariationContentSlice\n          }\n        }\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query GetSingleProduct($id: ID!) {\n    product(id: $id, idType: DATABASE_ID) {\n      description\n      content\n      commentCount\n      image {\n        id: databaseId\n        sourceUrl\n        altText\n      }\n      customAttributes {\n        nodes {\n          id\n          label\n          name\n          optionNames\n          variation\n        }\n      }\n      productCategories(where: { order: ASC, orderby: TERM_ORDER }) {\n        nodes {\n          id: databaseId\n          name\n          slug\n          menuOrder\n          parentId\n        }\n      }\n      galleryImages {\n        nodes {\n          id\n          sourceUrl\n          altText\n        }\n      }\n      ... on VariableProduct {\n        id: databaseId\n        name\n        title\n        stockStatus\n        slug\n        averageRating\n        price\n        regularPrice\n        salePrice\n        discountPercentage\n        discountAmount\n        variations(where: { stockStatus: IN_STOCK }) {\n          nodes {\n            ...ProductVariationContentSlice\n          }\n        }\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetHomePageSliders {\n    sliderCategories(where: { slug: \"MAIN_HOMEPAGE_SLIDERS\" }) {\n      nodes {\n        sliders {\n          edges {\n            node {\n              id: databaseId\n              title\n              url\n              featuredImage {\n                node {\n                  id: databaseId\n                  url: sourceUrl\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetHomePageSliders {\n    sliderCategories(where: { slug: \"MAIN_HOMEPAGE_SLIDERS\" }) {\n      nodes {\n        sliders {\n          edges {\n            node {\n              id: databaseId\n              title\n              url\n              featuredImage {\n                node {\n                  id: databaseId\n                  url: sourceUrl\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTopBanner {\n    sliderCategories(where: { slug: \"TOP_BANNER\" }) {\n      nodes {\n        sliders {\n          edges {\n            node {\n              id: databaseId\n              title\n              url\n              featuredImage {\n                node {\n                  id: databaseId\n                  url: sourceUrl\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTopBanner {\n    sliderCategories(where: { slug: \"TOP_BANNER\" }) {\n      nodes {\n        sliders {\n          edges {\n            node {\n              id: databaseId\n              title\n              url\n              featuredImage {\n                node {\n                  id: databaseId\n                  url: sourceUrl\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;