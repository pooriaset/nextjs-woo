import { GET_CATEGORIES } from '@/graphql/queries/blog';
import { GetCategoriesQuery } from '@/graphql/types/graphql';
import { useQuery } from '@apollo/client';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

const Categories = () => {
  const { data, loading } = useQuery<GetCategoriesQuery>(GET_CATEGORIES);

  const [checked, setChecked] = React.useState<number[]>([]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense sx={{ width: '100%' }}>
      {data?.categories?.edges?.map((category) => {
        const labelId = `checkbox-list-secondary-label-${category.node.databaseId}`;
        return (
          <ListItem
            onClick={handleToggle(category.node.databaseId)}
            key={category.node.databaseId}
            secondaryAction={
              <Checkbox
                edge="end"
                checked={checked.includes(category.node.databaseId)}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText id={labelId} primary={category.node.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
export default Categories;
