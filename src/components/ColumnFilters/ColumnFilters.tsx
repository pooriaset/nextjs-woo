import useCustomSearchParams from '@/hooks/useCustomSearchParams';
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
import { FC, useState } from 'react';
import Categories from './components/Categories';
import { ListItem } from './components/ListItem';
import { Title } from './components/Title';
import { ProductCategoryOptions } from './types';
import { useTranslations } from 'next-intl';

export interface ColumnFiltersProps {
  categories?: ProductCategoryOptions;
}
const ColumnFilters: FC<ColumnFiltersProps> = ({ categories }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const { navigate, inStock } = useCustomSearchParams();
  const handleClickOnInStock = () => {
    navigate('InStock', !inStock);
  };

  const t = useTranslations();
  return (
    <Card
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
