import { CategoriesQuery } from '@/graphql/types/graphql';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Switch,
  styled,
} from '@mui/material';
import { FC, useState } from 'react';

const ListItem = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'transparent',
  },
  py: 1,
}));

const Title = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 700,
}));

type Options = NonNullable<CategoriesQuery['productCategories']>['nodes'];
export interface ColumnFiltersProps {
  options?: Options;
}
const ColumnFilters: FC<ColumnFiltersProps> = ({ options }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const renderCategories = (options: Options, parentId: null | number) => {
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

          {renderCategories(options, option.id)}
        </List>
      );
    });
  };

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
            <ListItemText primary={<Title>دسته‌بندی</Title>} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {options && (
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              sx={{
                maxHeight: 300,
                overflow: 'auto',
              }}
            >
              {renderCategories(options, null)}
            </Collapse>
          )}

          <Divider />

          <ListItem disableGutters disableRipple>
            <ListItemText primary={<Title>فقط کالاهای موجود</Title>} />
            <Switch />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ColumnFilters;
