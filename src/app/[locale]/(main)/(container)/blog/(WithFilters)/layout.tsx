import { Grid } from '@mui/material';
import { FC, ReactNode } from 'react';
import Filters from '../components/Filters';

interface LayoutProps {
  children: ReactNode;
}

const spacing = 2;
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Grid container spacing={spacing} alignItems="flex-start">
      <Grid item container spacing={spacing} xs={12} md={3}>
        <Filters spacing={spacing} />
      </Grid>
      <Grid item xs={12} md={9}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
