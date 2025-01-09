'use client';

import { GET_ALL_CATEGORIES_QUERY } from '@/graphql/queries/categories';
import { GetAllCategoriesQuery } from '@/graphql/types/graphql';
import useSearchPageParams from '@/hooks/useSearchPageParams';
import { SearchPageParamsKeys } from '@/utils/params';
import { useQuery } from '@apollo/client';
import { Divider, List, ListItemText, Switch } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Categories from './components/Categories';
import { ListItem } from './components/ListItem';
import { Title } from './components/Title';

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
    <List>
      <ListItem disableGutters disableRipple>
        <ListItemText
          primary={<Title>{t('products.filters.categories')}</Title>}
        />
      </ListItem>
      {!!categories?.length && <Categories options={categories} />}

      <Divider />

      <ListItem disableGutters disableRipple onClick={handleClickOnInStock}>
        <ListItemText
          primary={<Title>{t('products.filters.justInStock')}</Title>}
        />
        <Switch checked={inStock} />
      </ListItem>
    </List>
  );
};

export default ProductsFilters;
