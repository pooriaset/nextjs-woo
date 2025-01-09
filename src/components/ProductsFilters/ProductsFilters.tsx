'use client';

import { GET_ALL_CATEGORIES_QUERY } from '@/graphql/queries/categories';
import { GetAllCategoriesQuery } from '@/graphql/types/graphql';
import useSearchPageParams from '@/hooks/useSearchPageParams';
import { SearchPageParamsKeys } from '@/utils/params';
import { useQuery } from '@apollo/client';
import { List, ListItemText, Switch } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Categories from './components/Categories';
import { ListItem } from './components/ListItem';

export interface ProductsFiltersProps {}

const ProductsFilters: FC<ProductsFiltersProps> = () => {
  const t = useTranslations();

  const { data: categoriesData } = useQuery<GetAllCategoriesQuery>(
    GET_ALL_CATEGORIES_QUERY,
  );

  const categories = categoriesData?.productCategories?.nodes;

  const { navigate, inStock } = useSearchPageParams();
  const handleClickOnInStock = () => {
    navigate(SearchPageParamsKeys.InStock, !inStock);
  };

  return (
    <List dense disablePadding>
      <ListItem disableGutters disableRipple>
        <ListItemText
          primary={t('products.filters.categories')}
          primaryTypographyProps={{
            variant: 'body1',
            fontWeight: 600,
          }}
        />
      </ListItem>
      {!!categories?.length && <Categories options={categories} />}

      <ListItem disableGutters disableRipple onClick={handleClickOnInStock}>
        <ListItemText
          primary={t('products.filters.justInStock')}
          primaryTypographyProps={{
            variant: 'body1',
            fontWeight: 600,
          }}
        />
        <Switch checked={inStock} />
      </ListItem>
    </List>
  );
};

export default ProductsFilters;
