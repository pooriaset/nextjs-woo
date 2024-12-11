import { Container } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface Layout {
  children: ReactNode;
}

const Layout: FC<Layout> = async ({ children }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 3,
      }}
    >
      {children}
    </Container>
  );
};

export default Layout;
