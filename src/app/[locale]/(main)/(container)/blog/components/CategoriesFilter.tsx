import { GET_CATEGORIES } from '@/graphql/queries/blog';
import { GetCategoriesQuery } from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { useQuery } from '@apollo/client';
import { Chip } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const CategoriesFilter = () => {
  const { data, loading } = useQuery<GetCategoriesQuery>(GET_CATEGORIES);

  const handleToggle = (value: number) => () => {};

  return (
    <List dense sx={{ width: '100%' }}>
      {data?.categories?.edges?.map((category) => {
        const labelId = `checkbox-list-secondary-label-${category.node.databaseId}`;
        return (
          <ListItem
            component={Link}
            href={`/blog/categories/${category.node.slug}`}
            onClick={handleToggle(category.node.databaseId)}
            key={category.node.databaseId}
            disablePadding
          >
            <ListItemButton>
              <ListItemText
                id={labelId}
                primary={category.node.name}
                primaryTypographyProps={{
                  color: 'text.primary',
                }}
              />
              <Chip label={category.node.count} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
export default CategoriesFilter;
