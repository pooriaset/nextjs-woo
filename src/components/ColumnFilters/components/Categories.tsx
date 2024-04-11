import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemText } from '@mui/material';
import { FC, MouseEventHandler, useState } from 'react';
import { Options } from '../types';
import { ListItem } from './ListItem';
import { Title } from './Title';

export interface CategoriesProps {
  options: Options;
  parentId: null | number;
}

const Categories: FC<CategoriesProps> = ({ options, parentId }) => {
  const _options =
    options?.filter((option) => option.parentId === parentId) ?? [];

  const [open, setOpen] = useState<Record<number, boolean>>({});

  const handleClickOnItem = (id: number) => {
    const func: MouseEventHandler<HTMLDivElement> = (event) => {
      setOpen((prevState) => {
        const status = !prevState[id];
        return {
          ...prevState,
          [id]: status,
        };
      });
    };
    return func;
  };

  if (!_options.length) {
    return null;
  }
  return _options.map((option) => {
    const hasChildren = options?.some((child) => child.parentId === option.id);
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
        <ListItem dense disableRipple onClick={handleClickOnItem(option.id)}>
          <ListItemText primary={<Title>{option.name}</Title>} />
          {hasChildren && (
            <>{open[option.id] ? <ExpandLess /> : <ExpandMore />}</>
          )}
        </ListItem>
        <Collapse timeout="auto" in={open[option.id] ?? false} unmountOnExit>
          <Categories options={options} parentId={option.id} />
        </Collapse>
      </List>
    );
  });
};

export default Categories;
