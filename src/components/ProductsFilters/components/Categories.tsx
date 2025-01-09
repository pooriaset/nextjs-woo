import useSearchPageParams from '@/hooks/useSearchPageParams';
import { SearchPageParamsKeys } from '@/utils/params';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, IconButton, List, ListItemText } from '@mui/material';
import { FC, MouseEventHandler, useMemo, useState } from 'react';
import { ProductCategoryOptions } from '../types';
import { ListItem } from './ListItem';

export interface CategoriesProps {
  options: ProductCategoryOptions;
  parentId?: null | number;
}

const Categories: FC<CategoriesProps> = ({ options, parentId = null }) => {
  const _options = useMemo(() => {
    return options?.filter((option) => option.parentId === parentId) ?? [];
  }, [options, parentId]);

  const getAllParentsOfItem = (
    options: ProductCategoryOptions,
    id: string | number | null | undefined,
    value: Record<number, boolean>,
  ) => {
    const parentId = options.find((item) => item.id === id)?.parentId;
    if (parentId) {
      value[parentId] = true;
      getAllParentsOfItem(options, parentId, value);
    }

    return value;
  };

  const { navigate, categoryId } = useSearchPageParams();

  const [open, setOpen] = useState<Record<number | string, boolean>>({
    ...getAllParentsOfItem(options, categoryId, {
      [-1]: true,
    }),
  });

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

  const handleClickOnItem = (id: number) => {
    const func: MouseEventHandler<HTMLDivElement> = (event) => {
      navigate(SearchPageParamsKeys.CategoryId, id);
    };
    return func;
  };

  if (!_options.length) {
    return null;
  }

  return _options.map((option) => {
    const hasChildren = options?.some((child) => child.parentId === option.id);

    const isActive = option.id === categoryId;

    return (
      <List
        sx={{
          pl: parentId === null ? 0 : 2,
        }}
        dense
        component="div"
        key={option.id}
        disablePadding
      >
        <ListItem dense disableRipple>
          <ListItemText
            primary={option.name}
            primaryTypographyProps={{
              variant: 'body2',
              ...(isActive
                ? {
                    fontWeight: 700,
                    color: 'primary',
                  }
                : {}),
            }}
            onClick={handleClickOnItem(option.id)}
          />
          {hasChildren && (
            <IconButton size="small" onClick={handleClickOnIcon(option.id)}>
              {open[option.id] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </ListItem>
        <Collapse timeout="auto" in={open[option.id] ?? false} unmountOnExit>
          <Categories
            options={options}
            parentId={option.id > 0 ? option.id : null}
          />
        </Collapse>
      </List>
    );
  });
};

export default Categories;
