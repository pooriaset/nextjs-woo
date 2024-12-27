'use client';

import { MobileFooter } from '@/components/Footer/components';
import { DesktopView, MobileView } from '@/components/ResponsiveDesign';
import { Grid, Stack } from '@mui/material';
import { FC, ReactNode } from 'react';
import Back from './components/Back/Back';

export interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <Grid
        container
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <Stack
            spacing={2}
            sx={{
              p: 2,
            }}
          >
            <DesktopView>
              <Back />
            </DesktopView>
            {children}
          </Stack>
        </Grid>
      </Grid>
      <MobileView>
        <MobileFooter />
      </MobileView>
    </>
  );
};

export default AuthLayout;
