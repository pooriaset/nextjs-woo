'use client';

import { GET_ALL_CATEGORIES_QUERY } from '@/graphql/queries/categories';
import { CategoriesQuery } from '@/graphql/types/graphql';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import { useQuery } from '@apollo/client';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemText,
  Switch,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import Categories from './components/Categories';
import { ListItem } from './components/ListItem';
import { Title } from './components/Title';

export interface ColumnFiltersProps {}

const ColumnFilters: FC<ColumnFiltersProps> = () => {
  const t = useTranslations();

  const { data: categoriesData } = useQuery<CategoriesQuery>(
    GET_ALL_CATEGORIES_QUERY,
  );

  const categories = [
    { id: -1, parentId: -1, name: t('categories.all') },
    ...(categoriesData?.productCategories?.nodes ?? []),
  ];

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const { navigate, inStock } = useCustomSearchParams();
  const handleClickOnInStock = () => {
    navigate('InStock', !inStock);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        position: 'sticky',
        top: 130,
      }}
    >
      <CardContent>
        <List>
          <ListItem disableGutters onClick={handleClick} disableRipple>
            <ListItemText
              primary={<Title>{t('products.filters.categories')}</Title>}
            />

            <IconButton size="small">
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          {categories && categories.length > 1 && (
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              sx={{
                maxHeight: 300,
                overflow: 'auto',
              }}
            >
              <Categories options={categories} />
            </Collapse>
          )}

          <Divider />

          <ListItem disableGutters disableRipple onClick={handleClickOnInStock}>
            <ListItemText
              primary={<Title>{t('products.filters.justInStock')}</Title>}
            />
            <Switch checked={inStock} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ColumnFilters;
