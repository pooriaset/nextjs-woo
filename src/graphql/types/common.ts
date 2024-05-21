import { GetPublishedPagesListQuery } from "./graphql";

export type IPageListItem = NonNullable<
  GetPublishedPagesListQuery['pages']
>['edges'][number]['node'];