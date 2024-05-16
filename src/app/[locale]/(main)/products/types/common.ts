import { GetSingleProductQuery } from '@/graphql/types/graphql';

export type Product = NonNullable<GetSingleProductQuery['product']>;
