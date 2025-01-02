import { Grid } from '@mui/material';
import { FC, ReactNode } from 'react';
import Column from '../components/Column';

interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item container spacing={2} xs={12} md={3}>
        <Column spacing={2} />
      </Grid>
      <Grid item xs={12} md={9}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
