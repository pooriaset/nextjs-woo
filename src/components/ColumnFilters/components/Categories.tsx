import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, IconButton, List, ListItemText } from '@mui/material';
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

  const handleClickOnIcon = (id: number) => {
    const func: MouseEventHandler<HTMLButtonElement> = (event) => {
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

  const { navigate, categoryId } = useCustomSearchParams();

  const handleClickOnItem = (id: number) => {
    const func: MouseEventHandler<HTMLDivElement> = (event) => {
      navigate('CategoryId', id);
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
        <ListItem dense disableRipple>
          <ListItemText
            primary={<Title>{option.name}</Title>}
            onClick={handleClickOnItem(option.id)}
            sx={{
              color: (theme) =>
                option.id.toString() === categoryId
                  ? theme.palette.primary.main
                  : undefined,
            }}
          />
          {hasChildren && (
            <IconButton size="small" onClick={handleClickOnIcon(option.id)}>
              {open[option.id] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
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
