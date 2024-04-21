import { Box, Grid } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Grid
      container
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item xs={12} md={6} lg={5} xl={3}>
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
