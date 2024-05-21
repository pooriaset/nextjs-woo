import { Container } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface Layout {
  children: ReactNode;
}

const Layout: FC<Layout> = async ({ children }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{ mt: 3, pb: { xs: '56px', md: 0 }, minHeight: '70vh' }}
    >
      {children}
    </Container>
  );
};

export default Layout;
