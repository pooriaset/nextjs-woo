import React, { FC } from 'react';
import { Options } from '../types';
import { List, ListItemText } from '@mui/material';
import { Title } from './Title';
import { ListItem } from './ListItem';

export interface CategoriesProps {
  options: Options;
  parentId: null | number;
}

const Categories: FC<CategoriesProps> = ({ options, parentId }) => {
  const _options =
    options?.filter((option) => option.parentId === parentId) ?? [];

  if (!_options.length) {
    return null;
  }
  return _options.map((option) => {
    return (
      <List
        dense
        component="div"
        key={option.id}
        sx={{
          pl: parentId === null ? 0 : 2,
        }}
        disablePadding
      >
        <ListItem dense disableRipple>
          <ListItemText primary={<Title>{option.name}</Title>} />
        </ListItem>
        <Categories options={options} parentId={option.id} />
      </List>
    );
  });
};

export default Categories;
