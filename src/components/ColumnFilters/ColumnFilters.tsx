import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Collapse,
  Divider,
  List,
  ListItemText,
  Switch,
} from '@mui/material';
import { FC, useState } from 'react';
import Categories from './components/Categories';
import { ListItem } from './components/ListItem';
import { Title } from './components/Title';
import { Options } from './types';

export interface ColumnFiltersProps {
  options?: Options;
}
const ColumnFilters: FC<ColumnFiltersProps> = ({ options }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
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
              <Categories options={options} parentId={null} />
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
