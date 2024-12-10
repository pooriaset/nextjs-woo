import { Card, CardContent, Container } from '@mui/material';
import { FC, ReactNode } from 'react';
import Header from './components/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          mt: -4,
        }}
      >
        <Card variant="outlined">
          <CardContent>{children}</CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Layout;
